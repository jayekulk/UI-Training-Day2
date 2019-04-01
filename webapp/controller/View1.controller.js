sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"day2/day2_training_1/model/formatter"
], function (Controller,formatter) {
	"use strict";

	return Controller.extend("day2.day2_training_1.controller.View1", {
		formatter:formatter,
		onInit: function () {
         var oModel =new sap.ui.model.json.JSONModel("model/product.json");
         this.getView().setModel(oModel, "Products");
          var oModelXML = new sap.ui.model.xml.XMLModel();
          oModelXML.loadData("model/data.xml");
          
         this.getView().setModel(oModelXML, "Supplier");
         
         var oModelNorthwind = this.getOwnerComponent().getModel("NorthWindModel");
         sap.ui.core.BusyIndicator.show();
         oModelNorthwind.read("/Products", {
				success: function (oData) {
				   console.log(oData);
				var oModelNorth = new sap.ui.model.json.JSONModel();
				oModelNorth.setData(oData);
			 /*   var list =this.getView().byId("input");
			    list.bindElement("/results");*/
				this.getView().setModel(oModelNorth,"Northwind");
				
				 sap.ui.core.BusyIndicator.hide();
				}.bind(this),
				error: function (oData) {
					sap.m.MessageToast.show("Connection not established");
					sap.ui.core.BusyIndicator.hide();
				}
			});
         
		},
		onShowPress :function (){
				if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("day2.day2_training_1.fragments.products", this);
				this._oDialog.setModel(this.getView().getModel("Northwind"));
			}
				this._oDialog.open();
		},
		handleClose :function(){
				this._oDialog.close();
		},
		handleConfirm:function(oEvent){
		var value =oEvent.getParameters("selectedItem").selectedItem.getTitle();
		this.getView().byId("input").setValue(value);
		},
		onListPress:function(oEvent){
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext("Northwind");
			var sPath = oContext.getPath();
			var oProductDetailPanel = this.byId("SimpleFormChange354");
			oProductDetailPanel.bindElement({ path: sPath, model: "Northwind" });

		}
	});
});