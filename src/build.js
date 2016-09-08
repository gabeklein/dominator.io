var Build = window.lol = %{
	New(parent, on){
		function A(){ B.interp(__args, F); return A };
		var B = A.$ = parent.__build__ || New(this, {parent: {value: parent}}),
			C = B.Current,
			F = parent.__factory__;
		//Delete these keys after completion!!
		if(F) Inherit(A,F);
		A.interp = function(a){
			B.interp(a,F);
		}
		B.Current = %{
			i:-1
			node:on || parent
			done:C isFun ? C : function(){
				B.Current = C;
			}
		};
		return A;
	}
	expect(x){
		//just check for hasOwnProperty
		if(this.hasOwnProperty("insert")) return Warn("Cannot explicitly expect children when overrides are in place. Ignoring command.")
		var c = this.Current;
		if(c.i) Warn("Current element already expects a certain number of children. Overriding that may lead to errors!");
		c.i = x;
	}
	insert(def, meta){
		var Type = def.pr, Elem = New(Type),
			Cur = this.next(Elem), Node;

		if(Node = meta.wrap) this.parse([Node,1]);
		this.Current.i = meta.nChildren || 0;
		if(def.nm) this.is(def.nm);



		if(Node = Type.tagName){
			Node = Elem.node = document.createElement(Node);
			if(Type.$Text) Node.textContent = Type.$Text;
			for(x in Node = Type.$Atr)
				Elem.at(x,Node[x]);
			if(Node=Type.$Css)
				for(x=0; x<Node.length;)
					Elem.node.classList.add(Node[x++]);
			Cur.node.append(Elem);
		}


		Elem.INIT(def.ag);
		//Node = Type.INIT.apply(Elem, [Elem].concat(def.ag))//.init(Elem, def.ag);
		return Elem;
	}
	next(a,b){
		var t=this, c;
		while(t.Current.i === 0) t.Current.done();
		c = t.Current;
		t.Current = a == null
        ? %{
			i:-1
			node:c.node
			done(){
				t.Current = c;
				c.i--;
				t.Last = a;
			}
		} : %{
			i:0
			node:a
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
	when(x){
		if(!x) this.insert = function(def){
			if(def.i || !def) Err("Nesting is not supported for conditional elements!")
			this.next(null);
			delete this.insert;
		}
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
			if(!def.pr.hasOwnProperty("INIT")) def.pr.INIT = this.setText;
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
		else id=id[0].toLowerCase().replace(/ /g,"").split(/(?=[\[:#&.@~^])/);
		for(var i=id.length, m, n, name; n=id[--i];){
			m=n.slice(1);
			switch(n[0]){
				case ".": meta.css.push(m); break;
				case "#": meta.atr.id=m; break;
				case "@": m.split(',').map((a)=>{ meta.atr[a]=0 }) break;
				case "[": meta.index=Number.parseInt(m.slice(0, -1)); break;
				case "&": meta.name=m; meta.tag=m; break;
				default : meta.tag=n;
			}
		}
		return meta;
	}
	setup(self, meta){
		if(Object.meta(meta)==0) return 0;
		def(self, "INIT", { value: (args) => {
			var n, i, o;
			for(n in meta.atrs) this.at(n, atrs[n]);
			for(n=meta.css, i=n.length; i > 0;) this.cl(n[--i]);
			if(meta.ON) var args = meta.ON.apply(this, arguments) || null;
			if(meta.DO){
				var build = Build.New(this);
				meta.DO.apply(build.$.Current.node, [build].concat[args || []])
				build.$.Current.done();
			}
			if(meta.IN) meta.IN.apply(this)
		}})
	}
	interp(A, parentFactory){
		if(A[0] isNum && A.length==1) return this.expect(A[0]);
		if(typeof A[0] != 'string') Err("Anonymous elements require atleast a tagname!");
		var $=New(Element), nChildren, meta = this.parse(A[0]);

		var i = 1, a, b;
		if( (a=A[i]) isStr ){i++; $.$Text=a}
		if( (a=A[i]) isObj ){i++; for(b in a) keys.atrs[b] = a[b]}
		if( (a=A[i]) isNum ){i++; meta.nChild=a}
		// if( (a=A[i]) isFun ){i++; $.INIT=a} //CHANGE TO DO

		if(parentFactory) $.__factory__ = parentFactory;

		this.insert({pr:$, ag:A.slice(i)})
		this.is( meta.name )
	}
};
