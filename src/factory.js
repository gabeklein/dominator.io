(function(){

	return %{
		destruct: destruct
		parse: parse
		compile(def, name, branch){
			var outer = {_root:branch}, i = 0, q = [outer];
			put(outer, name, def);

			while(outer = q[i]){
				for(var x in outer){
					var existing = outer._root[x],
						inner = destruct(x, outer[x]);

					//inner._root =
					//  = (root && existing)
					// ? CloneForIn(root, existing, true)
					// : existing || root || Err("Cannot Define Nothing")

					q.push(inner)
				}
				if (++i > q.length / 2){ q = q.slice(i); i = 0; }
			}
			return
		}
	}

	parse(id, meta) => {
		meta.css=[]; meta.atr={};
		if(!id) return;
		id = (id=id.split(">")).length > 1
			? put(id.pop(), "wrap", id)
			: id[0].toLowerCase().replace(/ /g,"").split(/(?=[\[:#&.@^])/)
		for(var i=id.length, m, n, name; n=id[--i];){
			m=n.slice(1);
			switch(n[0]){
				case ".": meta.css.push(m); break;
				case "#": meta.atr.id=m; break;
				case "@": m.split(',').map((a)=>{ meta.atr[a]=0 }); break;
				case "[": meta.index=Number.parseInt(m.slice(0, -1)); break;
				case "&": meta.name=m; meta.tag=m; break;
				case "^": meta.index=true; break;
				default : meta.tag=n;
			}
		}
	}

	onload(Do, On) => {
		return (args) => {
			if(On) args = isArr(On.apply(this, args)) || [];
			if(Do) Build(this, Do, args)
		}
	}

	destruct(name, def) => {
		var type = {},
			temp = type.elem = New(Element),
			defs = type.innerDefs = {};
		parse(def.ID, type);
		for(var x in def){
			if(/^[a-z]/.test(x)) temp[x]=def[x];
			else if( /^_/.test(x)) ( def[x] isStr ? type.atrs : {} ) [x.substr(1)] = def[x];
			else if(/DO|ON|ID|IN/.test(x));
			else tree[x]=def[x];
		}
		put(type, {
			innerDidLoad: def.IN,
			elementDidLoad: onload(def.DO, def.ON)
		});
		initialize(temp, type);
		put(defs, "_self", spawner(type));
		return defs
	}

	spawner(meta) => () => this.call(meta || {}, __args);

}())
