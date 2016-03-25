# Known Issues
* Fix Codemirror. The webpack-included CodeMirror edit field ist not styled properly. Find out why and fix it. Or just include the CSS from a CDN or something.
* Printing on Chrome and Safari is not quite right, due to [this bug][chromebug]. Since that bug is already 3 years old at the time of writing this, it probably won't get fixed any time soon. Possible solutions: 
	* Special stylesheet only included for Chrome and Safari that makes the formats a bit smaller.
	* Give up on HTML and use [jspdf][jspdf] for scrap generation instead. This would necessitate some markup language that translates the template into API commands. Or some predefined templates only.

[chromebug]: https://bugs.chromium.org/p/chromium/issues/detail?id=273306
[jspdf]: https://github.com/MrRio/jsPDF

