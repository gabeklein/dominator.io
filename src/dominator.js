macro ARGS{
	rule{($n:expr (,) ...)} => {cv(arguments, $n (,) ...)}
	rule{} => {cv(arguments)}
 }
let gets = macro{
	case infix{
		$obj:ident | gets $name:ident{$body ...}
	} => {
		letstx $accessor = [makeValue(unwrapSyntax(#{$name}), #{here})];
		return #{ def($obj, $accessor, {get:function(){$body ...}}) }
	}
	case infix{
		$obj:ident | gets $name:ident($args (,) ...){$body ...}
	} => {
		letstx $accessor = [makeValue(unwrapSyntax(#{$name}), #{here})];
		return #{ def($obj, $accessor, {get:function($args (,) ...){$body ...}}) }
	}
 }

"use strict"; 

cv(a,b,c) => [].slice.call(a,b,c);

&()=>{

var O=Object, New=O.create, def=O.defineProperty, des=O.getOwnPropertyDescriptor,
isArr = (arr) => arr && O.prototype.toString.call( arr ) === '[object Array]',
CloneForIn = function(to, from, shallow){ 
	for(var key in from) if(!shallow || O.hasOwnProperty(from, key)) 
		O.defineProperty(to, key, O.getOwnPropertyDescriptor(from, key));
	return to;
 },
Err = function(err){throw new Error(err)},
nEnum = (a,b) => a&&def(a,b,{enumerable:false})[b],
Inherit = O.setPrototypeOf
	|| ({__proto__:[]}) instanceof Array
    	? function(o, p){ o.__proto__ = p; }
    	: CloneForIn,
Element = %{
	DO(f){
		function L(){ C.parse(ARGS, F); return L };
		var C = L.$ = Factory.New(this), F=this.__factory__;
		Inherit(L,F);
		if(f isFun){
			try{ 
				f.call(L,L)===L && L.$.current.done();
			} catch(x){
				console.log(x)
			}
		} else {
			return L;
		}
	}
	insert(New, insertBefore){(New.parentNode = this).node.appendChild(New.node)}
	append(New){(New.parentNode = this).node.appendChild(New.node)}
	set text(n){ this.node.appendChild(document.createTextNode(n)) }
	binds(func){var t=this, a=ARGS(1); return function(){t[func].apply(t, a.concat(ARGS))} }
	at(a,b){b===null||this.node.hasAttribute(a)?this.node.removeAttribute(a):this.node.setAttribute(a,b||'') }
	on(a){
		var t = this, x;
		for(var x in a) c(x,a[x]);
		return a;
		c(a,b)=>{t.node.addEventListener(a,b)};
	 }
	innerIsInit(){}
	nodeIsInit(){}
	set init(a){this.nodeIsInit = a}
	get init(){ return (t,a)=>{ t.nodeIsInit.apply(t, [t].concat(a)) }}
 }, 
Factory = %{
	New(on){
		var n = New(this),
		c = n.current = %{
			i:-1
			node:on
			done(){
				n.current = c;
				on.IN && on.IN();
			}
		};
		n.parent = on;
		return n;
	 }
	insert(def){
		var t=this, c=t.current;
		if(!t.alt){
			var Type = def.pr,
				Elem = New(Type),
				Node = Type.tagName;
			if(Node){ 
			    Node = Elem.node = document.createElement(Node);
			    if(Type.$Text)Node.textContent = Type.$Text;
			    for(var x in Node = Type.$Atr) Elem.at(x,Node[x]);
			    if(Node=Type.$Css)for(x=0; x<Node.length;) Elem.node.classList.add(Node[x++]);
			    t.current.node.insert(Elem);
			}
			//Node = Type.init.apply(Elem, [Elem].concat(def.ag));
			Node = Type.init(Elem, def.ag);
			if(def.nm) this.parent[def.nm] = Elem;
			t.last = Elem;
		} else if(t.alt="map"){

		}
		if(def.i) t.push(def.i, function(){
			Elem.IN && Elem.IN();
			t.current=c;
		}); else t.next;
		return Elem;
	}
	push(i,d){
		var t=this, c=t.current;
		t.current=%{
			i:i
			node:t.last
			done:function () {
                i&&i();
                t.current = c;
            }
		}
		i=t.last.IN;
	}
	get next(){
		this.current.i--;
		while(this.current.i == 0) this.current.done();
	}
	and(n){}
	map(args){
		if(!this.alt){
			this.insert=function(def){
				if(def.i) Err("Nesting is not yet supported in the map function! Use a constructor instead!")
				var list=[];
				if(def.nm)this.parent[nm]=list;
				for(var i=0;i<t;i++){
					list.push(Factory.insert.call(this, {
						pr:def.pr, ag:def.ag.concat(x?x[i]:[], i)
					})
				)}
				delete this.insert;
			}
			var g=args.length, t=args[0], x=null, i=1, y, k, l, v, w;
			if(isArr(t)){
				for(l=t.length; i<g; i++) if(args[i].length!=l) Err("Input arrays not consistent")
				x = args;
			} else if(t isNum) { 
				if(g>1) for(x=[];i<g;i++){
					y=args[i]; 
					if(isArr(y) && (y.length % t) == 0){
						l=Math.abs(y.length/t); k=0;
						if(t>0)   for(;k<t;k++) x.push(y.slice(k*l,k*l+l));
						else for(t*=-1;k<t;k++){
							x.push(w=[]);
							for(v=0;v<l;v++) 
								w.push(y[k+t*v])
						}
					} else if(y isFun) x.push(y);
				else Err("Input must be function or Array divisible by "+t+" as indicated")
			}} else Err("Map requires number or arrays")

			if(this.current.i>0) this.current.i+=t-1;
			t; //times to repeat
			x; //is the arg matrix;
			l; //is the number of args per element

		} else {
			this.insert=function(){
				delete this.insert;
				t.next;
			}
		}
	}
	is(n){}
	on(n){}
	when(n){}
	parseID(id,$){
	    id=id.toLowerCase().replace(new RegExp(" ","g"),"").split(/(?=[:#\.@])/);
		$.$Atr={};
	    for(var i=0,m,n,name;n=id[i++];){
	        m=n.slice(1);
	        switch(n[0]){
	            case "@": $.$Atr[m]=0; break;
	            case "#": $.$Atr.id=m; break;
	            case ".": ($.$Css||($.$Css=[])).push(m); break;
	            case ":": name=m; $.tagName=$.tagName||m; break;
	            default : $.tagName=n;
	        }
	    }
	    return name;
	 }
	parse(args, p_Fac){
		if(args[0] isNum) return this.current.i=args[0];
		var $ = New(Element), w = 1, y, i, n, m, name, nCh;
		if(p_Fac)$.__factory__=p_Fac;
		name = Factory.parseID(args[0],$);
		if( (y=args[w]) isStr ){$.$Text=y;w++}
		if( (y=args[w]) isObj ){for(i in y)$.$Atr[i]=y[i]; w++}
		if( (y=args[w]) isNum ){nCh=y; w++}
		if( (y=args[w]) isFun ){$.nodeIsInit=y; w++}
		this.insert({pr:$,ag:args.slice(w),nm:name,i:nCh})
	 }
 },
Commands = %{
 	i(n){ return this.$.is(n) || this;}
 	o(name) this.$.on(name);
	w(cond) this.$.when(cond);
	m(){return this.$.map(cv(arguments)) || this;}
	get a(){this.$.push(); return this;}
	get _(){ 
		var c=this.$.current; 
		if(c.i<0) this.$.current.done();
	}
	get END(){
		this.$.current.done(); return this.$.cache;
	}
 };


window.dominator = function(opts){

	var root = {}, Deps = New(Commands);
		
	function compile(f){
		function Insert(){
			this.$.insert({pr:f,ag:ARGS}); return this;
		}
		def(f, "__factory__", {value:Insert});
		Inherit(Insert, Deps);
		return Insert;
	 }
	function parse(f, n){
		if(!f)return;
		var t = New(Element); n isStr && (n=n.toLowerCase());
		if(f isFun){
			t.tagName = n;
			t.nodeIsInit = f;
		} else {
			nEnum(f,"ID") ? Factory.parseID(f.ID,t) : (t.tagName = n || "noName"); n = nEnum(f,"ON");
			t.nodeIsInit = nEnum(f,"DO")
				? function(){ n && n.apply(this, arguments); this.DO(f.DO) }
				: n || function(){};
			for(var x in f)
				if(x[0]=="_") (t.$Atr||(t.$Atr={}))[x.substr(1)] = f[x]; 
				else def(t,x,des(f,x))
		}
		return compile(t);
	 }
	function link(f, C, X){
		var x = parse(nEnum(f,"_"), X), y;
		C[X] = C[X]
		  ? x && CloneForIn(x, C[X], true) || C[X]
		  : x || function throwNoFactory(){
		  		Err("Element Class exists but has no constructor! Probably it is a namespace.")
		  };
		for(x in f)
			link( (y = f[x])._ ? y : {_:y}, C[X], x);
	 }
	function define(n, factory){
		for(var i=0, x, C=root, y=(n=n.split('.')).pop(); x=n[i++];) C=C[x]||(C[x]=function throwNoFactory(){
			Err("Element Class exists but has no constructor! Probably it is a namespace.")
		 });
		link(factory isFun || !factory ? {_:ARGS(1)} : factory, C, y);
	 }
	define.use = (deps) => {
		for(var i=0, x; x=deps[i]; i++){
			CloneForIn(Deps, root[x]);
		}
		return this;
	 }
	define.start = (name, target) => {
		if(target && (name = root[name]) isFun){
			var e;
			Function.call.call(name, {$:{insert:function(x){e=x.pr}}})
			e = New(e);
			e.node = target;
			for(name in target = e.$Atr) e.at(name,target[name])
			e.init(e);
		}
		else Err('Wot m8? You have no element called that.');
	 }
	return define;

}}