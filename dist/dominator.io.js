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
    var Build = function () {
            //EXPORTS
            return {
                New: newSession,
                run: build,
                parse: parse
            };
            function build(instance, doPhase, params) {
                var build = newSession(instance);
                doPhase.apply(instance, [build].concat(params || []));
                build.END();
            }
            function parse(id) {
                var meta = {
                        atr: {},
                        css: []
                    };
                if ((id = id.split('>')).length > 1)
                    return id.map(parse);
                else
                    id = id[0].toLowerCase().replace(/ /g, '').split(/(?=[\[:#&.@^])/);
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
                return meta;
            }
            function newSession(parent) {
                //INIT
                var Override, Last, Cache, Current = {
                        i: -1,
                        node: parent
                    };
                function Do() {
                    define(cv(arguments));
                    return Do;
                }
                ;
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
                    apply: function (def) {
                        spawn({}, def, arguments);
                    },
                    END: function () {
                        while (Current.i === 0)
                            Current.pop();
                        return Cache;
                    }
                });
                return Do;
                function define(A) {
                    if (typeof A[0] == 'number' && A.length == 1)
                        return expect(A[0]);
                    typeof A[0] == 'string' || Err('Anonymous elements require atleast a tagname!');
                    var a, b, i = 1, element = New(Element), meta = parse(A[0]);
                    if (isArr(meta))
                        meta = def(meta.pop(), 'outer', { value: meta });
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
                        meta.nChild = a;
                    }
                    if (typeof (a = A[i]) == 'function') {
                        i++;
                        put(element, 'ElementDidLoad', Factory.quickDef(a));
                    }
                    spawn(meta, element);
                    if (meta.name)
                        addReference(meta.name);
                }
                function spawn(meta, def, args) {
                    var current = pushContext(), i, x;
                    Current.i = meta.nChildren || 0;
                    if (Override && Override())
                        return;
                    var instance = Current.node = New(def);
                    if (meta.outer)
                        for (i = 0, x; x = meta.outer[i++];) {
                        }    //process wrapper elements
                    if (element = meta.tag) {
                        var element = instance.node = document.createElement(element);
                        if (meta.text)
                            element.textContent = meta.text;
                        for (x in i = meta.atrs)
                            instance.at(x, i[x]);
                        for (i = 0, x = meta.css; i < x.length;)
                            element.classList.add(x[i++]);
                        current.node.node.appendChild(element);
                    }
                    instance.ElementDidLoad(args);
                    return instance;
                }
                function spawnOnlyIf(cond, nChildren) {
                    if (!cond) {
                        pushContext({
                            InnerDidLoad: function () {
                                Override = null;
                            }
                        });
                        Current.i = nChildren || 1;
                        Override = function () {
                            pushContext(null);
                            //consider i and a
                            return true;
                        };
                    }
                }
                function addReference(name) {
                    var c = Current, p = parent, n = name || c.tagName, c = c.node;
                    p[n] ? isArr(p[n]) ? p[n].push(c) : p[n] = [
                        p[n],
                        c
                    ] : p[n] = c;
                    return A;
                }
                function expect(x) {
                    if (Current.i)
                        Err('Current element already expects a certain number of children. Overriding that may lead to bugs!');
                    Current.i = x;
                }
                function pushContext(a, i) {
                    while (Current.i === 0)
                        Current.pop();
                    var c = Current;
                    Current = {
                        i: i || 0,
                        node: a,
                        pop: function () {
                            (Current = c).i--;
                            (Last = a) && a.InnerDidLoad();
                        }
                    };
                    return c;
                }
                function map(params) {
                    var reps;
                    (function parse() {
                        var args = cv(pram), nArg = args.length, norm = [], i, j, k, cache, row, lengthwise;
                        if (isArr(args[0])) {
                            reps = args[0].length;
                            for (i = 0; cache = args[i++];)
                                if (cache.length == reps)
                                    norm.push(cache);
                                else
                                    Err('Inupt arrays must be consistent.');
                        } else if (typeof (reps = args.shift()) == 'number') {
                            if (reps < 0) {
                                reps = -reps;
                                lengthwise = true;
                            }
                            if (!--nArg)
                                return;
                            else
                                for (i = 0; cache = args[i++];)
                                    if ((k = cache.length) == reps)
                                        norm.push(cache);
                                    else
                                        for (j = 0, k = k / reps; j < k; j++)
                                            norm.push(cache.slice(reps * j, reps * j + reps));
                        } else
                            Err('Map requires a number or modal array.');
                        pram = [];
                        for (i = 0, nArg = norm.length; i < reps; i++) {
                            pram.push(cache = []);
                            for (j = 0; j < nArg;)
                                cache.push(norm[j++][i]);
                        }
                    }());
                    pushContext({
                        InnerDidLoad: function () {
                            Override = null;
                        }
                    }, 1);
                    Override = function (def) {
                        var l, list = def.nm && (this.parent[def.nm] = []);
                        if (!def.pr.hasOwnProperty('ElementDidLoad'))
                            def.pr.ElementDidLoad = this.setText;
                        //UNACCEPTABLE!!!
                        for (var i = 0; i < reps; i++) {
                            l = Build.insert.call(this, {
                                pr: def.pr,
                                ag: def.ag.concat(pram[i] || [], i)
                            });
                            list && list.push(l);
                        }
                        for (i = 2; i--;)
                            Current.pop();
                        Override = null;
                    };
                }
            }
        }();
    var Factory = function () {
            var isKey = /DO|ON|ID|IN/, isProperty = /^[a-z]/;
            function flatWrap(Do) {
                return function (args) {
                    Build.run(this, Do, args);
                };
            }
            function callable(meta, def) {
                function fac() {
                    this._.spawn(meta, def, cv(arguments));
                    return this;
                }
                put(def, '_factory', fac);
                put(fac, '_template', def);
                Inherit(fac, Deps);
                return fac;
            }
            function wrap(element, meta) {
                put(element, 'ElementDidLoad', function (args) {
                    for (var n = meta.css, i = n.length; i > 0;)
                        this.cl(n[--i]);
                    for (n in meta.atrs)
                        this.at(n, atrs[n]);
                    if (meta.ON)
                        args = isArr(meta.ON.apply(this, args)) || [];
                    if (meta.DO)
                        Build.run(this, meta.DO, args);
                    return meta.name;
                });
                if (meta.IN)
                    put(element, 'InnerDidLoad', meta.IN);
            }
            function compile(def, name, parent) {
                var temp = New(Element), tree = {}, meta = {};
                if (x = nemum(def, 'ID'))
                    meta = Build.parse(x, callName);
                for (var x in def) {
                    if (isProperty.test(y))
                        temp[y] = def[y];
                    else if (isKey.test(y))
                        meta[y] = def[y];
                    else if (/^_/.test(y))
                        (typeof def[x] == 'string' ? meta.atrs : {})[x.substr(1)] = def[x];
                    else
                        tree[y] = def[y];
                }
                if (!temp.tagName)
                    temp.tagName = meta.tag || name;
                put(temp, 'ElementDidLoad', wrap(meta));
                put(tree, '_root', callable(meta, temp));
                return tree;
            }
            function setText($, t) {
                if (typeof t == 'string')
                    $.text = t;
            }
            return {
                quickDef: function (does, name) {
                    var temp = New(Element);
                    put(temp, 'ElementDidLoad', flatWrap(does));
                    temp.tagName = name;
                    return temp;
                },
                compile: function (q) {
                    var i = 0, q = [q], outer;
                    while (outer = q[i]) {
                        for (var x in outer) {
                            var inner = compile(outer[x], x), root = callable({}, inner._root), existing = outer._root[x];
                            inner._root = root && existing ? CloneForIn(root, existing, true) : existing || root || Err('Cannot Define Nothing');
                            q.push(inner);
                        }
                        if (++i > q.length / 2) {
                            q = q.slice(i);
                            i = 0;
                        }
                    }
                }
            };
        }();
    var API = function (opts) {
        var Deps = {}, Defined = {};
        function define(path, def) {
            //broken
            if (!def)
                throw new Error('Bad Arguments: No definition for Element!');
            var cd = Defined, root = {}, name = (path = path.split('.')).pop();
            for (var i = 0, x; x = path[i++];)
                cd = cd[x];
            root[name] = root;
            put(root, '_root', Defined);
            Factory.compile(root);
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
            var def = typeof control == 'string' ? root[control] && New(root[control]._template) || Err('Control Element "' + control + '" is not yet imported or registered!') : typeof control == 'function' ? Factory.quickDef(control, target.tagName) : typeof control == 'object' ? Factory.compile(control) : Err('First argument must be identifier of an installed element, in-line element, or initializer function!');
            def.node = target;
            def.innerDefs = Deps;
            def.ElementDidLoad(args);
        };
        return define;
    };
    var initialAPI = API();
    initialAPI.New = API;
    return initialAPI;
}));