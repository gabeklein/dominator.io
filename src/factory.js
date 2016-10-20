function(SETTINGS){

	var DEPS = {},
		DEFINED = {};

	define(path, def) => {
		var cd=DEFINED,
			name=(path=path.split('.')).pop();
		if(!def) Err("Bad Arguments: No definition for Element!")
		for(var i=0, x; x=path[i++];) (cd=cd.defs[x]) || Err("Path does not exist already! Define parent elements before their children.");
		if(def isFun) def = { DO: def }
		compile(def, name, cd)
	}
	define.startOnLoad = (control, callback) => {
		window.onload = () => {
			if(!document || !document.body) Err("`document.body` not found! Is this a browser enviroment?")
			define.start(control, document.body);
			if(callback isFun) callback();
		}
	}
	define.start = (control, target, args) => {
		var def =
			control isStr ? DEFINED[control] || Err('Control Element "' + control + '" is not yet imported or registered!')
		  : control isFun ? %{
			  didInsert: onload(def)
			  defs: New(DEPS)
		  }
		  : control isObj ? compile(control)
		  : Err("First argument must be a defined element's id, element definition, or initializer function!")

		var elem = New(def.template || Element);
			elem.node = target;

		def.didInsert(elem, args);
		if(def.willClose) def.willClose.apply(elem)
	}

	return define;

	compile(def, name, root) => {
		var outer = {},
			Q = [outer],
			x, i = 0;

		outer >> put("_into", (root || (root = {})));
		outer[name || "_"] = def;

		while(outer = Q[i]){
			for(x in outer){
				var def = outer[x], next = {},
					self = outer._into,
					self = self[x] || (self[x] = {
						template: New(Element),
						defs: {}, atr: {}, css: []
					})

				//Build.parse(def.ID, self);
				for(var x in def){
					if (/^[a-z]/.test(x)) self.template[x]=def[x];
					else if(/^_/.test(x))
						if(def[x] isStr) self.atr[x.substr(1)] = def[x];
						else Err("Underscores are for (string-value) attributes!")
					else if(/^[A-Z][^A-Z]/.test(x)) next[x]=def[x];
				}

				self.willClose = def.IN,
				self.didInsert = onload(def.DO, def.ON)

				if(Object.keys(next).length)
					next >> put("_into", self.defs) >> Q.push;
			}
			if (++i > Q.length / 2){ Q = Q.slice(i); i = 0; }
		}

		if(!name) return root._
	}

	onload(Do, On) => (instance, args) => {
		if(On) args = On.apply(instance, args) >> isArr || [];
		if(Do) Build(this, instance, Do, args)
	}

	spawner(meta) => () => this.call(meta || {}, __args);

}
