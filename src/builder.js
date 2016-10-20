(function(){
//EXPORT

	build(type, instance, doPhase, params) => {
		var build = session(instance, type);
		doPhase.apply(instance, [build].concat(params || []))
		build.END()
	}

	return build;

//UTILITY

	parse(id, meta) => {
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

//FACTORY
	session(Parent, Type) => {
	//INIT
		var Override, Cache,
			State = %{
				i:-1
				node:Parent
				type:Type
			}

		Do() => { make(__args); return Do}
		cloneForIn(Do, %{  // Build API: Built-in control and utility methods
			get a(){           expect(1) return Do}  // and: expect a single child
			m(){             map(__args) return Do}  // map: make mutliple nodes
			M(){     this.a; map(__args) return Do}  // shortcut for mapping -inside- last element
			i(name){     reference(name) return Do}  // is: add reference to last element in build parent
			w(cond){   spawnOnlyIf(cond) return Do}  // when: spawn children only if condition is true

			call(meta){ spawn(meta || {}, arguments) return Do}  // hook for predefined elements to spawn
			END(){
				while(State.i === 0) State.pop();
				return Cache;
			}
		})
		return Do;

	//PRIVATE METHODS

		pushContext(i, done) => {
			while(State.i === 0) State.pop();
			var hold = State;
			State = %{
				i: i || 0
				pop(){
					(State = hold).i--;
					if(done) done();
				}
			}
			return hold;
		}

		make(A) => {
			var a = A[0], i = 1, x, meta = {atr:{}, css:[]};
			if(a isNum) return expect(a);
			if(a isStr) parse(a, meta)
			else Err("Anonymous elements require atleast a tagname!");
			if( (a=A[i]) isStr ){i++; meta.text=a}
			if( (a=A[i]) isObj ){i++; for(x in a) meta.atrs[x] = a[x]}
			if( (a=A[i]) isNum ){i++; meta.expects=a}
			if( (a=A[i]) isFun ){i++; put(meta, "didInsert", (args) => { build(this, a, args)})}
			spawn(meta)
		}

		spawn(type, args) => {
			var parentNode = pushContext(type.expects, type.willClose).node;
			if(Override && Override()) return;

			var i, x, a,
				instance = State.node = New(type.temp || Element),
				element = instance.node = document.createElement(type.tag);
			if(a = type.wrap) for(i=0, x; x=a[i++];){ /*process wrapper elements*/ }
			if(a = type.name) reference(a, instance);
			if(a = type.text) element.textContent = a;
			for(x in i = type.atrs) instance.at(x, i[x]);
			for(i=0, x=type.css; i<x.length;) instance.cl(x[i++]);

		 	parentNode.append(element);
			if(type.didInsert) type.didInsert(instance, args);
		}

		spawnOnlyIf(cond, nullifyN) => {
			if(cond) return;
			pushContext(nullifyN || 1)
			State.onDone = () => {Override = null}
			Override = () => true;
		}

		reference(name, elem) => {
			var p = Parent,
				e = elem || State.node,
				n = name || e.tag;

			if(p[n])
				if(isArr(p[n]))
					p[n].push(e)
				else p[n] = [p[n], e]
			else p[n] = e;
		}

		expect(n) => {
		   if (State.i) Err("Cannot redefine expectation for element's inner nodes");
		   State.i = n;
	  	}
		// map(params) => {
		// // 	var reps;
		// // 	&() => parse{
		// // 		var args = cv(pram), nArg=args.length, norm = [], i, j, k, cache, row, lengthwise;
		// // 		if(isArr(args[0])){
		// // 			reps = args[0].length;
		// // 			for(i=0; cache = args[i++];)
		// // 				if(cache.length == reps) norm.push(cache)
		// // 				else Err("Inupt arrays must be consistent.");
		// // 		}
		// // 		else if((reps = args.shift()) isNum){
		// // 			if(reps < 0){ reps=-reps; lengthwise = true; }
		// // 			if(!--nArg) return;
		// // 			else for(i=0; cache = args[i++];)
		// // 				if((k=cache.length) == reps) norm.push(cache);
		// // 				else for(j=0, k=k/reps; j<k; j++)
		// // 					norm.push(cache.slice(reps*j,reps*j+reps));
		// // 		}
		// // 		else Err("Map requires a number or modal array.");
		// //
		// // 		pram = [];
		// //
		// // 		for(i=0, nArg=norm.length; i<reps; i++){
		// // 			pram.push(cache = [])
		// // 			for(j=0; j<nArg;) cache.push(norm[j++][i])
		// // 		}
		// // 	}
		// // 	pushContext(1, %{WillClose(){
		// // 		Override = null;
		// // 	}});
		// // 	Override = function(def){
		// // 		var l, list = def.nm && (this.parent[def.nm] = []);
		// // 		if(!def.pr.hasOwnProperty("didInsert")) def.pr.didInsert = this.setText; //UNACCEPTABLE!!!
		// // 		for(var i=0; i<reps; i++){
		// // 			l = Build.insert.call(this, {
		// // 				pr:def.pr,
		// // 				ag:def.ag.concat(pram[i] || [], i)
		// // 			})
		// // 			list && list.push(l);
		// // 		}
		// // 		for(i=2; i--;) State.pop();
		// // 		Override = null;
		// // 	}
		// // }
	}
}())
