"use strict";
(function(root, mod){
	if (typeof define === 'function' && define.amd) define([], mod);
	else if (typeof module === 'object' && module.exports) module.exports = mod();
	else root.dom = mod();
}(this, function(){

	@import "utility.js";
	@import "builder.js";
	@import "factory.js";
	@import "type.js";

	Factory()
		>> put("New", Factory)
		>> return;

}))
