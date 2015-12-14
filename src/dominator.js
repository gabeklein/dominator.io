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
var Err = (() => {
	function Err(e){
		return function err(){
			if(!e isStr && isArr(e)) for(var E="", i=0, a=ARGS; i<e.length-1; i++) E+=e[i]+(a[i]||"");
			else E=e;
			throw new Error(E);
		}
	}
	var errors = {}, x, err={
		register:function(def){
			for(x in def) this[x]=Err(def[x]);
		}
	};
	return err;
}());

&()=>{

Err.register(%{
	unevn:["Input must be function or Array divisible by "," as indicated"]
	nonum:"Map requires number or arrays"
	incon:"Input arrays not consistent"
	ninit:"Element Class exists but has no constructor! Probably it is a namespace."
	nelem:"Error starting on element that does not exist!"

});
debugger;
var O=Object, New=O.create, def=O.defineProperty, des=O.getOwnPropertyDescriptor,
isArr = (arr) => O.prototype.toString.call( arr ) === '[object Array]',
CloneForIn = function(to, from, shallow){ 
	for(var key in from) if(!shallow || O.hasOwnProperty(from, key)) 
		O.defineProperty(to, key, O.getOwnPropertyDescriptor(from, key));
	return to;
 },
nEnum = (a,b) => a&&def(a,b,{enumerable:false})[b],
Inherit = O.setPrototypeOf
	|| ({__proto__:[]}) instanceof Array
    	? function(o, p){ o.__proto__ = p; }
    	: CloneForIn,
Element = %{
	get DO(){
		var C = LINK.$ = Factory.New(this);
		Inherit(LINK, this.__factory__);
		LINK() => { C.parse(ARGS); return LINK };
		def(LINK, "END", {get:function(){ C.current.done(); }});
		return LINK;
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
	get init(){ return ()=>{(this.nodeIsInit.apply(this, arguments)||{}).END} }
 }, 
Factory = %{
	New(on){
		var n = New(this);
		n.parent = on;
		n.current = %{
			i:-1
			node:on
			done(){
				console.log("woo done!")
			}
		};
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
			Node = Type.init.apply(Elem, [Elem].concat(def.ag));
			if(def.nm) this.parent[def.nm] = Elem;
			t.last = Elem;
		} else {}
		if(def.i) t.push(def.i); else t.next;
	}
	push(i){
		var t=this, c=t.current;
		t.current=%{
			i:i
			node:t.last
			done(){
				t.last.innerIsInit();
				t.current=c;
				t.next;
			}
		}
	}
	get next(){
		this.current.i--;
		while(this.current.i == 0) this.current.done();
	}
	and(n){}
	map(){
		if(!t.alt){
			var g=arguments.length, t=arguments[0], x=null, y, k, l, i=1, v, w;
			if(t && t.forEach){
				for(l=t.length; i<g; i++) if(!arguments.length==l) throw new Error("Input arrays not consistent")
				x = ARGS;
			} else if(t isNum){ if(g>1) for(x=[];i<g;i++){
				y=arguments[i]; 
				if(y.forEach && (y.length % t) == 0){l=Math.abs(y.length/t); k=0;
					if(t>0) for(;k<t;k++) x.push(y.slice(k*l,k*l+l));
					else for(t*=-1;k<t;k++){x.push(w=[]); for(v=0;v<l;v++) w.push(y[k+t*v]) }
				} else if(y isFun) x.push(y);
				else throw new Error("Input must be function or Array divisible by "+t+" as indicated")
			}} else throw new Error("Map requires number or arrays")
		} else {}
	}
	is(n){}
	on(n){}
	when(n){}
	parseID(id,$){
	    id=id.toLowerCase().replace(" ","").split(/(?=[:#\.@])/);
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
	parse(args){
		if(args[0] isNum) return this.current.i=args[0];
		var $ = New(Element), w = 1, y, i, n, m, name, nCh;
		name = Factory.parseID(args[0],$);
		if( (y=args[w]) isStr ){$.$Text=y;w++}
		if( (y=args[w]) isObj ){for(i in y)$.$Atr[i]=y[i]; w++}
		if( (y=args[w]) isNum ){nCh=y; w++}
		if( (y=args[w]) isFun ){$.nodeIsInit=y; w++}
		this.insert({pr:$,ag:args.slice(w),nm:name,i:nCh})
	 }
 },

Commands = %{
 	i(n)    this.$.is(n);     
 	o(name) this.$.on(name);  
	w(cond) this.$.when(cond);
	m()     this.$.make.apply(this, arguments);
	get a(){this.$.push(); return this;}
	get _(){ 
		var c=this.$.current; 
		if(c.i<0) this.$.current.done();
	}
 };

window.dominator = function(opts){

	var root = {},
		Deps = New(Commands),
		doNothing = function(){};

	function compile(f){
		function Insert(){
			this.$.insert({pr:f,ag:ARGS}); return this;
		}
		def(f, "__factory__", {value:Insert});
		Inherit(Insert, Deps);
		return Insert;
	 }
	function initDefault(){}
	function parse(f, n){
		if(!f)return;
		var template = New(Element), proto = f[1], id=nEnum(proto,"id");
		template.tagName = id ? Factory.parseID(id,template) : n.toLowerCase();
		template.nodeIsInit = f isFun?f:f[0] || initDefault;
		if(proto isFun) proto.call(template);
		else if(proto){ &() => {
			for(var x in proto)
				if(x[0]=="_") (template.$Atr||(temp.$Atr={}))[x.substr(1)] = proto[x]; 
				else def(template,x,des(proto,x))
		}}
		return compile(template);
	 }
	function link(f, C, X){
		var x = parse(nEnum(f,"_"), X);
		C[X] = C[X]
		  ? x && CloneForIn(x, C[X], true) || C[X]
		  : x || function throwNoFactory(){
		  		throw new Error("Element Class exists but has no constructor! Probably it is a namespace.")
		  };
		for(x in f) link( isArr(f[x])||(f[x] isFun) ? {_:f[x]} : f[x], C[X], x);
	 }
	function define(n, factory){
		for(var i=0, x, C=root, y=(n=n.split('.')).pop(); x=n[i++];) C=C[x]||(C[x]=function throwNoFactory(){
			throw new Error("Element Class exists but has no constructor! Probably it is a namespace.")
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
		else throw new Error('Wot m8? You have no element called that.');
	 }
	return define;

}}