export default function ( password ) {
	let formattedPassword = '';
	for ( let chr of password ) {
		if ( chr.match( /[a-z]/ ) ) {
			formattedPassword += '<span class="pw-lowercase">' + chr + '</span>';
		} else if ( chr.match( /[A-Z]/ ) ) {
			formattedPassword += '<span class="pw-uppercase">' + chr + '</span>';
		} else if ( chr.match( /[0-9]/ ) ) {
			formattedPassword += '<span class="pw-number">' + chr + '</span>';
		}
		else {
			formattedPassword += '<span class="pw-other">' + chr + '</span>';
		}
		
	};
	return formattedPassword;
}