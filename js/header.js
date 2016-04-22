var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( 'nav' ),
		didScroll = false,
		changeHeaderOn = 200;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'normal' );
		}
		else {
			classie.remove( header, 'normal' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();