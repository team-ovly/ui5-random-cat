sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/StandardListItem"
], function (Controller, StandardListItem) {
	"use strict";

	return Controller.extend("ovly.random-cat.controller.View1", {
		
		endpoint: "https://aws.random.cat/meow",
		
		counter: 1,
		
		onInit: function(){
			// @type sap.m.List
			this._list = this.byId("cat-list");
		},
		
		onEmpty: function (oEvent) {
			this.counter = 1;
			this._list.removeAllItems();
		},
		
		onAdd: function(oEvent){
			this._callAPI();
		},
		
		_callAPI: function(){
			$.get(this.endpoint, function(oResponse){
				this.addCatInsideList(oResponse.file);
			}.bind(this));
		},
		
		addCatInsideList: function(sUrl){
			var oNewItem = new StandardListItem({
				title: this.counter++,
				icon: sUrl
			});
			
			this._list.insertItem(oNewItem, 0);
		}
	});
});