(function(){
	function CloneForIn(to, from, shallow){ // !Incomplete Implmentation
		for(var key in from) if(!shallow || O.hasOwnProperty(from, key)) 
			O.defineProperty(to, key, O.getOwnPropertyDescriptor(from, key));
		return to;
	 }
	function Err(e){
		throw new Error(e)
	}
	function Warn(e){
		console.warn(e)
	}

	isArr(arr) => arr && Object.prototype.toString.call( arr ) === '[object Array]'
	noenum(a,b) => a && def(a,b,{enumerable:false})[b]
	cv(a,b,c) => [].slice.call(a,b,c)

	var New=Object.create, 
		def=Object.defineProperty, 
		des=Object.getOwnPropertyDescriptor,
		Inherit = Object.setPrototypeOf ||
			({__proto__:[]}) instanceof Array 
				? function(o, p){ o.__proto__ = p; } 
				: CloneForIn
	;

	var Element = %{
		get DO(){
			var N = Build.New(this);
			return (f)=>{
				if(f isFun){
					var n = f.apply(N.$.Current.node, [N].concat(__args(1)));
					if(n===N) N.$.Current.done();
				}
				else if(f) N.parse(__args);
				return N;
			};
		 }
		use(name, i){
			if(name isNum) i=name; name = "V";
			if((i = this[name = name+i]) isFun) this.DO(i);
		 }
		on(arg, one){

			var t=this, node=t.node;
			if(!t.listeners) t.listeners = {};

			for(var e, i = 0; e = arg[i];)
			    if(e isStr){ listen(e, arg[i+1]); i+=2}
			    else for(var x in e){ listen(x, e[x]); i++ }

			function listen(a, b){
				var event = one ? b : function(e){
					delete t.listeners[a];
					b(e); n.removeEventListener(a, event);
				}
				t.listeners[a] = event;
				node.addEventListener(a, event)
			}
		 }
		one(){ this.on(true, arguments) }
		off(a){ this.node.removeEventListener(a,this.listeners[a]) }
		itr(n, f){
			//run function n-times and return mapped enumerable
			//do I need this?
	        for(var i = 0, l = []; i < n; i++) l.push(f(i));
	        return l;
	     }
	    up(n){
	    	//retrieves node n-elements up the hierarchy. Default returns immediate parent.
	    	for(var y=this, n=n||1; n--;) y=y.parentNode;
	    	return y;
	     }
		append(New){
			//append naked DOM node into child node
			(New.parentNode = this).node.appendChild(New.node)
		 }
		get $(){
			//initialize jQuery on child node and return; remember instance.
			return jQuery isFun && def(this, "$", {value: jQuery(this.node)}).$
		 }
		set text(n){
			//override innerText of child element. Erases all existing child nodes!
			var e=this.node; while(e.hasChildNodes()) e.removeChild(e.lastChild); this.node.appendChild(document.createTextNode(n))
		 }
		binds(func){
			//generate anonymous function to call `this[func]` by enclosing `this` element.
			var t=this, a=__args(1); 
			return function(){t[func].apply(t, a.concat(__args))}
		 }
		at(a,b){
			//apply attribute to child DOM node. Remove if `b` is null. Sets as empty string if `b` is undefined.
			var n=this.node;
			(b===null || !b && n.hasAttribute(a))
			?n.removeAttribute(a)
			:n.setAttribute(a,b!=true&&b||'')
		 }
		cl(a,b){
			this.node.classList[ b === undefined && "toggle" || b && "add" || "remove"](a);
			//get shim working if necessitated
		 }
		INIT($,a){}
	 }; 

	var Commands = %{
		i(n){ this.$.is(n); return this;}
		o(name){ this.$.on(name); return this;}
		w(cond) {this.$.when(cond); return this;}
		m(){ this.$.map(arguments); return this;}
		M(){ this.a.$.map(arguments); return this;}
		get a(){
			this.$.expect(1); return this;
		}
		// get _(){ 
		// 	var c=this.$.Current; 
		// 	if(c.i<0) this.$.Current.done();
		// }
		get END(){
			this.$.Current.done(); return this.$.cache;
		}
	 };

	var Build = %{
		New(parent, on){
			function A(){ B.parse(__args, F); return A };
			var B = A.$ = parent.__build__ || New(this, {parent: {value: parent}}), 
				C = B.Current, 
				F = parent.__factory__;
			if(F) Inherit(A,F);
			A.parse = function(a){
				B.parse(a,F);
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
		insert(def, x){
			var t=this, Type = def.pr, Node=Type.Outer;
			if(Node) t.parse([Node,1]);
			//t.insert({pr:New(Element),nm:def.in,i:1});
			var Elem = New(Type),
				Cur = t.next(Elem);
			t.Current.i = def.i || 0;
			if(def.nm) t.is(def.nm);
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
			Node = Type.INIT.apply(Elem, [Elem].concat(def.ag))//.init(Elem, def.ag);
			return Elem;
		 }
		next(a,b){
			var t=this, c;
			while(t.Current.i === 0) t.Current.done(); 
			c = t.Current;
			t.Current = a == null ? %{
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
		parseID(id,$){
			id=id.toLowerCase().replace(new RegExp(" ","g"),"").split(">");
			if(id[1]){ $.Outer = id[0]; id=id[1] } else id = id[0];
		    id=id.split(/(?=[:#&.@])/);
			if(!$.$Atr) $.$Atr={};
		    for(var i=0,m,n,name;n=id[i++];){
		        m=n.slice(1);
		        switch(n[0]){
		            case "@": $.$Atr[m]=0; break;
		            case "#": $.$Atr.id=m; break;
		            case ".": ($.$Css||($.$Css=[])).push(m); break;
		            case "&": name=m; $.tagName=$.tagName||m; break;
		            default : $.tagName=n;
		        }
		    }
		    return name;
		 } 
		parse(A, parentFactory){
			if(A[0] isNum && A.length==1) return this.expect(A[0]);
			if(typeof A[0] != 'string') Err("Anonymous elements require atleast a tagname!");
			var $=New(Element), nChildren, a, i=1;
				if(parentFactory) $.__factory__ = parentFactory;
				if( (a=A[i]) isStr ){i++; $.$Text=a}
				if( (a=A[i]) isObj ){i++; $.$Atr=a}
				if( (a=A[i]) isNum ){i++; nChildren=a}
				if( (a=A[i]) isFun ){i++; $.INIT=a}
			this.insert({pr:$, i:nChildren, ag:A.slice(i), nm:this.parseID(A[0],$)})
		 }
	};

	window.dominator = function (opts){

		var Deps = New(Commands), root = {};

		define(name, def) => {
			if(!def) throw new Error("No definition; we need a definition!")
			var cd=root, y=(name=name.split('.')).pop();
			for(var i=0, x; x=name[i++];) cd=cd[x];
			link(def, cd, y);
		 }
		namespace(ns) => {
			return function(){

			}
		}
		link(def, dir, name) => {
		 	var y, x, a=null, self={}, memb={}, keys={};
		 	if(def isFun) keys.DO = def;
		 	else for(y in def){
		 		if(/^[a-z_]/.test(y))          a=self[y]=def[y];
		 		else if(/DO|ON|ID|IN/.test(y)) a=keys[y]=def[y];
		 		else memb[y]=def[y];
			 }
			if(a) a=template(keys, self, name);
			if(!dir && (a || Err("Can't spawn an element with no properties!")));
		 	else a = dir[name] = (x=dir[name])
			 	? a && CloneForIn(a, x, true) || x
			 	: a || namespace();
		 	for(y in memb) link(memb[y], a, y);
		 	return a; 
		 }
		template(k, f, n) => {
			var tmpl = New(Element), Do = k.DO, On = k.ON;
			tmpl.INIT = (Do && On)
			  ? function(){
			  		var build_args = On.apply(this, arguments);
			  		if(isArr(build_args)) 
				  		this.DO.apply(null, [Do].concat(build_args)) 
				  		else this.DO(Do)}
			  : Do && function(){this.DO.apply(null, [Do].concat(__args))} || On || function(){console.log(this.tagName)};
			if(k.IN) tmpl.IN = k.IN; 
			var $O, $D;
			for(var x in f){
				if(x[0]=="_")
					( f[x] isStr ? $O || ($O=tmpl.$Atr={}) 
					: f[x] isFun ? $D || ($D=tmpl.$Do={}) : {} )
						[x.substr(1)] = f[x];
				else def(tmpl, x, des(f,x))
			}
			if(n){ 
				n=n.toLowerCase();
				//bug: when element is set again, it ignores first id, then collides with existing id if same.
				if(k.ID) Build.parseID(k.ID, tmpl) 
					else tmpl.tagName = n || "div";
					return factory(tmpl, n);
			} 
			else return tmpl;
		 }
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
			for(var name in def.$Atr) def.at(name, def.$Atr[name])
			def.__factory__ = Deps;
			//def.__build__ = Build.New(def).$;
			def.INIT();
		 }
		return define;
	}
}())






