sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/StandardListItem",
	"sap/m/ListType"
], function (Controller, StandardListItem, ListType) {
	"use strict";

	return Controller.extend("ovly.random-cat.controller.View1", {

		/**
		 * Attributes
		 */
		endpoint: "https://aws.random.cat/meow",

		counter: 1,

		/**
		 * Hook methods
		 */
		onInit: function () {
			// @type sap.m.List
			this._list = this.byId("cat-list");
			this._detailPage = this.byId("detail-page");
			this._image = this.byId("cat-image");
		},

		/**
		 * Event Handlers
		 */
		onEmpty: function (oEvent) {
			this.counter = 1;
			this._list.removeAllItems();
		},

		onAdd: function (oEvent) {
			this._callAPI();
		},

		onPressItem: function (oEvent) {
			var oItem = oEvent.getSource();
			this._updateDetailPage({
				id: oItem.getTitle(),
				url: oItem.getIcon()
			});
		},

		/**
		 * Auxiliar methods
		 */
		_callAPI: function () {
			$.get(this.endpoint, function (oResponse) {
				this._addCatInsideList(oResponse.file);
			}.bind(this));
		},

		_addCatInsideList: function (sUrl) {
			var oNewItem = new StandardListItem({
				title: this.counter++,
				icon: sUrl,
				type: ListType.Navigation,
				press: [this.onPressItem, this] // bind
			});

			this._list.insertItem(oNewItem, 0);

			this._updateDetailPage({
				id: oNewItem.getTitle(),
				url: oNewItem.getIcon()
			});

		},

		/**
		 * @param {object} oCat 
		 * @param {string} oCat.id - History Id
		 * @param {string} oCat.url - Cat URL
		 */
		_updateDetailPage: function (oCat) {
			this._detailPage.setTitle(oCat.id);
			this._image.setSrc(oCat.url);
		}

	});
});