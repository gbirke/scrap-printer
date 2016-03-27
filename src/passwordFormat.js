export default function ( password ) {
	let formattedPassword = '';
	for ( let chr of password ) {
		if ( chr.match( /[a-z]/ ) ) {
			formattedPassword += '<span class="pw-lowercase">' + chr + '</span>';
		} else if ( chr.match( /[A-Z]/ ) ) {
			formattedPassword += '<span class="pw-uppercase">' + chr + '</span>';
		}
		
	};
	return formattedPassword;
}