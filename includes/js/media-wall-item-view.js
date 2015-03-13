/* global Backbone, jQuery, _ */
var wsuMediaWall = wsuMediaWall || {};

(function (window, Backbone, $, _, wsuMediaWall) {
	'use strict';

	wsuMediaWall.itemView = Backbone.View.extend({
		template: _.template( $('#media-wall-single-template').html() ),

		render: function() {
			this.$el.html( this.template( this.model.attributes ) );
			return this;
		}
	})
})(window, Backbone, jQuery, _, wsuMediaWall);