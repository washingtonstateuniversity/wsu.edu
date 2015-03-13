/* global Backbone, jQuery, _ */
var wsuMediaWall = wsuMediaWall || {};

(function (window, Backbone, $, _, wsuMediaWall) {
	'use strict';

	wsuMediaWall.item = Backbone.Model.extend({
		default: {
			mediaID: '',
			imageSource: '',
			imageSourceURL: '',
			imageUserName: ''
		}
	});

	wsuMediaWall.item.prototype.sync = function  () { return null; };
	wsuMediaWall.item.prototype.fetch = function () { return null; };
	wsuMediaWall.item.prototype.save = function () { return null; };
})(window, Backbone, jQuery, _, wsuMediaWall);