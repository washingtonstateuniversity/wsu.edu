/* global Backbone, jQuery, _ */
var wsuNavigation = wsuNavigation || {};

(function (window, Backbone, $, _, wsuNavigation) {
	'use strict';

	wsuNavigation.appView = Backbone.View.extend({
		el: '.wsu-home-navigation',

		// Setup the events used in the overall application view.
		events: {
			'click #mega-menu ul li a': 'toggleNav'
		},

		toggleNav: function(evt){
			if ( 2 === $(evt.currentTarget).parent().children().length ) {
				evt.preventDefault();
				var $nav_wrapper = $('.header-drawer-wrapper');

				if ( $nav_wrapper.hasClass('header-drawer-wrapper-hide') ) {
					$nav_wrapper.parent('li').find('.sub-menu li a').css('color','#fff');
					$nav_wrapper.removeClass('header-drawer-wrapper-hide');
				} else {
					$nav_wrapper.addClass('header-drawer-wrapper-hide');
				}
			}
		}
	});
})(window, Backbone, jQuery, _, wsuNavigation);