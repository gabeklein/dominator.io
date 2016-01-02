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

parseID(id,$) => {
    id=id.toLowerCase().replace(new RegExp(" ","g"),"").split(/(?=[:#\.@])/);
	if(!$.$Atr) $.$Atr={};
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
CloneForIn(to, from, shallow) => { 
	for(var key in from) if(!shallow || O.hasOwnProperty(from, key)) 
		O.defineProperty(to, key, O.getOwnPropertyDescriptor(from, key));
	return to;
 }
Err(err) => {throw new Error(err)}
isArr(arr) => arr && O.prototype.toString.call( arr ) === '[object Array]'
nEnum(a,b) => a&&def(a,b,{enumerable:false})[b]


var O=Object, New=O.create, def=O.defineProperty, des=O.getOwnPropertyDescriptor,
Inherit = O.setPrototypeOf || ({__proto__:[]}) instanceof Array && function(o, p){ o.__proto__ = p; } || CloneForIn,
Element = %{
	DO(f){
		function L(){ C.parse(ARGS, F); return L };
		var C = L.$ = Build.New(this), F=this.__factory__;

		F && Inherit(L,F);
		if(f isFun)//{ try{ 
			f.call(L,L)===L && L.$.Current.done(); 
		//} catch(x){ console.log(x) } }
		else{
			C.parse(ARGS,F)
			return L;
		}
	}
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
	INIT(){}
	set init(a){this.INIT = a}
	get init(){ return (t,a)=>{ t.INIT.apply(t, [t].concat(a)) }}
 }, 
Build = %{
	New(on, cb){
		if(!(n = on._build_)) (n=New(this)).parent = on;
		var n, cb = cb || n.Current;
		n.Current = %{
			i:-1
			node:on
			done:cb isFun ? cb : function(){
				n.Current = cb;
			}
		}
		return n;
	 }
	insert(def, x){
		var t=this;
		if(!def) return t.Current.i = x;
		var Node,
			Type = def.pr,
			Elem = New(Type),
			Cur = t.next(Elem);//, afterInit);
		t.Current.i = def.i || 0;
		if(def.nm) t.parent[def.nm] = Elem;
		if(Node = Type.tagName){
		    Node = Elem.node = document.createElement(Node);
		    if(Type.$Text) Node.textContent = Type.$Text;
		    for(x in Node = Type.$Atr) Elem.at(x,Node[x]);
		    if(Node=Type.$Css)for(x=0; x<Node.length;) Elem.node.classList.add(Node[x++]);
		    Cur.node.append(Elem);
		}
		Node = Type.init(Elem, def.ag);
		return Elem;
	}
	next(a,b){
		var t=this;
		var FU = 0;
		while(t.Current.i === 0){ if(FU++ > 20) throw new Error("wtf Ho"); t.Current.done(); }
		var c = t.Current;
		t.Current = !a ? %{
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
		this.parent[name] = this.Current.node
	}
	map(args){
		this.insert=function(def){
			if(def.i || !def) Err("Nesting is not yet supported in the map function! Use a constructor instead!")
			if(def.nm)this.parent[nm]=list;
			for(var i=0;i<t;i++){
				list.push(Build.insert.call(this, {
					pr:def.pr, ag:def.ag.concat(x?x[i]:[], i)
				}))
			}
			for(def=2; def--;) this.Current.done();
			delete this.insert;
		}
		var g=args.length, t=args[0], x=null, i=1, list=[], y, k, l, v, w;
		this.next(null);
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

		//if(this.Current.i>0) this.Current.i+=t-1;
	 }
	parse(A, p_Fac){
		if(A[0] isNum && A.length==1) return this.insert(null, A[0]);
		else if(typeof A[0] != 'string') Err("Anonymous elements require atleast a tagname!");
		var $=New(Element), w=1, y, i, n, m, nCh;
		if(p_Fac) $.__factory__=p_Fac;
		if( (y=A[w]) isStr ){$.$Text=y; w++}
		if( (y=A[w]) isObj ){$.$Atr = y; w++}
		if( (y=A[w]) isNum ){nCh=y; w++}
		if( (y=A[w]) isFun ){$.INIT=y; w++}
		this.insert({pr:$, i:nCh, ag:A.slice(w), nm:parseID(A[0],$)})
	 }
 },
Commands = %{
 	i(n){ this.$.is(n); return this;}
 	o(name) this.$.on(name);
	w(cond) this.$.when(cond);
	m(){ this.$.map(cv(arguments)); return this;}
	get a(){this.$.insert(null, 1); return this;}
	get _(){ 
		var c=this.$.Current; 
		if(c.i<0) this.$.Current.done();
	}
	get END(){
		this.$.Current.done(); return this.$.cache;
	}
 };

window.dominator = function(opts){

	var root = {}, Deps = New(Commands);
		
	function compile(f){
		Insert() => { this.$.insert({pr:f,ag:ARGS}); return this; }
		def(f, "__factory__", {value:Insert});
		Inherit(Insert, Deps);
		return Insert;
	 }
	function parse(f, n){
		if(!f)return;
		var t = New(Element); n isStr && (n=n.toLowerCase());
		if(f isFun){
			t.tagName = n;
			t.INIT = f;
		} else {
			nEnum(f,"ID") ? parseID(f.ID,t) : (t.tagName = n || "noName"); n = nEnum(f,"ON");
			t.INIT = nEnum(f,"DO")
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
		for(x in f) link( (y = f[x])._ ? y : {_:y}, C[X], x);
	 }
	function define(n, factory){
		for(var i=0, x, C=root, y=(n=n.split('.')).pop(); x=n[i++];) C=C[x]||(C[x]=function throwNoFactory(){
			Err("Element Class exists but has no constructor! Probably it is a namespace.")
		 });
		link(factory isFun || !factory ? {_:ARGS(1)} : factory, C, y);
	 }
	define.use = (deps) => {
		for(var i=0, x; x=deps[i]; i++) CloneForIn(Deps, root[x]);
		return this;
	 }
	define.start = (name, target) => {
		if(target && (name = root[name]) isFun){
			var e;
			Function.call.call(name, {$:{insert:function(x){e=x.pr}}})
			e = New(e);
			e.node = target;
			e._build_=Build.New(e);
			for(name in target = e.$Atr) e.at(name,target[name])
			e.init(e);
		}
		else Err('Wot m8? You have no element called that.');
	 }
	return define;

}}