(function(){
	//EXPORT
	return build;
	build(instance, doPhase, params) => {
		var build = newSession(instance);
		doPhase.apply(instance, [build].concat(params || []))
		build.END()
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
			var a = A[0], i = 1, x, meta = {};
			if(a isNum) return expect(a)
			else a isStr
				? Factory.parse(A[0], meta)
			 	: Err("Anonymous elements require atleast a tagname!");
			if( (a=A[i]) isStr ){i++; meta.text=a}
			if( (a=A[i]) isObj ){i++; for(x in a) meta.atrs[x] = a[x]}
			if( (a=A[i]) isNum ){i++; meta.expects=a}
			if( (a=A[i]) isFun ){i++; put(meta, "ElementDidLoad", (args) => { build(this, does, args))}
			spawn(meta)
		}
		spawn(meta, args) => {
			var parentNode = pushContext(meta.expects, meta.innerDidLoad).node;
			if(Override && Override()) return;

			var i, x, a,
				instance = State.node = New(meta.elem || Element),
				element = instance.node = document.createElement(meta.tag);
			if(a = meta.wrap) for(i=0, x; x=a[i++];){} //process wrapper elements
			if(a = meta.name) addReference(a, instance);
			if(a = meta.text) element.textContent = a;
			for(x in i = meta.atrs) instance.at(x, i[x]);
			for(i=0, x=meta.css; i<x.length;) instance.cl(x[i++]);

		 	parentNode.append(element);
			if(a = meta.ElementDidLoad) a.call(instance, args);
		}
		spawnOnlyIf(cond, expects) => {
			if(!cond){
				pushContext(expects || 1)
				State.onDone = () => {Override = null}
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
		// map(params) => {
		// 	var reps;
		// 	&() => parse{
		// 		var args = cv(pram), nArg=args.length, norm = [], i, j, k, cache, row, lengthwise;
		// 		if(isArr(args[0])){
		// 			reps = args[0].length;
		// 			for(i=0; cache = args[i++];)
		// 				if(cache.length == reps) norm.push(cache)
		// 				else Err("Inupt arrays must be consistent.");
		// 		}
		// 		else if((reps = args.shift()) isNum){
		// 			if(reps < 0){ reps=-reps; lengthwise = true; }
		// 			if(!--nArg) return;
		// 			else for(i=0; cache = args[i++];)
		// 				if((k=cache.length) == reps) norm.push(cache);
		// 				else for(j=0, k=k/reps; j<k; j++)
		// 					norm.push(cache.slice(reps*j,reps*j+reps));
		// 		}
		// 		else Err("Map requires a number or modal array.");
		//
		// 		pram = [];
		//
		// 		for(i=0, nArg=norm.length; i<reps; i++){
		// 			pram.push(cache = [])
		// 			for(j=0; j<nArg;) cache.push(norm[j++][i])
		// 		}
		// 	}
		// 	pushContext(1, %{InnerDidLoad(){
		// 		Override = null;
		// 	}});
		// 	Override = function(def){
		// 		var l, list = def.nm && (this.parent[def.nm] = []);
		// 		if(!def.pr.hasOwnProperty("ElementDidLoad")) def.pr.ElementDidLoad = this.setText; //UNACCEPTABLE!!!
		// 		for(var i=0; i<reps; i++){
		// 			l = Build.insert.call(this, {
		// 				pr:def.pr,
		// 				ag:def.ag.concat(pram[i] || [], i)
		// 			})
		// 			list && list.push(l);
		// 		}
		// 		for(i=2; i--;) State.pop();
		// 		Override = null;
		// 	}
		// }
	}
}())
