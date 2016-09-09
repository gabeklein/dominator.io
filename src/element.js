var Element = %{
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
};
