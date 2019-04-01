sap.ui.define([

], function () {
	"use strict";

	return {

		displayDate: function (date) {
			if (date !== null && date !== "")
			{
		var temp= date;
		var yyyy= temp.substring(0,4);
		var mm =temp.substring(4,6);
		var dd =temp.substring(6,8);
		var newDate = dd +"/"+ mm + "/" + yyyy;
		return newDate;
			}
		},
		
		decimal: function (dec){
			var temp =parseFloat(dec).toFixed(2);
			return temp;
		}

	};
});