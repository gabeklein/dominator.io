(function(){
	var isKey = /DO|ON|ID|IN/,
		isProperty = /^[a-z]/;

	flatWrap(Do) => (args) => {
		Build.run(this, Do, args)
	}

	callable(meta, def) => {
		fac() => { this._.spawn(meta, def, __args); return this; }
		put(def, "_factory", fac);
		put(fac, "_template", def)
		Inherit(fac, Deps);
		return fac;
	}

	wrap(element, meta) => {
		put(element, "ElementDidLoad", (args) => {
			for(var n=meta.css, i=n.length; i > 0;) this.cl(n[--i]);
			for(n in meta.atrs) this.at(n, atrs[n]);
			if(meta.ON) args = isArr(meta.ON.apply(this, args)) || [];
			if(meta.DO) Build.run(this, meta.DO, args)
			return meta.name;
		})
		if(meta.IN) put(element, "InnerDidLoad", meta.IN)
	}

	compile(def, name, parent) => {
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
		put(temp, "ElementDidLoad", wrap(meta));
		put(tree, "_root", callable(meta, temp));
		return tree
	}
	
	setText($, t) => {
		if(t isStr) $.text=t;
	}

	return %{
		quickDef(does, name){
			var temp = New(Element);
			put(temp, "ElementDidLoad", flatWrap(does));
			temp.tagName = name;
			return temp;
		}
		compile(q){
			var i = 0, q = [q], outer;
			while(outer = q[i]){
				for(var x in outer){
					var inner = compile(outer[x], x),
						root = callable({}, inner._root),
						existing = outer._root[x];

					inner._root = (root && existing)
					? CloneForIn(root, existing, true)
					: existing || root || Err("Cannot Define Nothing")

					q.push(inner)
				}
			    if (++i > q.length / 2){ q = q.slice(i); i = 0; }
			}
		}
	}

}())
