/**
 * Title Case Conversions.
 *
 * @author Ahmad Awais https://github.com/ahmadawais/TitleCaseIt
 * @version 3.0.0
 */
$( document ).ready( function() {

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
		 * Auto-copy to clipboard after 300ms debounce.
		 */
		var copyTimer = null;

		function copyToClipboard( text ) {
			if ( ! text ) return;
			if ( navigator.clipboard && navigator.clipboard.writeText ) {
				navigator.clipboard.writeText( text ).then( function() {
					// Flash the output field.
					var el = $( '.aa_case__display' );
					el.removeClass( 'is-copied' );
					el[0].offsetWidth; // Force reflow.
					el.addClass( 'is-copied' );

					// Analytics.
					ga( 'send', 'event', 'TitleCaseIt', 'copied', 'success' );

					// Intercom Event.
					Intercom( 'trackEvent', 'TitleCaseIt', {
						title: text,
						copied: 'YES',
						email: 'TitleCaseIt@ahmadawais.com',
					} );
				} );
			}
		}

		/**
		 * Live input to title case conversion + auto-copy.
		 */
		$( ".aa_case__untitled" ).focus();
		$( ".aa_case__untitled" ).on( 'keydown', function( event ) {
			if ( event.which === 13 ) {
				event.preventDefault();
				var tcase = $( ".aa_case__display" ).val();
				copyToClipboard( tcase );
			}
		} );
		$( ".aa_case__untitled" ).bind( 'input change paste keyup mouseup', function( event ) {
				var _this = this;
				// Short pause to wait for paste to complete.
				setTimeout( function() {
					var text = $( _this ).val();
					var tcase = text.toLowerCase().toTitleCase();
					$( ".aa_case__display" ).val( tcase );

					// Auto-copy after 300ms of no typing.
					clearTimeout( copyTimer );
					copyTimer = setTimeout( function() {
						copyToClipboard( tcase );
					}, 300 );
				}, 100 );
		} );

		/**
		 * On Select.
		 *
		 * Run analytics if user selects the output.
		 */
		var theTitleCased = $( '.aa_case__display' );

		theTitleCased.select( function() {
			ga( 'send', 'event', 'TitleCaseIt', 'copied', 'success' );

			Intercom( 'trackEvent', 'TitleCaseIt', {
				title: theTitleCased.val(),
				copied: 'YES',
				email: 'TitleCaseIt@ahmadawais.com',
			} );
		});

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
			ga( 'send', 'event', {
				eventCategory: 'Outbound Link',
				eventAction: 'click',
				eventLabel: event.target.href,
				transport: 'beacon'
			} );
		}
} );
