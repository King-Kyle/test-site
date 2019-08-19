/* ===================================================================
* # SMOOTH SCROLL - SIDE NAV
*
* ------------------------------------------------------------------- */

/* The number of nav-dots must equal the number
	 of sections you wish to navigate to (in this
	 case, "containers") */
var navDots = $(".nav-dot");
var containers = $(".section");

$(window).scroll(function() {
	var height = $(window).scrollTop();

	/* Reposition the home container when scrolling
		 near the top of the page. */
	var moveHeader = height > 225;
	var lowerHeader = height > 235;
	$("#home")
		.toggleClass("header", moveHeader)
		.toggleClass("header-down", lowerHeader);

	for (var i = 0; i < navDots.length; i++) {
		toggleNavDot(i, height);
	}
});

/* Toggle the selection of a nav-dot element based on the
	 scroll height of the page. */
function toggleNavDot(index, height) {
	var condition;
	if (index == 0) {
		condition = height < halfwayBetween(containers.eq(index), containers.eq(index + 1));
	}
	else if (index == navDots.length - 1) {
		condition = height >= halfwayBetween(containers.eq(navDots.length - 2), containers.eq(navDots.length - 1));
	}
	else {
		condition = height >= halfwayBetween(containers.eq(index - 1), containers.eq(index))
			&& height < halfwayBetween(containers.eq(index), containers.eq(index + 1));
	}
	navDots.eq(index).toggleClass("selected", condition);
}

/* Return the vertical-position halfway between two
	 elements. */
function halfwayBetween(element1, element2) {
	return (element1.offset().top + element2.offset().top) / 2;
}

// Smooth scrolling when clicking on a nav-dot.
$("a").click(function(e) {
	var navID = $(this).attr("href");
	var height = (navID == "#home") ? 0 : $(navID).offset().top;

	$('body, html').animate({
			scrollTop: height
		}, 750);
});

/* ===================================================================
* # ANIMATE IN VIEWPORT
*
* ------------------------------------------------------------------- */

$(document).ready(function() {
  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  // If element is scrolled into view, fade it in
  $(window).scroll(function() {
    $('.image-box .animated').each(function() {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass('fadeInLeft');
      }
    });
  });

	$(window).scroll(function() {
		$('.text-box .animated').each(function() {
			if (isScrolledIntoView(this) === true) {
				$(this).addClass('fadeInRight');
			}
		});
	});
});

/* ===================================================================
* # MOUSE PARALLAX
*
* ------------------------------------------------------------------- */

$(".parallax-wrapper").mousemove(function(e) {
	var x = e.pageX - $(this).offset().left - $(this).width() / 2;
	var y = e.pageY - $(this).offset().top - $(this).height() / 2;

	$(".parallax-wrapper").css("background-color", "#2C2C2C");

	$("*[data-mouse-parallax]").each(function() {
		var factor = parseFloat($(this).data("mouse-parallax"));
		x = -x * factor;
		y = -y * factor;

		$(this).css({ transform: "translate3d( " + x + "px, " + y + "px, 0 )" });
	});
});

$(".parallax-wrapper").mouseleave(function(e) {
	var target = $(e.target);

	if( !target.is("div.layer")) {
		$("*[data-mouse-parallax]").each(function() {
			$(this).css({ transform: "translate3d( 0px, 0px, 0 )" });
		});
		e.stopPropagation();
	}
});

/* ===================================================================
* # SCROLL PARALLAX
*
* ------------------------------------------------------------------- */

$.fn.moveIt = function(){
  var $window = $(window);
  var instances = [];

  $(this).each(function(){
    instances.push(new moveItItem($(this)));
  });

  window.addEventListener('scroll', function(){
    var scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
      inst.update(scrollTop);
    });
  }, {passive: true});
}

var moveItItem = function(el){
  this.el = $(el);
  this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop){
  this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};

// Initialization
$(function(){
  $('[data-scroll-speed]').moveIt();
});
