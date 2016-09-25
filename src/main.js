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
			? function(o, p){ o.__proto__ = p; } : CloneForIn;

	isArr(a) => {
		return a && Object.prototype.toString.call( a ) === '[object Array]' && a
	}
	nenum(a,b,c) => {
		return def(a,b,c ? {value:c} : {enumerable:false})[b];
	}
	cv(a,b,c) => {
		return [].slice.call(a,b,c)
	}
	put(a,b,c) => {
		if(b isStr) def(a, b, {value:c});
		else for(c in b) def(a, c, b[c]);
		return a
	}

	Err(e) => { throw new Error(e) }
	Warn(e) => { console.warn(e) }
	CloneForIn(to, from, shallow) => {
		var O = Object;
		for(var key in from) if(!shallow || O.hasOwnProperty(from, key))
			O.defineProperty(to, key, O.getOwnPropertyDescriptor(from, key));
		return to;
	}

	@import "element.js";
	@import "commands.js";
	@import "build.js";
	@import "factory.js";

	var MainFactory = Factory();
		MainFactory.New = Factory;

	return MainFactory;

}))
