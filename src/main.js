(function(root, mod){
	"use strict";
	if (typeof define === 'function' && define.amd) define([], mod);
	else if (typeof module === 'object' && module.exports) module.exports = mod();
	else root.dom = mod();
}(this, function(){

	@import "utility.js";

	var Element = @import "element.js";
		Factory = @import "factory.js";
		Build   = @import "builder.js";

	var API = Factory();
		API.New = Factory;

	return API;

}))
