(function(){
	//EXPORTS
	return %{
		New: session
		run: build
		parse: parse
	}
	//HELPERS
	build(instance, doPhase, params) => {
		var build = newSession(instance);
		doPhase.apply(instance, [build].concat(params || []))
		build.END()
	}
	parse(id) => {
		var meta = {atr:{},css:[]};
		if((id=id.split(">")).length > 1) return id.map(parse);
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
	//FACTORY
	session(Parent) => {
		//INIT
		var Override, Cache,
			State = %{
				i:-1
				node:parent
			}

		Do() => { make(__args); return Do}
		CloneForIn(Do, %{  // Build API: Built-in control and utility methods
			get a(){           expect(1) return Do}  // and: expect a single child
			m(){             map(__args) return Do}  // map: make mutliple nodes
			M(){     this.a; map(__args) return Do}  // shortcut for mapping -inside- last element
			i(name){  addReference(name) return Do}  // is: add reference to last element in build parent
			w(cond){   spawnOnlyIf(cond) return Do}  // when: spawn children only if condition is true

			call(def, meta){ spawn(meta || {}, def, arguments) return Do}  // hook for predefined elements to spawn
			END(){
				while(State.i === 0) State.pop();
				return Cache;
			}
		})
		return Do;

		//PRIVATE METHODS
		make(A) => {
			if(A[0] isNum && A.length==1) return expect(A[0]);
			A[0] isStr || Err("Anonymous elements require atleast a tagname!");

			var a, b, i = 1, load,
				meta = parse(A[0]);

			if(isArr(meta)) meta = put(meta.pop(), "wrap", meta);
			if( (a=A[i]) isStr ){i++; meta.text=a}
			if( (a=A[i]) isObj ){i++; for(b in a) meta.atrs[b] = a[b]}
			if( (a=A[i]) isNum ){i++; meta.expects=a}
			if( (a=A[i]) isFun ){i++; put(element, "ElementDidLoad", Factory.quickDef(a))}
			spawn(meta, element)
		}
		spawn(meta, def, args) => {
			var parent = pushContext(null, meta.expects);

			if(Override && Override()) return;

			var i, x, a,
				instance = State.node = def isFun
					? def(New(Element), 'ElementDidLoad', def)
					: New(def || Element),
				element = instance.node = document.createElement(def.tagName);

			if(a = meta.name) addReference(a, element);
			if(a = meta.text) element.textContent = a;
			if(a = meta.wrap) for(i=0, x; x=a[i++];) {
				//process wrapper elements
			}
			for(x in i = meta.atrs)
				instance.at(x, i[x]);
			for(i=0, x=meta.css; i<x.length;)
				element.classList.add(x[i++]);

		 	parent.node.append(element);
			instance.ElementDidLoad(args);
			return instance;
		}
		spawnOnlyIf(cond, expects) => {
			if(!cond){
				pushContext(
					%{ InnerDidLoad(){Override = null} },
					expects || 1
				)
				Override = () => true;
			}
		}
		addReference(name, elem) => {
			var p = Parent,
				e = elem || State.node,
				n = name || e.tagName;

			p[n]? isArr(p[n])
					? p[n].push(e)
					: p[n] = [p[n], e]
				: p[n] = e;
		}
		expect(x) => {
		   if (State.i) Err('State element already expects a certain number of children. Overriding that may lead to bugs!');
		   State.i = x;
	   	}
		pushContext(a, i) => {
			while(State.i === 0) State.pop();
			var hold = State;
			State = %{
				i: i || 0
				node: a
				pop(){
					(State = hold).i--;
					a.InnerDidLoad();
				}
			}
			return c;
		}
		map(params) => {
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
			pushContext(%{InnerDidLoad(){
				Override = null;
			}}, 1);
			Override = function(def){
				var l, list = def.nm && (this.parent[def.nm] = []);
				if(!def.pr.hasOwnProperty("ElementDidLoad")) def.pr.ElementDidLoad = this.setText; //UNACCEPTABLE!!!
				for(var i=0; i<reps; i++){
					l = Build.insert.call(this, {
						pr:def.pr,
						ag:def.ag.concat(pram[i] || [], i)
					})
					list && list.push(l);
				}
				for(i=2; i--;) State.pop();
				Override = null;
			}
		}
	}
}())
