var Build = () => {
//EXPORT

	return (does, instance, params) => {
		var build = session(instance);
		(does || instance.type.DO).apply(instance, [build].concat(params || []))
		build.END()
	}

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

	session(Parent) => {
	//INIT
		var SpawnOp = spawn, Cache = {},
			State = %{
				i:-1
				node:Parent
			}

		Use(type) => () => {
			insert(type, arguments);
			return Do
		}

		Do() => {
			make(__args);
			return Do
		}

		Cmd %{  // Build API: Built-in control and utility methods
			get a(){           expect(1) return Do}  // and: expect a single child
			m(){             map(__args) return Do}  // map: make mutliple nodes
			M(){     this.a; map(__args) return Do}  // shortcut for mapping -inside- last element
			i(name){     reference(name) return Do}  // is: add reference to last element in build parent
			w(cond){   spawnOnlyIf(cond) return Do}  // when: spawn children only if condition is true
			END(){
				while(State.i === 0) State.pop();
				Parent.type.willClose(Parent, Cache);
			}
		}

		Do  >> Inherit(Cmd)
		Cmd >> Inherit(delegate(Parent.type.defs));

		return Do;

	//METHODS

		delegate(ctx) => {
			var deligates = {}, x;
			for(x in ctx) deligates[x] = Use(ctx[x])
			return deligates;
		}

		push(i, done) => {
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

		insert(type, args) => {
			var onto = push(type.expects, type.IN && type.willClose).node;
			Process(type, args, onto);
		}

		make(A) => {
			var a = A[0], i = 1, x, type = new Type();
			if(a isNum) return expect(a);
			if(a isStr) parse(a, type)
			else Err("Anonymous elements require atleast a tagname!");
			if( (a=A[i]) isStr ){i++; type.text=a}
			if( (a=A[i]) isObj ){i++; for(x in a) type.atrs[x] = a[x]}
			if( (a=A[i]) isNum ){i++; type.expects=a}
			if( (a=A[i]) isFun ){i++; type.DO=a}
			insert(type);
		}

		spawn(type, args, parentNode) => {
			var i, x, a,
				instance = State.node = New(type.element),
				element = instance.node = document.createElement(type.tag);
			if(a = type.wrap) for(i=0, x; x=a[i++];){ /*Process wrapper elements*/ }
			if(a = type.name) reference(a, instance);
			if(a = type.text) element.textContent = a;
			for(x in i = type.atrs) instance.at(x, i[x]);
			for(i=0, x=type.clss; i<x.length;) instance.cl(x[i++]);

		 	parentNode.append(element);
			type.didInsert(instance, args);
			return instance;
		}

		spawnOnlyIf(cond, nullifyN) => {
			if(cond) return;
			push(nullifyN || 1)
			State.onDone = () => {SpawnOp = spawn}
			SpawnOp = () => true;
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

		map: @import "iterator.js";
	}
}()
