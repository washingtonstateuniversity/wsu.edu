/* global Backbone, jQuery, _ */
var wsuFOS = wsuFOS || {};

(function (window, Backbone, $, _, wsuFOS) {
	'use strict';

	wsuFOS.appView = Backbone.View.extend({
		el: '.find-fos-wrapper',

		// Setup the events used in the overall application view.
		events: {
			'click .fos-label': 'toggleAcademic'
		},

		toggleAcademic: function(evt) {
			var $container = $(evt.target).parent('.fos');
console.log('hi', $container);
			if ( $container.hasClass( 'fos-open' ) ) {
				$container.addClass('fos-open');
			} else {
				$container.removeClass('fos-open');
			}
		}
	});
	wsuFOS.app = new wsuFOS.appView();
})(window, Backbone, jQuery, _, wsuFOS);