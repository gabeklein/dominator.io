function(opts){

	var DEPS = {},
		DEFINED = {};

	define(path, def) => {
		var cd=Defined, tree = {},
			name=(path=path.split('.')).pop();
		if(!def) Err("Bad Arguments: No definition for Element!")
		for(var i=0, x; x=path[i++];) (cd=cd[x]) || Err("Path does not exist already! Define parent elements before their children.");
		Factory.compile(def, name, cd)
	}
	define.startOnLoad = (control, callback) => {
		window.onload = () => {
			if(!document || !document.body) Err("`document.body` not found! Is this a browser enviroment?")
			define.start(control, document.body);
			if(callback isFun) callback();
		}
	}
	define.start = (control, target, args) => {
		if(control isStr) New( DEFINED[control] || Err('Control Element "' + control + '" is not yet imported or registered!'))
		else Factory.run(target, DEPS, args)



		// var def =
		// 	control isStr ? New( DEFINED[control] || Err('Control Element "' + control + '" is not yet imported or registered!'))
		//   : control isFun ? Factory.quickDef(control, target.tagName)
		//   : control isObj ? Factory.compile(control)
		//   : Err("First argument must be identifier of an installed element, in-line element, or initializer function!")
		// def.node = target;
		// def.innerDefs = DEPS;
		// def.ElementDidLoad(args);
	}
	return define;
}
