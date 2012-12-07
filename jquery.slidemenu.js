(function($){
	var settings;
	var overlayHeight;
	var $menu, $body, $overlay, $close;
	var isOpen   = false,
		isFinish = true;

	function _open() {
		$body.css("position", "absolute").animate({
			left: settings.width + 'px'
		}, settings.speed);

		$menu.animate({
			left: -settings.width + 'px'
		}, settings.speed).show();

		$overlay.show().css({
			width  : '100%',
			height : overlayHeight + 'px'
		});
		isOpen = true;;
	}

	function _close() {
		$body.animate({
			left: 0
		}, settings.speed);

		$menu.animate({
			left: -settings.width + 'px'
		}, settings.speed, null, function() {
			$menu.hide();
			isFinish = true;
		});

		$overlay.hide().css({
			width  : 0,
			height : 0
		});
		isOpen = false;
	}

	function _slide() {
		if(isFinish) {
			isFinish = false;
			if(isOpen) {
				_close();
			}
			else {
				_open();
			}
		}
	}

	$.fn.slideMenu = function(options) {
		settings = $.extend({}, $.fn.slideMenu.defaults, options);
		$menu = this;

		$(document).ready(function() {

			$body = $('body');
			$body.append('<div id="jsm-overlay"></div>');

			$overlay = $('#jsm-overlay');
			$overlay.hide().css({
				position : 'absolute',
				top : 0,
				left: 0,
			}).bind("touchstart", function() { _close(); });

			overlayHeight = Math.max($(document).height(), screen.availHeight);
			$menu.css({
				width : settings.width + 'px',
				height : overlayHeight + 'px',
				position : 'absolute',
				top : 0,
				left: -settings.width + 'px',
			});

			$(settings.menu_button).bind('touchstart', function() { _slide(); });
		});
	};

	$.fn.slideMenu.defaults = {
		menu_button: "#menu_button",
		close_button: null,
		speed: 200,
		width: 200,
	};

})(jQuery);