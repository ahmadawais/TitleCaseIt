/**
 * titlecaseit
 * Convert any text to title case.
 *
 * @author Ahmad Awais <https://twitter.com/MrAhmadAwais>
 * @license GPL-2.0
 */

'use strict';

function titleCaseIt(str) {
	if (typeof str !== 'string') return '';

	var smallWords = /^( a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via )$/i;

	return str.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
		if (index > 0 && index + match.length !== title.length &&
			match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
			(title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
			title.charAt(index - 1).search(/[^\s-]/) < 0) {
			return match.toLowerCase();
		}

		if (match.substring(1).search(/[A-Z]|\../) > -1) {
			return match;
		}

		return match.charAt(0).toUpperCase() + match.substring(1);
	});
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = titleCaseIt;
} else if (typeof window !== 'undefined') {
	window.titleCaseIt = titleCaseIt;
}
