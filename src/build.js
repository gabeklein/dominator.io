var Build = %{
	New(parent, on){
		function A(){
			B.interp(__args, F);
			return A
		};
		var B = A._ = parent.__build__ || New(this, {parent: {value: parent}}),
			C = B.Current, F = parent._factory;
		//Delete keys on parent after completion!!
		if(F) Inherit(A, F);
		B.Current = %{
			i:-1
			node:on || parent
			done:C isFun ? C : function(){
				B.Current = C;
			}
		};
		return A;
	}
	insert(meta, def, args){
		var instance = New(def), i, x,
			current = this.next(instance);

		if(meta.outer) for(i=0, x; x=meta.outer[i++];) {
			//process wrapper elements
		}

		this.Current.i = meta.nChildren || 0;

		if(element = def.tag){
			var element = instance.node = document.createElement(element);
			if(meta.text) element.textContent = meta.text;
			for(x in i = meta.atrs)
				instance.at(x, i[x]);
			for(i=0, x=meta.css; i<x.length;)
				element.classList.add(x[i++]);
			current.node.append(instance);
		}
		instance.ElementDidLoad(args);
		return element;
	}
	next(a,b){
		var t=this;
		//recursively pop frames where no more child calls are expected
		while(t.Current.i === 0) t.Current.done();
		var c = t.Current;
		t.Current = (a == null) ?
        %{
			i: -1
			node: c.node
			done(){
				t.Current = c;
				c.i--;
				t.Last = a;
			}
		} : %{
			i: 0
			node: a
			done(){
				t.Current = c;
				c.i--;
				b isFun && b(c);
				a.IN && a.IN();
				t.Last = a;
			}
		}
		return c;
	}
	is(name){
		var c = this.Current, p = this.parent, n = name || c.tagName, c=c.node;
		p[n] ? isArr(p[n]) ? p[n].push(c) : p[n] = [p[n], c] : p[n] = c;
	}
	setText($, t){
		if(t isStr) $.text=t;
	}
	map(pram){

		var reps;

		&() => parse{
			var args = cv(pram), nArg=args.length, norm = [], i, j, k, cache, row, lengthwise;
			if(isArr(args[0])){
				reps = args[0].length;
				for(i=0; cache = args[i++];)
					if(cache.length == reps) norm.push(cache)
					else Err("Inupt arrays must be consistent.");
			}
			else if((reps = args.shift()) isNum){
				if(reps < 0){ reps=-reps; lengthwise = true; }
				if(!--nArg) return;
				else for(i=0; cache = args[i++];)
					if((k=cache.length) == reps) norm.push(cache);
					else for(j=0, k=k/reps; j<k; j++)
						norm.push(cache.slice(reps*j,reps*j+reps));
			}
			else Err("Map requires a number or modal array.");

			pram = [];

			for(i=0, nArg=norm.length; i<reps; i++){
				pram.push(cache = [])
				for(j=0; j<nArg;) cache.push(norm[j++][i])
			}
		}
		this.next(null);
		this.insert=function(def){
			var l, list = def.nm && (this.parent[def.nm] = []);
			if(!def.pr.hasOwnProperty("ElementDidLoad")) def.pr.ElementDidLoad = this.setText; //UNACCEPTABLE!!!
			for(var i=0; i<reps; i++){
				l = Build.insert.call(this, {
					pr:def.pr,
					ag:def.ag.concat(pram[i] || [], i)
				})
				list && list.push(l);
			}
			for(i=2; i--;) this.Current.done();
			delete this.insert;
		}
	}

	parse(id){
		var meta = {atr:{},css:[]};
		if((id=id.split(">")).length > 1) return id.map(this.parse);
		else id=id[0].toLowerCase().replace(/ /g,"").split(/(?=[\[:#&.@^])/);
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
		return meta;
	}

	run(instance, instruct, info){
		var build = Build.New(instance);
		instruct.apply(instance, [build].concat(info || []))
		build.end();
	}

	wrap_do(Do) => (args) => {
		Build.run(this, Do, args)
	}

	wrap(element, meta){
		put(element, "ElementDidLoad", (args) => {
			for(var n=meta.css, i=n.length; i > 0;) this.cl(n[--i]);
			for(n in meta.atrs) this.at(n, atrs[n]);
			if(meta.ON) args = isArr(meta.ON.apply(this, args)) || [];
			if(meta.DO) Build.run(this, meta.DO, args)
			return meta.name;
		})
		if(meta.IN) put(element, "InnerDidLoad", meta.IN)
	}

	interp(A, parentFactory){
		if(A[0] isNum && A.length==1) return this.expect(A[0]);
		if(typeof A[0] != 'string') Err("Anonymous elements require atleast a tagname!");
		var $=New(Element), meta = this.parse(A[0]), i = 1, a, b;
		if(isArr(meta)) meta = def(meta.pop(), "outer", {value: meta})
		if( (a=A[i]) isStr ){i++; meta.text=a}
		if( (a=A[i]) isObj ){i++; for(b in a) meta.atrs[b] = a[b]}
		if( (a=A[i]) isNum ){i++; meta.nChild=a}
		if( (a=A[i]) isFun ){i++; put($, "ElementDidLoad", this.wrap_do(a))}
		if(parentFactory) put($, "_factory", parentFactory);
		this.insert(meta, $)
		if(meta.name) this.is( meta.name )
	}

};
