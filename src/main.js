import lineSplit from './lineSplit';
import {Environment, WebLoader} from 'nunjucks';
import $ from 'jquery';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
import passwordFormat from './passwordFormat';

// "main" style sheet
import '../web/css/scraps.css';

var renderString = null;

function initializeCodeEditor() {
	return CodeMirror.fromTextArea( $('#template-in' )[0], {
		mode: 'jinja2',
		theme: 'eclipse'
	} );
}

class MyRenderer {
	constructor( templateEnvironment ) {
		this.templateEnvironment = templateEnvironment;
	}

	renderHTML( lineText, templateStr, separator ) {
		var lines = lineSplit( lineText, separator );
		return lines.reduce( (s, line) => {
				return s + this.templateEnvironment.renderString(templateStr, line)
			}, '');
	}
}



class MyStorage {
	constructor( storeObj, $dataLines, $tpl, $divider ) {
		this.storageMap = new Map();
		this.storageMap.set( 'lineText', $dataLines );
		this.storageMap.set( 'template', $tpl );
		this.storageMap.set( 'separator', $divider );
		this.storeObj = storeObj;
	}

	saveToStorage() {
		this.storageMap.forEach( (element, index) => {
			this.storeObj.setItem( index, element.val() );
		} );
	}

	loadFromStorage() {
		this.storageMap.forEach( (element, index) => {
			const value = this.storeObj.getItem( index );
			if ( value ) {
				element.val( value );
			}
		} );	
	}

	getValues() {
		return [ 
			this.storeObj.getItem( 'lineText' ),
			this.storeObj.getItem( 'template' ),
			this.storeObj.getItem( 'separator' )
		];
	}
}

function initializeApp() {
	let $divider = $('#divider-chars');
	let $dataLines = $('#data-lines');
	let $tpl = $('#template-in');
	let store = new MyStorage( window.localStorage, $dataLines, $tpl, $divider );
	
	let env = new Environment(new WebLoader('/views'));

	env.addFilter('formatAsPassword', passwordFormat, false);

	let renderer = new MyRenderer( env );

	function onUpdate() {
		store.saveToStorage();
		
		$('#scrapResult').html( renderer.renderHTML.apply(renderer, store.getValues() ) );
	}

	store.loadFromStorage();
	onUpdate();

	// Event handling
	$divider.change( onUpdate );
	$dataLines.on( 'change keyup', onUpdate);
	let codeEditor = initializeCodeEditor();
	codeEditor.on( 'change', (cm) => {
		$tpl.val( cm.getValue());
		onUpdate();
	})

}


$( initializeApp );

