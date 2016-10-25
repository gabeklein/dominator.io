Factory(SETTINGS) => {

	var DEPS = {},
		DEFINED = {};

	compile(def, name, root) => {
		var outer = {},
			Q = [outer],
			x, i = 0;

		outer >> put("_into", root || (root = {}));
		outer[name || "_"] = def;

		while(outer = Q[i]){
			for(x in outer){
				var def = outer[x], next = {},
					self = outer._into[x] || ( outer._into[x] = new Type() )

				self.tag = name.toLowerCase();
				for(var x in def)
					if(/^[a-z]/.test(x)) self.element[x] = def[x];
					else if(/^[A-Z][^A-Z]/.test(x)) next[x] = def[x];
					else if(/DO|ON|IN/.test(x)) self[x] = def[x];
					else if(/^_/.test(x))
						if(def[x] isStr) self.atr[x.substr(1)] = def[x];
						else Err("Underscores are for (string-value) attributes!")

				if(Object.keys(next).length)
					next >> put("_into", self.defs) >> Q.push;
			}
			if (++i > Q.length / 2){ Q = Q.slice(i); i = 0; }
		};

		if(!name) return root._
	};

	define(path, def) => {

		if(!path) Err("Name required for definiton")
		if(!def) Err("No definition found for element: " + path)

		var cd=DEFINED,
			name=(path=path.split('.')).pop();

		for(var i=0, x; x=path[i++];) (cd=cd.defs[x]) || Err("Path does not exist already! Define parent elements before their children.");

		(def isFun
			? {DO: def}
			: def
		) >> compile(name, cd)

	} >> put(%{

		startOnLoad(control, callback){
			var start = this.start;
			window.onload = () => {
				if(!document || !document.body) Err("`document.body` not found! Is this a browser enviroment?")
				start(control, document.body);
				if(callback isFun) callback();
			}
		}

		start(control, target, args){
			var def =
				control isStr ? DEFINED[control] || Err('Control Element "' + control + '" is not yet imported or registered!')
			  : control isFun ? new Type() >> put("DO", control)
			  : control isObj ? compile(control)
			  : Err("First argument must be a defined element's id, element definition, or initializer function!")

			var elem = New(def.element);
				elem.node = target;

			def.didInsert(elem, args);
		}

	}) >> return;

}
