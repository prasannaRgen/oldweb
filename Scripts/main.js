var var_clientWidth = document.body.clientWidth;

$(document).ready(function() {
	$(".msc-nav li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("parent");
		};
	})
	
	$(".adapNav").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".msc-nav").toggle();
	});
	adjustMenu();
	
	
})

$(window).bind('resize orientationchange', function() {
	var_clientWidth = document.body.clientWidth;
	adjustMenu();
});

var adjustMenu = function() {
	if (var_clientWidth <= 768) {
		$(".adapNav").css("display", "inline-block");
		if (!$(".adapNav").hasClass("active")) {
			$(".msc-nav").hide();
		} else {
			$(".msc-nav").show();
		}
		$(".msc-nav li").unbind('mouseenter mouseleave');
		$(".msc-nav li a.parent").unbind('click').bind('click', function(e) {
			// must be attached to anchor element to prevent bubbling
			e.preventDefault();
			$(this).parent("li").toggleClass("hover");
		});
	} 
	else if (var_clientWidth >= 768) {
		$(".adapNav").css("display", "none");
		$(".msc-nav").show();
		$(".msc-nav li").removeClass("hover");
		$(".msc-nav li a").unbind('click');
		$(".msc-nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	$(this).toggleClass('hover');
		});
	}
}