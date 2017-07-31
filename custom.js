/**
 * Title Case Conversions.
 *
 * @author Ahmad Awais https://github.com/ahmadawais/TitleCaseIt
 * @version 2.0.1
 */
$( document ).ready( function() {

	var btns = document.querySelectorAll( '.btn' );
	for ( var i = 0; i < btns.length; i++ ) {
		btns[i].addEventListener( 'mouseleave', function( e ) {
			e.currentTarget.setAttribute( 'class', 'btn' );
			e.currentTarget.removeAttribute( 'aria-label' );
		} );
	}

	function showTooltip( elem, msg ) {
		elem.setAttribute( 'class', 'btn tooltipped tooltipped-s' );
		elem.setAttribute( 'aria-label', msg );
	}

	function fallbackMessage( action ) {
		var actionMsg = '';
		var actionKey = ( action === 'cut' ? 'X' : 'C' );
		if ( /iPhone|iPad/i.test( navigator.userAgent ) ) {
			actionMsg = 'No support :( ';
		} else if ( /Mac/i.test( navigator.userAgent ) ) {
			actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
		} else {
			actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
		}
		return actionMsg;
	}

		// Title Case Conversions.
		String.prototype.toTitleCase = function() {
				var smallWords = /^( a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via )$/i;

				return this.replace( /[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function( match, index, title ) {
						if ( index > 0 && index + match.length !== title.length &&
								match.search( smallWords ) > -1 && title.charAt( index - 2 ) !== ":" &&
								( title.charAt( index + match.length ) !== '-' || title.charAt( index - 1 ) === '-' ) &&
								title.charAt( index - 1 ).search( /[^\s-]/ ) < 0 ) {
								return match.toLowerCase();
						}

						if ( match.substr( 1 ).search( /[A-Z]|\../ ) > -1 ) {
								return match;
						}

						return match.charAt( 0 ).toUpperCase() + match.substr( 1 );
				} );
		};

		/**
		 * Live input to p title change.
		 */
		$( ".aa_case__untitled" ).focus();
		$( ".aa_case__untitled" ).bind( 'input change paste keyup mouseup', function( event ) {
				var _this = this;
				// Short pause to wait for paste to complete.
				setTimeout( function() {
					var text = $( _this ).val();
					var tcase = text.toTitleCase();
					$( ".aa_case__display" ).val( tcase );
					// $( ".aa_case__display" ).val( tcase );
				}, 100 );
		} );

		/**
		 * On Select.
		 *
		 * Run analytics if user doesn't copy and selects instead.
		 */
		var theTitleCased = $( '.aa_case__display' );

		theTitleCased.select( function() {
			// Console Log.
			console.log( 'Selected: ' );


			// Analytics.
			ga( 'send', 'event', 'TitleCaseIt', 'copied', 'success' );

			// Intercom Event.
			var metadata = {
				title:  theTitleCased.val(),
				copied: 'YES',
				email: "TitleCaseIt@ahmadawais.com",
			};
			Intercom( 'trackEvent', 'TitleCaseIt', metadata );
		});


		/**
		 * Clipboard.js
		 *
		 * @since 1.0.1
		 */
		// Define the button as CB,js
		var clipboard = new Clipboard( '.btn' );
		$( '.btn' ).on( 'click', function( e ) {
				e.preventDefault();
				clipboard.on( 'success', function( e ) {
					// console.info('Action:', e.action);
					// console.info('Text:', e.text);
					// console.info('Trigger:', e.trigger);

					e.clearSelection();

					showTooltip( e.trigger, 'COPIED! 💯' );
					// $( '.btn' ).html( '💯 COPIED!' );

					e.clearSelection();

					// Analytics.
					ga( 'send', 'event', 'TitleCaseIt', 'copied', 'success' );

					// Intercom Event.
					var metadata = {
						title:  e.text,
						copied: 'YES',
						email: "TitleCaseIt@ahmadawais.com",
					};
					Intercom( 'trackEvent', 'TitleCaseIt', metadata );
				} );

				clipboard.on( 'error', function( e ) {
						showTooltip( e.trigger, 'Error! Use the latest browser. Works best in Chrome!' );
						// console.error( 'Action:', e.action );
						// console.error( 'Trigger:', e.trigger );

						// Analytics.
						ga( 'send', 'event', 'TitleCaseIt', 'copied', 'fail' );
				} );
		} );



		/**
		 * Google Analytics.
		 */
		// Open external links in new tab and tag in GA.
		$( 'a' ).each( function() {
			// Define our URL.
			var a = new RegExp( '/' + window.location.host + '/' );

			// If external link.
			if ( ! a.test( this.href ) ) {
				$( this ) .click( function( event ) {
					event.preventDefault();
					event.stopPropagation();

					// Open in a new tab.
					window.open( this.href, '_blank' );

					// Track Outbound links with GA.
					gaOBLClick( event );
				} );
			} // End if.
		} );

		/**
		 * Track Outbound links with GA.
		 *
		 * @param  {click}  event.
		 * @return {null}
		 * @since  1.0.0
		 */
		function gaOBLClick( event ) {
			// Console Log.
			// console.log( 'OutBoundLink Clicked' );

			ga( 'send', 'event', {
				eventCategory: 'Outbound Link',
				eventAction: 'click',
				eventLabel: event.target.href,
				transport: 'beacon'
			} );
		}
} );
