function(opts){

	var Deps = {},
		Defined = {};

	//reimplement by returning to nLevel recursively
	define(path, def) => { //broken
		if(!def) throw new Error("Bad Arguments: No definition for Element!")
		var cd=Defined, root = {},
			name=(path=path.split('.')).pop();

		for(var i=0, x; x=path[i++];) cd=cd[x];

		root[name] = root;
		put(root, "_root", Defined);
		Factory.compile(root)
	}


	define.startOnLoad = (control, callback) => {
		window.onload = () => {
			if(!document || !document.body) Err("`document.body` not found! Is this a browser enviroment?")
			define.start(control, document.body);
			if(callback isFun) callback();
		}
	}
	define.start = (control, target, args) => {
		var def =
		  control isStr
			? root[control]
				&& New(root[control]._template)
				|| Err('Control Element "' + control + '" is not yet imported or registered!')
			: control isFun
				? Factory.quickDef(control, target.tagName)
				: control isObj
					? Factory.compile(control)
					: Err("First argument must be identifier of an installed element, in-line element, or initializer function!")
		def.node = target;
		def.innerDefs = Deps;
		def.ElementDidLoad(args);
	}
	return define;
}
