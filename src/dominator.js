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
	id=id.toLowerCase().replace(new RegExp(" ","g"),"").split(">");
	if(id[1]){ $.Outer = id[0]; id=id[1] } else id = id[0];
    id=id.split(/(?=[:#\.@])/);
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
Enum(a,b) => a&&def(a,b,{enumerable:false})[b]


var O=Object, New=O.create, def=O.defineProperty, des=O.getOwnPropertyDescriptor,
Inherit = O.setPrototypeOf || ({__proto__:[]}) instanceof Array && function(o, p){ o.__proto__ = p; } || CloneForIn,
Element = %{
	// DO(f){
	// 	var N = Build.New(this), C = N.$.Current;
	// 	if(f isFun) f.call(C.node,N)===N && C.done(); //remember to put scope resolution on this. Transfer to supernew maybe?
	// 	else if(f) N.parse(ARGS);
	// 	return N;
	// }
	get DO(){
		var N = Build.New(this), C = N.$.Current;
		return (f)=>{
			if(f isFun) f.call(C.node,N)===N && C.done();
			else if(f) N.parse(ARGS);
			return N;
		};
	}
	USE(name, i){
		if(name isNum) i=name; name = "V";
		if((i = this[name = name+i]) isFun) this.DO(i);
	}
	ON(one, arg){
		var a, x, t=this, n=t.node, i=0, g=one==true?arg:arguments,
			listen = one==true ? (a,b) => {
				once(e)=>{
					delete t.listeners[a];
					b(e); n.removeEventListener(a, once);
				}
				t.listeners[a] = b;
				n.addEventListener(a, once);
			} : (a,b) => {
				t.listeners[a] = b;
				n.addEventListener(a, b);
			};
		if(!t.listeners) t.listeners = {};
		for (;a = g[i];)
		    if(a isStr){ listen(a, g[i+1]); i+=2}
		    else for(x in a){ listen(x, a[x]); i++ }
	}
	ONE(){ this.ON(true, arguments) }
	OFF(a){ this.node.removeEventListener(a,this.listeners[a]) }
	itr(n, f){
        for(var i = 0, l = []; i < n; i++)
            l.push(f(i));
        return l;
     }
    up(n){
    	for(var y=this, n=n||1; n--;) y=y.parentNode;
    	return y;
     }
	append(New){(New.parentNode = this).node.appendChild(New.node)}
	set text(n){var e=this.node; while(e.hasChildNodes()) e.removeChild(e.lastChild); this.node.appendChild(document.createTextNode(n)) }
	binds(func){var t=this, a=ARGS(1); return function(){t[func].apply(t, a.concat(ARGS))} }
	at(a,b){var n=this.node;
		(b===null || !b && n.hasAttribute(a))
		?n.removeAttribute(a)
		:n.setAttribute(a,b!=true&&b||'') }
	CS(a,b){
		this.node.classList[ b === undefined && "toggle" || b && "add" || "remove"](a);
		//get shim working if necessitated
	}
	INIT($,a){}
 }, 
Build = %{
	New(par, on){
		function L(){ $.parse(ARGS, F); return L };
		if(!(n = par._build_)) (n=New(this)).parent = par; //do I get rid of _build_?
		var n, cb = n.Current, F=par.__factory__, $=L.$=n;
		if(F) Inherit(L,F);
		L.parse = (a) => {
			$.parse(a,F);
		}
		n.Current = %{
			i:-1
			node:on || par
			done:cb isFun ? cb : function(){
				n.Current = cb;
			}
		};
		return L;
	 }
	insert(def, x){
		if(!def) return this.Current.i = x;
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
		    for(x in Node = Type.$Atr) Elem.at(x,Node[x]);
		    if(Node=Type.$Css)for(x=0; x<Node.length;) Elem.node.classList.add(Node[x++]);
		    Cur.node.append(Elem);
		}
		Node = Type.INIT.apply(Elem, [Elem].concat(def.ag))//.init(Elem, def.ag);
		return Elem;
	 }
	next(a,b){
		var t=this, c;
		while(t.Current.i === 0) t.Current.done(); 
		c = t.Current;
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
		var c = this.Current, p = this.parent, n = name || c.tagName, c=c.node;
		p[n] ? isArr(p[n]) ? p[n].push(c) : p[n] = [p[n], c] : p[n] = c;
	 }
	when(x){
		if(!x) this.insert = function(){
			if(def.i || !def) Err("Nesting is not yet supported in the when function!")
			this.next(null);
			delete this.insert;
		}
	 }
	map(args){
		this.insert=function(def){
			if(def.nm)this.parent[def.nm]=list;
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
			for(l=t.length; i<g; i++) if(args[i].length!=l) Err("Input arrays not consistent");
			t=l; //weird.
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
 	o(name){ this.$.on(name); return this;}
	w(cond) {this.$.when(cond); return this;}
	m(){ this.$.map(cv(arguments)); return this;}
	M(){ this.a.$.map(cv(arguments)); return this;}
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
	function namespace(Cdren, Arg){
		if(Arg[0] isNum && Arg.length == 1){



			// Insert() => { this.$.insert({pr:f,ag:ARGS,nm:n||undefined}); return this; }
			// def(f, "__factory__", {value:Insert});
			// Inherit(Insert, Deps);
			// return Insert;
		}
	 }
	function factory(f, n){
		Insert() => { this.$.insert({pr:f,ag:ARGS,nm:n||undefined}); return this; }
		def(f, "__factory__", {value:Insert});
		Inherit(Insert, Deps);
		return Insert;
	 }
	function template(f, n){
		if(!f)return;
		var t = New(Element);
		if(n isStr) n=n.toLowerCase();
		if(f isFun){
			t.tagName = n;
			t.INIT = f;
		} else {
			//when element is set again, it ignores first id, then collides with existing id if same.
			//This forces it into array mode because it thinks it's a dupe.
			//fix.
			Enum(f,"ID") ? parseID(f.ID,t) : (t.tagName = n || "noName");
			var DO = Enum(f,"DO"), ON = Enum(f,"ON");
			t.INIT = DO && ON
			  ? function(){ this.DO(DO); ON.apply(this, arguments) }
			  : DO && function(){this.DO(DO)} || ON || function(){};
			for(var x in f)
				if(x[0]=="_") (t.$Atr||(t.$Atr={}))[x.substr(1)] = f[x]; 
				else def(t,x,des(f,x))
		}
		return factory(t, n);
	 }
	function link(def, dir, name){
		if(!def._ && def.DO || def.ON) def = {_:def};
		var x = Enum(def,"_");
		if(dir[name]){ if(x){
			CloneForIn(template(x, name), dir[name], true) }}
		else dir[name] = x 
		  ? template(x, name)
		  : function ns(){
				return namespace(ns, arguments);
			}
		for(x in def) link(def[x], dir[name], x);
	 }
	function define(name, definition){
		var cDir=root, y=(name=name.split('.')).pop();
		for(var i=0, x; x=name[i++];) cDir=cDir[x];  /* || noNameSpace  */
		link(definition isFun || !definition ? {_:ARGS(1)} : definition, cDir, y);
	 }
	define.use = (deps) => {
		if(deps isStr) deps=[deps];
		for(var i=0, x; x=deps[i]; i++) CloneForIn(Deps, root[x]);
		return this;
	 }
	define.wot = ()=>{debugger;};
	define.start = (name, target) => {
		if(target && (name = root[name]) isFun){
			var e;
			Function.call.call(name, {$:{insert:function(x){e=x.pr}}})
			e = New(e);
			e.node = target;
			e._build_=Build.New(e).$;
			for(name in target = e.$Atr) e.at(name,target[name])
			e.INIT.call(e);
		}
		else Err('Wot m8? You have no element called that.');
	 }
	return define;

}}