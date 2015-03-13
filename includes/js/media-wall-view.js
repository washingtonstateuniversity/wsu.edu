/* global Backbone, jQuery, _ */
var wsuMediaWall = wsuMediaWall || {};

(function (window, Backbone, $, _, wsuMediaWall) {
	'use strict';

	wsuMediaWall.appView = Backbone.View.extend({
		// We provide this container by adding a meta box in WordPress.
		el: '#media-wall-curation',

		// Setup the events used in the overall application view.
		events: {
			'click #submit-media-url': 'submitURL',
		},

		/**
		 * @param item Media item to add to the wall.
		 */
		addOne: function( item ) {
			var view = new wsuMediaWall.itemView({ model: item });

			$('.current-media').append( view.render().el );
		},

		submitURL: function(evt) {
			evt.preventDefault();

			var url = $('#capture-media-url').val();

			if ( '' === url ) {
				return;
			}

			var data = {
				'action': 'wsuwp_media_wall_item',
				'_ajax_nonce' : wsuMediaWall_nonce,
				'url': url
			};

			var response_data;

			$.post(ajaxurl, data, function(response) {
				if ( response['success'] === false ) {
					// @todo output response.data in an error message template.
				} else {
					response_data = response;

					console.log( response_data );

					var item = new wsuMediaWall.item({
						imageSource: response_data.data.hosted_image_url,
						imageSourceURL: response_data.data.original_share_url,
						imageUserName: response_data.data.username
					});
					wsuMediaWall.app.addOne(item);
				}
			});
		}
	});
})(window, Backbone, jQuery, _, wsuMediaWall);