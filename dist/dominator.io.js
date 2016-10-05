(function (root, mod) {
    'use strict';
    if (typeof define === 'function' && define.amd)
        define([], mod);
    else if (typeof module === 'object' && module.exports)
        module.exports = mod();
    else
        root.dom = mod();
}(this, function () {
    var New = Object.create, def = Object.defineProperty, des = Object.getOwnPropertyDescriptor, Inherit = Object.setPrototypeOf || { __proto__: [] } instanceof Array ? function (o, p) {
            o.__proto__ = p;
        } : CloneForIn;
    function isArr(a) {
        return a && Object.prototype.toString.call(a) === '[object Array]' && a;
    }
    function nenum(a, b, c) {
        return def(a, b, c ? { value: c } : { enumerable: false })[b];
    }
    ;
    function cv(a, b, c) {
        return [].slice.call(a, b, c);
    }
    function put(a, b, c) {
        if (typeof b == 'string')
            def(a, b, { value: c });
        else
            for (c in b)
                def(a, c, b[c]);
        return a;
    }
    function Err(e) {
        throw new Error(e);
    }
    function Warn(e) {
        console.warn(e);
    }
    function CloneForIn(to, from, shallow) {
        var O = Object;
        for (var key in from)
            if (!shallow || O.hasOwnProperty(from, key))
                O.defineProperty(to, key, O.getOwnPropertyDescriptor(from, key));
        return to;
    }
    var Element = {
            on: function (arg, one) {
                var t = this, node = t.node;
                if (!t.listeners)
                    t.listeners = {};
                for (var e, i = 0; e = arg[i];)
                    if (typeof e == 'string') {
                        listen(e, arg[i + 1]);
                        i += 2;
                    } else
                        for (var x in e) {
                            listen(x, e[x]);
                            i++;
                        }
                function listen(a, b) {
                    var event = one ? b : function (e) {
                            delete t.listeners[a];
                            b(e);
                            n.removeEventListener(a, event);
                        };
                    t.listeners[a] = event;
                    node.addEventListener(a, event);
                }
            },
            one: function () {
                this.on(true, arguments);
            },
            off: function (a) {
                this.node.removeEventListener(a, this.listeners[a]);
            },
            append: function (e) {
                this.node.appendChild(e instanceof Element ? e.node : e);
            },
            itr: function (n, f) {
                //run function n-times and return mapped enumerable
                //do I need this?
                for (var i = 0, l = []; i < n; i++)
                    l.push(f(i));
                return l;
            },
            up: function (n) {
                //retrieves node n-elements up the hierarchy. Default returns immediate parent.
                for (var y = this, n = n || 1; n--;)
                    y = y.parentNode;
                return y;
            },
            get $() {
                //initialize jQuery on child node and return; remember instance.
                return typeof jQuery == 'function' && def(this, '$', { value: jQuery(this.node) }).$;
            },
            set text(n) {
                //override innerText of child element. Erases all existing child nodes!
                var e = this.node;
                while (e.hasChildNodes())
                    e.removeChild(e.lastChild);
                this.node.appendChild(document.createTextNode(n));
            },
            binds: function (func) {
                //generate anonymous function to call `this[func]` by enclosing `this` element.
                var t = this, a = cv(arguments, 1);
                return function () {
                    t[func].apply(t, a.concat(cv(arguments)));
                };
            },
            at: function (a, b) {
                //apply attribute to child DOM node. Remove if `b` is null. Sets as empty string if `b` is undefined.
                var n = this.node;
                b === null || !b && n.hasAttribute(a) ? n.removeAttribute(a) : n.setAttribute(a, b != true && b || '');
            },
            cl: function (a, b) {
                this.node.classList[b === undefined && 'toggle' || b && 'add' || 'remove'](a);
            }    //get shim working if necessitated
,
            ElementDidLoad: function () {
            }    /*add default behavior*/,
            InnerDidLoad: function () {
            }
        };
    var Type = {
            init: function () {
                for (var n = meta.css, i = n.length; i > 0;)
                    this.cl(n[--i]);
                for (n in meta.atrs)
                    this.at(n, atrs[n]);
                if (meta.ON)
                    args = isArr(meta.ON.apply(this, args)) || [];
                if (meta.DO)
                    Build.run(this, meta.DO, args);
                return meta.name;
            }
        };
    var Build = function () {
            //EXPORTS
            return {
                New: session,
                run: build,
                parse: parse
            };
            function build(instance, doPhase, params) {
                var build = newSession(instance);
                doPhase.apply(instance, [build].concat(params || []));
                build.END();
            }
            function session(Parent) {
                //INIT
                var Override, Cache, State = {
                        i: -1,
                        node: parent
                    };
                function Do() {
                    make(cv(arguments));
                    return Do;
                }
                CloneForIn(Do, {
                    get a() {
                        expect(1);
                        return Do;
                    },
                    m: function () {
                        map(cv(arguments));
                        return Do;
                    },
                    M: function () {
                        this.a;
                        map(cv(arguments));
                        return Do;
                    },
                    i: function (name) {
                        addReference(name);
                        return Do;
                    },
                    w: function (cond) {
                        spawnOnlyIf(cond);
                        return Do;
                    },
                    call: function (def, meta) {
                        spawn(meta || {}, def, arguments);
                        return Do;
                    },
                    END: function () {
                        while (State.i === 0)
                            State.pop();
                        return Cache;
                    }
                });
                return Do;
                function make(A) {
                    if (typeof A[0] == 'number')
                        return expect(A[0]);
                    else
                        typeof A[0] == 'string' || Err('Anonymous elements require atleast a tagname!');
                    var a, b, i = 1, load, meta = Factory.destruct(A[0]);
                    if (typeof (a = A[i]) == 'string') {
                        i++;
                        meta.text = a;
                    }
                    if (typeof (a = A[i]) == 'object') {
                        i++;
                        for (b in a)
                            meta.atrs[b] = a[b];
                    }
                    if (typeof (a = A[i]) == 'number') {
                        i++;
                        meta.expects = a;
                    }
                    if (typeof (a = A[i]) == 'function') {
                        i++;
                        put(element, 'ElementDidLoad', Factory.quickDef(a));
                    }
                    spawn(meta, element);
                }
                function spawn(meta, def, args) {
                    var parent = pushContext(null, meta.expects);
                    if (Override && Override())
                        return;
                    var i, x, a, instance = State.node = typeof def == 'function' ? def(New(Element), 'ElementDidLoad', def) : New(def || Element), element = instance.node = document.createElement(def.tagName);
                    if (a = meta.name)
                        addReference(a, element);
                    if (a = meta.text)
                        element.textContent = a;
                    if (a = meta.wrap)
                        for (i = 0, x; x = a[i++];) {
                        }    //process wrapper elements
                    for (x in i = meta.atrs)
                        instance.at(x, i[x]);
                    for (i = 0, x = meta.css; i < x.length;)
                        element.classList.add(x[i++]);
                    parent.node.append(element);
                    instance.ElementDidLoad(args);
                    return instance;
                }
                function spawnOnlyIf(cond, expects) {
                    if (!cond) {
                        pushContext({
                            InnerDidLoad: function () {
                                Override = null;
                            }
                        }, expects || 1);
                        Override = function () {
                            return true;
                        };
                    }
                }
                function addReference(name, elem) {
                    var p = Parent, e = elem || State.node, n = name || e.tagName;
                    p[n] ? isArr(p[n]) ? p[n].push(e) : p[n] = [
                        p[n],
                        e
                    ] : p[n] = e;
                }
                function expect(x) {
                    if (State.i)
                        Err('State element already expects a certain number of children. Overriding that may lead to bugs!');
                    State.i = x;
                }
                function pushContext(a, i) {
                    while (State.i === 0)
                        State.pop();
                    var hold = State;
                    State = {
                        i: i || 0,
                        node: a,
                        pop: function () {
                            (State = hold).i--;
                            a.InnerDidLoad();
                        }
                    };
                    return c;
                }
            }    // map(params) => {
                 // 	var reps;
                 // 	&() => parse{
                 // 		var args = cv(pram), nArg=args.length, norm = [], i, j, k, cache, row, lengthwise;
                 // 		if(isArr(args[0])){
                 // 			reps = args[0].length;
                 // 			for(i=0; cache = args[i++];)
                 // 				if(cache.length == reps) norm.push(cache)
                 // 				else Err("Inupt arrays must be consistent.");
                 // 		}
                 // 		else if((reps = args.shift()) isNum){
                 // 			if(reps < 0){ reps=-reps; lengthwise = true; }
                 // 			if(!--nArg) return;
                 // 			else for(i=0; cache = args[i++];)
                 // 				if((k=cache.length) == reps) norm.push(cache);
                 // 				else for(j=0, k=k/reps; j<k; j++)
                 // 					norm.push(cache.slice(reps*j,reps*j+reps));
                 // 		}
                 // 		else Err("Map requires a number or modal array.");
                 //
                 // 		pram = [];
                 //
                 // 		for(i=0, nArg=norm.length; i<reps; i++){
                 // 			pram.push(cache = [])
                 // 			for(j=0; j<nArg;) cache.push(norm[j++][i])
                 // 		}
                 // 	}
                 // 	pushContext(%{InnerDidLoad(){
                 // 		Override = null;
                 // 	}}, 1);
                 // 	Override = function(def){
                 // 		var l, list = def.nm && (this.parent[def.nm] = []);
                 // 		if(!def.pr.hasOwnProperty("ElementDidLoad")) def.pr.ElementDidLoad = this.setText; //UNACCEPTABLE!!!
                 // 		for(var i=0; i<reps; i++){
                 // 			l = Build.insert.call(this, {
                 // 				pr:def.pr,
                 // 				ag:def.ag.concat(pram[i] || [], i)
                 // 			})
                 // 			list && list.push(l);
                 // 		}
                 // 		for(i=2; i--;) State.pop();
                 // 		Override = null;
                 // 	}
                 // }
        }();
    var Factory = function () {
            return {
                destruct: destruct,
                parse: parse,
                quickDef: function (does, name) {
                    var temp = New(Element);
                    put(temp, 'ElementDidLoad', flatWrap(does));
                    temp.tagName = name;
                    return temp;
                },
                compile: function (def, name, branch) {
                    var outer = { _root: branch }, i = 0, q = [outer];
                    put(outer, name, def);
                    while (outer = q[i]) {
                        for (var x in outer) {
                            var existing = outer._root[x], inner = destruct(x, outer[x]);
                            inner._self = spawner(inner._self, {});
                            //  = (root && existing)
                            // ? CloneForIn(root, existing, true)
                            // : existing || root || Err("Cannot Define Nothing")
                            q.push(inner);
                        }
                        if (++i > q.length / 2) {
                            q = q.slice(i);
                            i = 0;
                        }
                    }
                    return;
                }
            };
            function flatWrap(Do) {
                return function (args) {
                    Build.run(this, Do, args);
                };
            }
            ;
            function spawner(def, meta) {
                return function () {
                    return this.call(meta || {}, def, cv(arguments));
                };
            }
            ;
            function parse(id, meta) {
                meta.css = [];
                meta.atr = {};
                if (!id)
                    return;
                id = (id = id.split('>')).length > 1 ? put(id.pop(), 'wrap', id) : id[0].toLowerCase().replace(/ /g, '').split(/(?=[\[:#&.@^])/);
                for (var i = id.length, m, n, name; n = id[--i];) {
                    m = n.slice(1);
                    switch (n[0]) {
                    case '.':
                        meta.css.push(m);
                        break;
                    case '#':
                        meta.atr.id = m;
                        break;
                    case '@':
                        m.split(',').map(function (a) {
                            meta.atr[a] = 0;
                        });
                        break;
                    case '[':
                        meta.index = Number.parseInt(m.slice(0, -1));
                        break;
                    case '&':
                        meta.name = m;
                        meta.tag = m;
                        break;
                    case '^':
                        meta.index = true;
                        break;
                    default:
                        meta.tag = n;
                    }
                }
            }
            function onload(Do, On, Cs, At) {
                return function (args) {
                    for (var n = Cs, i = n.length; i > 0;)
                        this.cl(n[--i]);
                    for (n in At)
                        this.at(n, At[n]);
                    if (On)
                        args = isArr(On.apply(this, args)) || [];
                    if (Do)
                        Build.run(this, Do, args);
                    return name;
                };
            }
            function destruct(name, def) {
                var type = {}, temp = type.self = New(Element), defs = type.innerDefs = {};
                parse(def.ID, type);
                for (var x in def) {
                    if (/^[a-z]/.test(x))
                        temp[x] = def[x];
                    else if (/^_/.test(x))
                        (typeof def[x] == 'string' ? type.atrs : {})[x.substr(1)] = def[x];
                    else if (/DO|ON|ID|IN/.test(x));
                    else
                        tree[x] = def[x];
                }
                put(type, {
                    innerDidLoad: def.IN,
                    elementDidLoad: onload(def.DO, def.ON, type.css, type.atrs)
                });
                if (!temp.tagName)
                    temp.tagName = type.tag || name;
                // these should be more consistent
                initialize(temp, type);
                put(defs, '_self', spawner(temp, type));
                return defs;
            }
        }();
    var API = function (opts) {
        var DEPS = {}, DEFINED = {};
        function define(path, def) {
            var cd = Defined, tree = {}, name = (path = path.split('.')).pop();
            if (!def)
                Err('Bad Arguments: No definition for Element!');
            for (var i = 0, x; x = path[i++];)
                (cd = cd[x]) || Err('Path does not exist already! Define parent elements before their children.');
            Factory.compile(def, name, cd);
        }
        define.startOnLoad = function (control, callback) {
            window.onload = function () {
                if (!document || !document.body)
                    Err('`document.body` not found! Is this a browser enviroment?');
                define.start(control, document.body);
                if (typeof callback == 'function')
                    callback();
            };
        };
        define.start = function (control, target, args) {
            if (typeof control == 'string')
                New(DEFINED[control] || Err('Control Element "' + control + '" is not yet imported or registered!'));
            else
                Factory.run(target, DEPS, args);
        }    // var def =
             // 	control isStr ? New( DEFINED[control] || Err('Control Element "' + control + '" is not yet imported or registered!'))
             //   : control isFun ? Factory.quickDef(control, target.tagName)
             //   : control isObj ? Factory.compile(control)
             //   : Err("First argument must be identifier of an installed element, in-line element, or initializer function!")
             // def.node = target;
             // def.innerDefs = DEPS;
             // def.ElementDidLoad(args);
;
        return define;
    };
    var initialAPI = API();
    initialAPI.New = API;
    return initialAPI;
}));