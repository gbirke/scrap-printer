import lineSplit from './lineSplit';
import {renderString} from 'nunjucks';
import $ from 'jquery';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';


function initializeCodeEditor() {
	return CodeMirror.fromTextArea($("#template-in")[0], {
		mode: "jinja2"
	});
}

function initializeApp() {
	const $divider = $('#divider-chars');
	const $dataLines = $('#data-lines');
	const $tpl = $('#template-in');
	function myRender() {
		var lines = lineSplit( $dataLines.val(), $divider.val() );
		var templateStr = $tpl.val();
		
		var s = lines.reduce( (s, line) => {
			return s + renderString(templateStr, line)
		}, '');
		$('#scrapResult').html(s);
	}
	$divider.change( myRender );
	$dataLines.on( 'change keyup', myRender);
	let codeEditor = initializeCodeEditor();
	codeEditor.on( 'change', (cm) => {
		$tpl.val( cm.getValue());
		myRender();
	})

}


$( initializeApp );

