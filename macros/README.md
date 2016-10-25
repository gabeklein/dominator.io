

Macro Reference and Build Process
------------

This library uses Sweet.js macros in a build step after source files are concatenated using `@import` directives with `grunt-import-js`.
For versions and dependancies,  refer to `package.json` for specifics.

`macros.sjs` contains a number of expansions which mimic desired features from a certain ES supersets.

`parser.sjs` is a **work-in-progress** for use in defining elements and DOM builds, akin to `.jsx` files in [ReactJS](https://github.com/facebook/react).

Building
--------

```bash
npm install
grunt
```

## Macros Defined ##

**Clean Object Definition**
Has no class-like features, WYSIWYG. Wrapped by `%{}` as opposed to `{}`
Note: This is a super-set of a regular object literal; you can intermingle regular property syntax.
```javascript
%{
//functions
	return_expr(x, y) => x + y
	single_expr(a) doWhatever("hello" + a)
	method(arg){
		//body
	}

//properties
	prop_lit:  "Hello World!"
	prop_expr: "Hello" + "World!"
	prop_exp2: greet("world")

//getters (btw! empty parens are optional)
	get return_expr() => "Foo"
	get complicated(){         
		return "Bar"
	}

//setters
	set single_expr(a) this.propGotSet(a)
	set complicated(a){
		//do whatever with a
	}

//nested objects
	array[item1, item2, itemN]
	nested_COD{
		//same syntax as before
	}

//also works
	object_literal: {
		foo: "bar",
		hello: "world"
	}
	array_literal: [1, 2, 3]

}
```

## ...to be continued

## Questions or Contributing
Contact me; new at this. My contact info is listed on my profile.
