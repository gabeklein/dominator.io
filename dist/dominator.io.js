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
    function Err(e) {
        throw new Error(e);
    }
    function Warn(e) {
        console.warn(e);
    }
    function CloneForIn(onto, from, shallow) {
        var O = Object;
        for (var key in from)
            if (!shallow || O.hasOwnProperty(from, key))
                O.defineProperty(onto, key, O.getOwnPropertyDescriptor(from, key));
        return onto;
    }
    function isArr(a) {
        return a && Object.prototype.toString.call(a) === '[object Array]' && a || false;
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
                this.node.appendChild(e instanceof window.Element ? e : e.node);
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
                return typeof jQuery == 'function' && nenum(this, '$', jQuery(this.node));
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
    var Build = function () {
            function build(type, instance, doPhase, params) {
                var build = session(instance, type);
                doPhase.apply(instance, [build].concat(params || []));
                build.END();
            }
            return build;
            function parse(id, meta) {
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
            function session(Parent, Type) {
                //INIT
                var Override, Cache, State = {
                        i: -1,
                        node: Parent,
                        type: Type
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
                        reference(name);
                        return Do;
                    },
                    w: function (cond) {
                        spawnOnlyIf(cond);
                        return Do;
                    },
                    call: function (meta) {
                        spawn(meta || {}, arguments);
                        return Do;
                    },
                    END: function () {
                        while (State.i === 0)
                            State.pop();
                        return Cache;
                    }
                });
                return Do;
                function pushContext(i, done) {
                    while (State.i === 0)
                        State.pop();
                    var hold = State;
                    State = {
                        i: i || 0,
                        pop: function () {
                            (State = hold).i--;
                            if (done)
                                done();
                        }
                    };
                    return hold;
                }
                function make(A) {
                    var a = A[0], i = 1, x, meta = {
                            atr: {},
                            css: []
                        };
                    if (typeof a == 'number')
                        return expect(a);
                    if (typeof a == 'string')
                        parse(a, meta);
                    else
                        Err('Anonymous elements require atleast a tagname!');
                    if (typeof (a = A[i]) == 'string') {
                        i++;
                        meta.text = a;
                    }
                    if (typeof (a = A[i]) == 'object') {
                        i++;
                        for (x in a)
                            meta.atrs[x] = a[x];
                    }
                    if (typeof (a = A[i]) == 'number') {
                        i++;
                        meta.expects = a;
                    }
                    if (typeof (a = A[i]) == 'function') {
                        i++;
                        put(meta, 'didInsert', function (args) {
                            build(this, a, args);
                        });
                    }
                    spawn(meta);
                }
                function spawn(type, args) {
                    var parentNode = pushContext(type.expects, type.willClose).node;
                    if (Override && Override())
                        return;
                    var i, x, a, instance = State.node = New(type.temp || Element), element = instance.node = document.createElement(type.tag);
                    if (a = type.wrap)
                        for (i = 0, x; x = a[i++];) {
                        }    /*process wrapper elements*/
                    if (a = type.name)
                        reference(a, instance);
                    if (a = type.text)
                        element.textContent = a;
                    for (x in i = type.atrs)
                        instance.at(x, i[x]);
                    for (i = 0, x = type.css; i < x.length;)
                        instance.cl(x[i++]);
                    parentNode.append(element);
                    if (type.didInsert)
                        type.didInsert(instance, args);
                }
                function spawnOnlyIf(cond, nullifyN) {
                    if (cond)
                        return;
                    pushContext(nullifyN || 1);
                    State.onDone = function () {
                        Override = null;
                    };
                    Override = function () {
                        return true;
                    };
                }
                function reference(name, elem) {
                    var p = Parent, e = elem || State.node, n = name || e.tag;
                    if (p[n])
                        if (isArr(p[n]))
                            p[n].push(e);
                        else
                            p[n] = [
                                p[n],
                                e
                            ];
                    else
                        p[n] = e;
                }
                function expect(n) {
                    if (State.i)
                        Err('Cannot redefine expectation for element\'s inner nodes');
                    State.i = n;
                }
            }    // map(params) => {
                 // // 	var reps;
                 // // 	&() => parse{
                 // // 		var args = cv(pram), nArg=args.length, norm = [], i, j, k, cache, row, lengthwise;
                 // // 		if(isArr(args[0])){
                 // // 			reps = args[0].length;
                 // // 			for(i=0; cache = args[i++];)
                 // // 				if(cache.length == reps) norm.push(cache)
                 // // 				else Err("Inupt arrays must be consistent.");
                 // // 		}
                 // // 		else if((reps = args.shift()) isNum){
                 // // 			if(reps < 0){ reps=-reps; lengthwise = true; }
                 // // 			if(!--nArg) return;
                 // // 			else for(i=0; cache = args[i++];)
                 // // 				if((k=cache.length) == reps) norm.push(cache);
                 // // 				else for(j=0, k=k/reps; j<k; j++)
                 // // 					norm.push(cache.slice(reps*j,reps*j+reps));
                 // // 		}
                 // // 		else Err("Map requires a number or modal array.");
                 // //
                 // // 		pram = [];
                 // //
                 // // 		for(i=0, nArg=norm.length; i<reps; i++){
                 // // 			pram.push(cache = [])
                 // // 			for(j=0; j<nArg;) cache.push(norm[j++][i])
                 // // 		}
                 // // 	}
                 // // 	pushContext(1, %{WillClose(){
                 // // 		Override = null;
                 // // 	}});
                 // // 	Override = function(def){
                 // // 		var l, list = def.nm && (this.parent[def.nm] = []);
                 // // 		if(!def.pr.hasOwnProperty("didInsert")) def.pr.didInsert = this.setText; //UNACCEPTABLE!!!
                 // // 		for(var i=0; i<reps; i++){
                 // // 			l = Build.insert.call(this, {
                 // // 				pr:def.pr,
                 // // 				ag:def.ag.concat(pram[i] || [], i)
                 // // 			})
                 // // 			list && list.push(l);
                 // // 		}
                 // // 		for(i=2; i--;) State.pop();
                 // // 		Override = null;
                 // // 	}
                 // // }
        }();
    var Factory = function (SETTINGS) {
        var DEPS = {}, DEFINED = {};
        function define(path, def) {
            var cd = DEFINED, name = (path = path.split('.')).pop();
            if (!def)
                Err('Bad Arguments: No definition for Element!');
            for (var i = 0, x; x = path[i++];)
                (cd = cd.defs[x]) || Err('Path does not exist already! Define parent elements before their children.');
            if (typeof def == 'function')
                def = { DO: def };
            compile(def, name, cd);
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
            var def = typeof control == 'string' ? DEFINED[control] || Err('Control Element "' + control + '" is not yet imported or registered!') : typeof control == 'function' ? {
                    didInsert: onload(def),
                    defs: New(DEPS)
                } : typeof control == 'object' ? compile(control) : Err('First argument must be a defined element\'s id, element definition, or initializer function!');
            var elem = New(def.template || Element);
            elem.node = target;
            def.didInsert(elem, args);
            if (def.willClose)
                def.willClose.apply(elem);
        };
        return define;
        function compile(def, name, root) {
            var outer = {}, Q = [outer], x, i = 0;
            put(outer, '_into', root || (root = {}));
            outer[name || '_'] = def;
            while (outer = Q[i]) {
                for (x in outer) {
                    var def = outer[x], next = {}, self = outer._into, self = self[x] || (self[x] = {
                            template: New(Element),
                            defs: {},
                            atr: {},
                            css: []
                        });
                    //Build.parse(def.ID, self);
                    for (var x in def) {
                        if (/^[a-z]/.test(x))
                            self.template[x] = def[x];
                        else if (/^_/.test(x))
                            if (typeof def[x] == 'string')
                                self.atr[x.substr(1)] = def[x];
                            else
                                Err('Underscores are for (string-value) attributes!');
                        else if (/^[A-Z][^A-Z]/.test(x))
                            next[x] = def[x];
                    }
                    self.willClose = def.IN, self.didInsert = onload(def.DO, def.ON);
                    if (Object.keys(next).length)
                        Q.push(put(next)('_into', self.defs));
                }
                if (++i > Q.length / 2) {
                    Q = Q.slice(i);
                    i = 0;
                }
            }
            if (!name)
                return root._;
        }
        function onload(Do, On) {
            return function (instance, args) {
                if (On)
                    args = isArr(On.apply(instance, args)) || [];
                if (Do)
                    Build(this, instance, Do, args);
            };
        }
        function spawner(meta) {
            return function () {
                return this.call(meta || {}, cv(arguments));
            };
        }
        ;
    };
    var initialAPI = Factory();
    initialAPI.New = Factory;
    return initialAPI;
}));