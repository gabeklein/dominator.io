(function(root, mod){
	"use strict";
	if (typeof define === 'function' && define.amd) define([], mod);
	else if (typeof module === 'object' && module.exports) module.exports = mod();
	else root.dom = mod();
}(this, function(){

	var New=Object.create,
		def=Object.defineProperty,
		des=Object.getOwnPropertyDescriptor,
		Inherit = Object.setPrototypeOf ||
			({__proto__:[]}) instanceof Array
				? function(o, p){ o.__proto__ = p; }
				: CloneForIn;

	Err(e) => { throw new Error(e) }
	Warn(e) => { console.warn(e) }
	CloneForIn(onto, from, shallow) => {
		var O = Object;
		for(var key in from) if(!shallow || O.hasOwnProperty(from, key))
			O.defineProperty(onto, key, O.getOwnPropertyDescriptor(from, key));
		return onto;
	}

	isArr(a) => a && Object.prototype.toString.call(a) === '[object Array]' && a || false
	nenum(a,b,c) => def(a,b,c ? {value:c} : {enumerable:false})[b];
	cv(a,b,c) => [].slice.call(a,b,c)
	put(a,b,c) => {
		if(b isStr) def(a, b, {value:c});
		else for(c in b) def(a, c, b[c]);
		return a
	}

	var Element  = @import "element.js";
	var Build    = @import "build.js";
	var Factory  = @import "factory.js";

	var initialAPI = Factory();
		initialAPI.New = Factory;

	return initialAPI;

}))
