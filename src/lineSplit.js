function splitLine( line, separator ) {
	if ( ! separator ) {
		return {};
	}
	return line.split( separator ).reduce( (obj, currentValue, currentIndex) => {
		obj[ '$' + ( currentIndex + 1 ) ] = currentValue;
		return obj;
	}, {} );
}

/**
 * Split text into line objects. 
 *
 * Each line object has the key '$0' with the whole line text and $1..$n with the line text separated at the separator
 *
 * @param {string} text
 * @param {string} separator
 * @return array
 */
export default function ( text, separator ) {
	if ( ! text ) {
		return [];
	}
	return text.split( '\n' )
		.filter( (currentValue) => {
			return currentValue !== '';
		})
		.map(  (currentValue) => {
			return Object.assign( { $0: currentValue }, splitLine( currentValue, separator ) )
		});
}