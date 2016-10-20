var New=Object.create,

	def=Object.defineProperty,

	Inherit = Object.setPrototypeOf ||
		({__proto__:[]}) instanceof Array
			? function(object, prototype){ object.__proto__ = prototype; }
			: cloneForIn;

Err(e) => { throw new Error(e) }

Warn(e) => { console.warn(e) }

isArr(a) => a && Object.prototype.toString.call(a) === '[object Array]' && a || false

cv(a,b,c) => [].slice.call(a,b,c)

hide(a,b,c) => def(a,b,c ? {value:c} : {enumerable:false})[b];

put(a,b,c) => {
	if(b isStr) def(a, b, {value:c});
	else for(c in b) def(a, c, b[c]);
	return a
}

cloneForIn(onto, from, shallow) => {
	var O = Object;
	for(var key in from)
		O.defineProperty(onto, key, O.getOwnPropertyDescriptor(from, key));
	return onto;
}
