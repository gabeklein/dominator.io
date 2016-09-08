var Factory = function(opts){

	var Deps = New(Commands), root = {}
		isKey = /DO|ON|ID|IN/,
		isProperty = /^[a-z]/;

	namespace(ns) => {
		Err("namespace not yet implemented!");
		return function(){}
	}
	//reimplement by returning to nLevel recursively
	define(path, def) => {
		if(!def) throw new Error("No definition; we need a definition!")
		var cd=root, name=(path=path.split('.')).pop();
		for(var i=0, x; x=path[i++];) cd=cd[x];
		link(def, cd, name);
	}
	link(def, dir, name) => {
		var tree = destruct(def),
			existing = dir[name],
			spawner = tree.root;
		if(!dir && (spawner || Err("Cannot register an element with no properties!")));
		else spawner = (existing && spawner)
			? CloneForIn(spawner, existing, true)
			: existing || spawner || namespace();
		for(x in membs) link(membs[x], a, x);
		return a;
	}
	destruct(def) => {
		var temp = New(Element), tree = {}, meta={};
		if(def isFun) meta.DO = def;
		else {
			if(x = noemum(def, "ID")) meta = Build.parse(x);
			for(var x in def){
				if(isProperty.test(y)) temp[y]=def[y];
				else if(isKey.test(y)) meta[y]=def[y];
				else if( /^_/.test(y))
					( def[x] isStr ? meta.atrs : {} )
						[x.substr(1)] = def[x];
				else tree[y]=def[y];
			}
		}
		//non-enumerably add _root and return members
		return def(tree, "root", {value:
			Build.setup(root, meta)
		});
	}
	// template(ptype, name) => {
	// 	name=name.toLowerCase();
	// 	//bug: when element is set again, it ignores first id, then collides with existing id if same.
	// 	if(k.ID) Build.parse(k.ID, ptype)
	// 	else ptype.tagName = name || "div";
	// 	return factory(prototype, name);
	// }

	factory(f, name) => {
		name = name || undefined; //idk actually
		Insert() => { this.$.insert({pr:f, ag:__args, nm:name}); return this; }
		def(f, "__factory__", {value:Insert});
		Inherit(Insert, Deps);
		return Insert;
	}
	define.use = (deps) => {
		if(deps isStr) deps=[deps];
		for(var i=0, x; x=deps[i]; i++) CloneForIn(Deps, root[x]);
		return this;
	}
	define.startOnLoad = (control) => {
		window.onload = () => {
			if(!document || !document.body) Err("`document.body` not found! Is this a browser enviroment?")
			define.start(control, document.body)
		}
	}
	define.start = (control, target) => {
		var def;
		if(control isStr){
			if(root[control] isFun)
				({ _: root[control], $:{ insert:function(x){ def=New(x.pr) }}})._();
			else Err('Control Element "' + control + '" is not yet imported or defined!');
		} else def =
			control isFun ? New(Element, { INIT: {value:control} }) :
			control isObj ? link(control) :
			Err("First argument must be identifier of an installed element, in-line element, or initializer function!")
		def.node = target;
		def.__factory__ = Deps;
		def.INIT();
	}
	return define;
}
