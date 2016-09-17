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
    function isArr(arr) {
        arr && Object.prototype.toString.call(arr) === '[object Array]';
    }
    function nenum(a, b, c) {
        def(a, b, c ? { value: c } : { enumerable: false })[b];
    }
    function cv(a, b, c) {
        [].slice.call(a, b, c);
    }
    function put(a, b, c) {
        if (typeof b == 'string')
            def(a, b, c);
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
        };
    var Commands = {
            i: function (n) {
                this.$.is(n);
                return this;
            },
            o: function (name) {
                this.$.on(name);
                return this;
            },
            w: function (cond) {
                this.$.when(cond);
                return this;
            },
            m: function () {
                this.$.map(arguments);
                return this;
            },
            M: function () {
                this.a.$.map(arguments);
                return this;
            },
            get a() {
                this.$.expect(1);
                return this;
            },
            get END() {
                this.$.Current.done();
                return this.$.cache;
            }
        };
    var Build = {
            New: function (parent, on) {
                function A() {
                    B.interp(cv(arguments), F);
                    return A;
                }
                ;
                var B = A._ = parent.__build__ || New(this, { parent: { value: parent } }), C = B.Current;
                //Delete keys on parent after completion!!
                if (parent._factory)
                    Inherit(A, parent._factory);
                B.Current = {
                    i: -1,
                    node: on || parent,
                    done: typeof C == 'function' ? C : function () {
                        B.Current = C;
                    }
                };
                return A;
            },
            expect: function (x) {
                //just check for hasOwnProperty
                if (this.hasOwnProperty('insert'))
                    return Warn('Cannot explicitly expect children when overrides are in place. Ignoring command.');
                var c = this.Current;
                if (c.i)
                    Warn('Current element already expects a certain number of children. Overriding that may lead to errors!');
                c.i = x;
            },
            insert: function (meta, def, args) {
                var Elem = New(def), Cur = this.next(Elem), Node;
                //if(Node = meta.wrap) this.parse([Node,1]);
                if (meta.outer)
                    for (var i = 0, n; n = meta.outer[i++];)
                        this.insert(Elem, n);
                this.Current.i = meta.nChildren || 0;
                if (Node = Type.tagName) {
                    Node = Elem.node = document.createElement(Node);
                    if (Type.$Text)
                        Node.textContent = Type.$Text;
                    for (x in Node = Type.$Atr)
                        Elem.at(x, Node[x]);
                    if (Node = Type.$Css)
                        for (x = 0; x < Node.length;)
                            Elem.node.classList.add(Node[x++]);
                    Cur.node.append(Elem);
                }
                Elem._nodeIsAppended(def.ag);
                //Node = Type._nodeIsAppended.apply(Elem, [Elem].concat(def.ag))//.init(Elem, def.ag);
                return Elem;
            },
            next: function (a, b) {
                var t = this;
                while (t.Current.i === 0)
                    t.Current.done();
                var c = t.Current;
                t.Current = a == null ? {
                    i: -1,
                    node: c.node,
                    done: function () {
                        t.Current = c;
                        c.i--;
                        t.Last = a;
                    }
                } : {
                    i: 0,
                    node: a,
                    done: function () {
                        t.Current = c;
                        c.i--;
                        typeof b == 'function' && b(c);
                        a.IN && a.IN();
                        t.Last = a;
                    }
                };
                return c;
            },
            is: function (name) {
                var c = this.Current, p = this.parent, n = name || c.tagName, c = c.node;
                p[n] ? isArr(p[n]) ? p[n].push(c) : p[n] = [
                    p[n],
                    c
                ] : p[n] = c;
            },
            setText: function ($, t) {
                if (typeof t == 'string')
                    $.text = t;
            },
            map: function (pram) {
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
                this.next(null);
                this.insert = function (def) {
                    var l, list = def.nm && (this.parent[def.nm] = []);
                    if (!def.pr.hasOwnProperty('_nodeIsAppended'))
                        def.pr._nodeIsAppended = this.setText;
                    for (var i = 0; i < reps; i++) {
                        l = Build.insert.call(this, {
                            pr: def.pr,
                            ag: def.ag.concat(pram[i] || [], i)
                        });
                        list && list.push(l);
                    }
                    for (i = 2; i--;)
                        this.Current.done();
                    delete this.insert;
                };
            },
            parse: function (id) {
                var meta = {
                        atr: {},
                        css: []
                    };
                if ((id = id.split('>')).length > 1)
                    return id.map(this.parse);
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
            },
            wrap_do: function (Do) {
                put($, '_nodeIsAppended', function (args) {
                    var build = Build.New(this);
                    Do.apply(build._.Current.node, [build].concat(args || []));
                    build._.Current.done();
                });
            },
            wrap: function (element, meta) {
                var build;
                put(element, '_nodeIsAppended', function () {
                    var n, i;
                    for (n in meta.atrs)
                        this.at(n, atrs[n]);
                    for (n = meta.css, i = n.length; i > 0;)
                        this.cl(n[--i]);
                    if (meta.ON)
                        if (!isArr(args = meta.ON.apply(this, args)))
                            args = [];
                    if (meta.DO) {
                        build = Build.New(this);
                        meta.DO.apply(build._.Current.node, [build].concat(args));
                        build._.Current.done();
                    }
                    if (meta.IN)
                        meta.IN.apply(this);
                    return meta.name;
                });
                if (meta.IN)
                    noenum(element, 'innerIsAppended', meta.IN);
            },
            interp: function (A, parentFactory) {
                if (typeof A[0] == 'number' && A.length == 1)
                    return this.expect(A[0]);
                if (typeof A[0] != 'string')
                    Err('Anonymous elements require atleast a tagname!');
                var $ = New(Element), meta = this.parse(A[0]), i = 1, a, b;
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
                    put($, '_nodeIsAppended', wrap_do(a));
                }
                if (parentFactory)
                    put($, '_factory', parentFactory);
                this.insert($, meta);
                if (meta.name)
                    this.is(meta.name);
            }
        };
    var Factory = function (opts) {
        var Deps = New(Commands), Defined = {}, isKey = /DO|ON|ID|IN/, isProperty = /^[a-z]/;
        function register(path, def) {
            if (!def)
                throw new Error('Bad Arguments: No definition for Element!');
            var cd = Defined, root = {}, name = (path = path.split('.')).pop();
            for (var i = 0, x; x = path[i++];)
                cd = cd[x];
            root[name] = root;
            put(root, '_root', Defined);
            stack(root);
        }
        function stack(q) {
            var i = 0, q = [q], outer;
            while (outer = q[i]) {
                for (var x in outer) {
                    var inner = destruct(outer[x], x), root = factory(inner._root), existing = outer._root[x];
                    inner._root = root && existing ? CloneForIn(root, existing, true) : existing || root || Err('Cannot Define Nothing');
                    q.push(inner);
                }
                if (++i > q.length / 2) {
                    q = q.slice(i);
                    i = 0;
                }
            }
        }
        function define(def, name) {
            var temp = New(Element);
            Build.wrap_do(temp, def);
            put(temp, '_nodeIsAppended', Build.wrap_do(def));
            temp.tagName = name;
            return temp;
        }
        function destruct(def, name, parent) {
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
            put(temp, '_nodeIsAppended', Build.wrap(meta));
            put(tree, '_root', factory(temp));
            return tree;
        }
        function factory(def) {
            function fac() {
                this._.insert(def, cv(arguments));
                return this;
            }
            put(def, '_factory', fac);
            put(fac, '_template', def);
            Inherit(fac, Deps);
            return fac;
        }
        register.startOnLoad = function (control, callback) {
            window.onload = function () {
                if (!document || !document.body)
                    Err('`document.body` not found! Is this a browser enviroment?');
                register.start(control, document.body);
                if (typeof callback == 'function')
                    callback();
            };
        };
        register.start = function (control, target) {
            var def = typeof control == 'string' ? root[control] && root[control]._template || Err('Control Element "' + control + '" is not yet imported or registered!') : typeof control == 'function' ? define(control, target.tagName) : typeof control == 'object' ? link(control) : Err('First argument must be identifier of an installed element, in-line element, or initializer function!');
            def.node = target;
            def._factory = Deps;
            def._nodeIsAppended();
        };
        return register;
    };
    var MainFactory = Factory();
    MainFactory.New = Factory;
    return MainFactory;
}));
//# sourceMappingURL=main.js.map