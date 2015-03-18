/* global Backbone, jQuery, _ */
var wsuNavigation = wsuNavigation || {};

(function (window, Backbone, $, _, wsuNavigation) {
	'use strict';

	wsuNavigation.appView = Backbone.View.extend({
		el: '.wsu-home-navigation',

		// Setup the events used in the overall application view.
		events: {
			'click #mega-menu-labels  ul li a': 'toggleNav',
			'click .search-label': 'toggleSearch',
			'click .top-level-links-label': 'toggleCampuses',
			'click .campus-links-close': 'toggleCampuses'
		},

		toggleNav: function(evt){
			evt.preventDefault();
			var $nav_wrapper = $('.header-drawer-wrapper');

			if ( $nav_wrapper.hasClass('header-drawer-wrapper-hide') ) {
				$nav_wrapper.addClass('header-drawer-wrapper-open').removeClass('header-drawer-wrapper-hide');
			} else {
				$nav_wrapper.addClass('header-drawer-wrapper-hide').removeClass('header-drawer-wrapper-open');
			}
		},

		toggleSearch: function(evt){
			evt.preventDefault();

			var $search_wrapper = $('.header-search-wrapper');

			if ( $search_wrapper.hasClass('header-search-wrapper-hide') ) {
				$search_wrapper.removeClass('header-search-wrapper-hide');
			} else {
				$search_wrapper.addClass('header-search-wrapper-hide');
			}
		},

		toggleCampuses: function(evt){
			evt.preventDefault();

			var $campus_wrapper = $('.campus-links-full-page-wrapper');

			if ( $campus_wrapper.hasClass('campus-links-hide') ) {
				$campus_wrapper.removeClass('campus-links-hide');
			} else {
				$campus_wrapper.addClass('campus-links-hide');
			}
		}
	});
})(window, Backbone, jQuery, _, wsuNavigation);