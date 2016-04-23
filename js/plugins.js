$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top-105
				}, 1000);
				return false;
			}
		}
	});

	var feed = new Instafeed({
  		clientId: '467ede5a6b9b48ae8e03f4e2582aeeb3',
 		limit: 9,
  		after: function () {
    		var images = $("#instafeed").find('a');
    		$.each(images, function(index, image) {
	        	var delay = (index * 75) + 'ms';
	        	$(image).css('-webkit-animation-delay', delay);
	        	$(image).css('-moz-animation-delay', delay);
	        	$(image).css('-ms-animation-delay', delay);
	        	$(image).css('-o-animation-delay', delay);
	        	$(image).css('animation-delay', delay);
	        	$(image).addClass('animated flipInX');
    		});
  		},
  		template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="likes"><i class="fa fa-heart" aria-hidden="true"></i> {{likes}}</div></a>'
	});
feed.run();
});