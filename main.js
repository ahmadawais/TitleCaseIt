/**
 * Title Case Conversions.
 *
 * @author Ahmad Awais https://github.com/ahmadawais/TitleCaseIt
 * @version 3.0.0
 */
(function () {
	'use strict';

	var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

	function titleCaseIt(str) {
		if (typeof str !== 'string') return '';
		return str.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
			if (
				index > 0 &&
				index + match.length !== title.length &&
				match.search(smallWords) > -1 &&
				title.charAt(index - 2) !== ':' &&
				(title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
				title.charAt(index - 1).search(/[^\s-]/) < 0
			) {
				return match.toLowerCase();
			}
			if (match.substring(1).search(/[A-Z]|\../) > -1) {
				return match;
			}
			return match.charAt(0).toUpperCase() + match.substring(1);
		});
	}

	// DOM refs.
	var input = document.getElementById('nonconverted');
	var output = document.getElementById('converted');
	var toast = document.getElementById('copiedToast');
	var copyTimer = null;

	// Rotating placeholders.
	var placeholders = [
		'how to build a mass following on X',
		'a guide to open-source contributions',
		'why developers should write every day',
		'the art of shipping side projects fast',
	];
	var phIndex = 0;

	function rotatePlaceholder() {
		phIndex = (phIndex + 1) % placeholders.length;
		input.setAttribute('placeholder', placeholders[phIndex]);
		output.setAttribute('placeholder', titleCaseIt(placeholders[phIndex]));
	}
	setInterval(rotatePlaceholder, 4000);

	// Flash copied animation.
	function flashCopied() {
		output.classList.remove('is-copied');
		void output.offsetWidth;
		output.classList.add('is-copied');
	}

	// Show toast.
	function showToast() {
		toast.classList.remove('is-visible');
		void toast.offsetWidth;
		toast.classList.add('is-visible');
		setTimeout(function () {
			toast.classList.remove('is-visible');
		}, 1500);
	}

	// Track event in GA4.
	function trackCopy(text) {
		try {
			if (typeof gtag === 'function') {
				gtag('event', 'copied', {
					event_category: 'TitleCaseIt',
					event_label: 'success',
					input_title: input.value,
					output_title: text
				});
			}
		} catch (e) {}
	}

	// Copy to clipboard.
	function copyToClipboard(text) {
		if (!text) return;
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text).then(function () {
				flashCopied();
				showToast();
				trackCopy(text);
			});
		} else {
			var ta = document.createElement('textarea');
			ta.value = text;
			ta.style.position = 'fixed';
			ta.style.opacity = '0';
			document.body.appendChild(ta);
			ta.select();
			document.execCommand('copy');
			document.body.removeChild(ta);
			flashCopied();
			showToast();
			trackCopy(text);
		}
	}

	// Live conversion + auto-copy.
	input.focus();

	input.addEventListener('keydown', function (e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			copyToClipboard(output.value);
		}
	});

	function handleInput() {
		var text = input.value;
		var tcase = titleCaseIt(text.toLowerCase());
		output.value = tcase;

		clearTimeout(copyTimer);
		copyTimer = setTimeout(function () {
			copyToClipboard(tcase);
		}, 300);
	}

	['input', 'change', 'paste'].forEach(function (evt) {
		input.addEventListener(evt, function () {
			setTimeout(handleInput, 100);
		});
	});

	// Click output to copy.
	output.addEventListener('click', function () {
		copyToClipboard(output.value);
	});
})();
