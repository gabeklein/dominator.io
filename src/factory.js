var Factory = function(opts){

	var Deps = New(Commands),
		Defined = {},
		isKey = /DO|ON|ID|IN/,
		isProperty = /^[a-z]/;

	//reimplement by returning to nLevel recursively
	register(path, def) => {
		if(!def) throw new Error("Bad Arguments: No definition for Element!")
		var cd=Defined, root = {},
			name=(path=path.split('.')).pop();

		for(var i=0, x; x=path[i++];) cd=cd[x];

		root[name] = root;
		put(root, "_root", Defined);
		stack(root)
	}
	stack(q) => {
		var i = 0, q = [q], outer;
		while(outer = q[i]){
			for(var x in outer){
				var inner = destruct(outer[x], x),
					root = factory(inner._root),
					existing = outer._root[x];

				inner._root = (root && existing)
				? CloneForIn(root, existing, true)
				: existing || root || Err("Cannot Define Nothing")

				q.push(inner)
			}
		    if (++i > q.length / 2){ q = q.slice(i); i = 0; }
		}
	}
	define(does, name) => {
		var temp = New(Element);
		put(temp, "ElementDidLoad", Build.wrap_do(does));
		temp.tagName = name;
		return temp;
	}
	destruct(def, name, parent) => {
		var temp = New(Element),
			tree = {}, meta = {};
		if(x = nemum(def, "ID")) meta = Build.parse(x, callName);
		for(var x in def){
			if(isProperty.test(y)) temp[y]=def[y];
			else if(isKey.test(y)) meta[y]=def[y];
			else if( /^_/.test(y))
				( def[x] isStr ? meta.atrs : {} )
					[x.substr(1)] = def[x];
			else tree[y]=def[y];
		}
		if(!temp.tagName) temp.tagName = meta.tag || name;
		put(temp, "ElementDidLoad", Build.wrap(meta));
		put(tree, "_root", factory(temp));
		return tree
	}
	factory(def) => {
		fac() => { this._.insert(def, __args); return this; }
		put(def, "_factory", fac);
		put(fac, "_template", def)
		Inherit(fac, Deps);
		return fac;
	}
	register.startOnLoad = (control, callback) => {
		window.onload = () => {
			if(!document || !document.body) Err("`document.body` not found! Is this a browser enviroment?")
			register.start(control, document.body);
			if(callback isFun) callback();
		}
	}
	register.start = (control, target) => {
		var def = control isStr
			? root[control]
				&& root[control]._template
				|| Err('Control Element "' + control + '" is not yet imported or registered!')
			: control isFun
				? define(control, target.tagName)
				: control isObj
					? link(control)
					: Err("First argument must be identifier of an installed element, in-line element, or initializer function!")
		def.node = target;
		def._factory = Deps;
		def.ElementDidLoad();
	}
	return register;
}
