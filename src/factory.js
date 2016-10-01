(function(){

	return %{
		quickDef(does, name){
			var temp = New(Element);
			put(temp, "ElementDidLoad", flatWrap(does));
			temp.tagName = name;
			return temp;
		}
		compile(def, name, branch){
			var outer = {_root:branch}, i = 0, q = [outer];
			put(outer, name, def);

			while(outer = q[i]){
				for(var x in outer){
					var existing = outer._root[x],
						inner = destruct(x, outer[x]);

					inner._root = spawner(inner._root, {})

					//  = (root && existing)
					// ? CloneForIn(root, existing, true)
					// : existing || root || Err("Cannot Define Nothing")

					q.push(inner)
				}
				if (++i > q.length / 2){ q = q.slice(i); i = 0; }
			}
		}
	}

	flatWrap(Do) => (args) => { Build.run(this, Do, args) };

	spawner(def, meta) => () => this.call(meta || {}, def, __args); //get rid of the DidLoads

	destruct(name, def) => {
		var temp = New(Element), defs = {}, meta = {};
		if(x = nemum(def, "ID")) meta = Build.parse(x, callName);
		for(var x in def){
			if(/^[a-z]/.test(y)) temp[y]=def[y];
			else if(/DO|ON|ID|IN/.test(y)) meta[y]=def[y];
			else if( /^_/.test(y))
				( def[x] isStr ? meta.atrs : {} )
					[x.substr(1)] = def[x];
			else tree[y]=def[y];
		}
		if(!temp.tagName) temp.tagName = meta.tag || name;
		initialize(temp, meta);
		put(defs, "_self", spawner(temp, meta));
		return defs
	}

	initialize(element, meta) => {
		put(element, "ElementDidLoad", (args) => {
			for(var n=meta.css, i=n.length; i > 0;) this.cl(n[--i]);
			for(n in meta.atrs) this.at(n, atrs[n]);
			if(meta.ON) args = isArr(meta.ON.apply(this, args)) || [];
			if(meta.DO) Build.run(this, meta.DO, args)
			return meta.name;
		})
		if(meta.IN) put(element, "InnerDidLoad", meta.IN)
	}

}())
