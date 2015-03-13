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
			'click .item-remove': 'removeItem'
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

			$('#capture-media-url').val('');

			if ( '' === url ) {
				return;
			}

			var data = {
				'action': 'wsuwp_media_wall_item',
				'_ajax_nonce' : wsuMediaWall.nonce,
				'post_id': wsuMediaWall.post_id,
				'url': url
			};

			var response_data;

			$.post(ajaxurl, data, function(response) {
				if ( response['success'] === false ) {
					// @todo output response.data in an error message template.
				} else {
					response_data = response;

					if ( false == response_data.data ) {
						console.log( 'empty data received' );
						return;
					}

					var item = new wsuMediaWall.item({
						mediaID: response_data.data.media_id,
						imageSource: response_data.data.hosted_image_url,
						imageSourceURL: response_data.data.original_share_url,
						imageUserName: response_data.data.username
					});
					wsuMediaWall.app.addOne(item);
				}
			});
		},

		removeItem: function(evt) {
			var target = $(evt.target),
				media_id = target.data('media-id');

			if ( undefined === media_id || '' === media_id ) {
				console.log( 'Missing media ID.' );
				return;
			}
			var data = {
				'action': 'wsuwp_media_wall_remove_item',
				'_ajax_nonce' : wsuMediaWall.nonce,
				'post_id': wsuMediaWall.post_id,
				'media_id': media_id
			};
			$.post(ajaxurl, data, function(response) {
				if ( false === response['success'] ) {
					console.log('Bad removal request received' );
				} else {
					target.parent().remove();
				}
			})
		}
	});
})(window, Backbone, jQuery, _, wsuMediaWall);