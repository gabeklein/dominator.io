(function (root, mod) {
    'use strict';
    if (typeof define === 'function' && define.amd)
        define([], mod);
    else if (typeof module === 'object' && module.exports)
        module.exports = mod();
    else
        root.dom = mod();
}(this, function () {
    function isArr(arr) {
        arr && Object.prototype.toString.call(arr) === '[object Array]';
    }
    function noenum(a, b) {
        a && def(a, b, { enumerable: false })[b];
    }
    function cv(a, b, c) {
        [].slice.call(a, b, c);
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
    var New = Object.create, def = Object.defineProperty, des = Object.getOwnPropertyDescriptor, Inherit = Object.setPrototypeOf || { __proto__: [] } instanceof Array ? function (o, p) {
            o.__proto__ = p;
        } : CloneForIn;
    var Element = {
            get DO() {
                var N = Build.New(this);
                return function (f) {
                    if (typeof f == 'function') {
                        var n = f.apply(N.$.Current.node, [N].concat(cv(arguments, 1)));
                        if (n === N)
                            N.$.Current.done();
                    } else if (f)
                        N.parse(cv(arguments));
                    return N;
                };
            },
            use: function (name, i) {
                if (typeof name == 'number')
                    i = name;
                name = 'V';
                if (typeof (i = this[name = name + i]) == 'function')
                    this.DO(i);
            },
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
            append: function (New) {
                //append naked DOM node into child node
                (New.parentNode = this).node.appendChild(New.node);
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
            INIT: function () {
            }
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
    var Build = window.lol = {
            New: function (parent, on) {
                function A() {
                    B.interp(cv(arguments), F);
                    return A;
                }
                ;
                var B = A.$ = parent.__build__ || New(this, { parent: { value: parent } }), C = B.Current, F = parent.__factory__;
                //Delete these keys after completion!!
                if (F)
                    Inherit(A, F);
                A.interp = function (a) {
                    B.interp(a, F);
                };
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
            insert: function (def, meta) {
                var Type = def.pr, Elem = New(Type), Cur = this.next(Elem), Node;
                if (Node = meta.wrap)
                    this.parse([
                        Node,
                        1
                    ]);
                this.Current.i = meta.nChildren || 0;
                if (def.nm)
                    this.is(def.nm);
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
                Elem.INIT(def.ag);
                //Node = Type.INIT.apply(Elem, [Elem].concat(def.ag))//.init(Elem, def.ag);
                return Elem;
            },
            next: function (a, b) {
                var t = this, c;
                while (t.Current.i === 0)
                    t.Current.done();
                c = t.Current;
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
            when: function (x) {
                if (!x)
                    this.insert = function (def) {
                        if (def.i || !def)
                            Err('Nesting is not supported for conditional elements!');
                        this.next(null);
                        delete this.insert;
                    };
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
                    if (!def.pr.hasOwnProperty('INIT'))
                        def.pr.INIT = this.setText;
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
                    id = id[0].toLowerCase().replace(/ /g, '').split(/(?=[\[:#&.@~^])/);
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
                    default:
                        meta.tag = n;
                    }
                }
                return meta;
            },
            setup: function (self, meta) {
                if (Object.meta(meta) == 0)
                    return 0;
                def(self, 'INIT', {
                    value: function (args) {
                        var n, i, o;
                        for (n in meta.atrs)
                            this.at(n, atrs[n]);
                        for (n = meta.css, i = n.length; i > 0;)
                            this.cl(n[--i]);
                        if (meta.ON)
                            var args = meta.ON.apply(this, arguments) || null;
                        if (meta.DO) {
                            var build = Build.New(this);
                            meta.DO.apply(build.$.Current.node, [build].concat[args || []]);
                            build.$.Current.done();
                        }
                        if (meta.IN)
                            meta.IN.apply(this);
                    }
                });
            },
            interp: function (A, parentFactory) {
                if (typeof A[0] == 'number' && A.length == 1)
                    return this.expect(A[0]);
                if (typeof A[0] != 'string')
                    Err('Anonymous elements require atleast a tagname!');
                var $ = New(Element), nChildren, meta = this.parse(A[0]);
                var i = 1, a, b;
                if (typeof (a = A[i]) == 'string') {
                    i++;
                    $.$Text = a;
                }
                if (typeof (a = A[i]) == 'object') {
                    i++;
                    for (b in a)
                        keys.atrs[b] = a[b];
                }
                if (typeof (a = A[i]) == 'number') {
                    i++;
                    meta.nChild = a;
                }
                // if( (a=A[i]) isFun ){i++; $.INIT=a} //CHANGE TO DO
                if (parentFactory)
                    $.__factory__ = parentFactory;
                this.insert({
                    pr: $,
                    ag: A.slice(i)
                });
                this.is(meta.name);
            }
        };
    var Factory = function (opts) {
        var Deps = New(Commands), root = {};
        isKey = /DO|ON|ID|IN/, isProperty = /^[a-z]/;
        function define(path, def) {
            if (!def)
                throw new Error('No definition; we need a definition!');
            var cd = root, name = (path = path.split('.')).pop();
            for (var i = 0, x; x = path[i++];)
                cd = cd[x];
            link(def, cd, name);
        }
        function link(def, dir, name) {
            var tree = interpret(def, callName), self = tree.root;
            if (!dir && (self || Err('Cannot register an element with no properties!')));
            else {
                var existing = dir[name];
                self = existing && self ? CloneForIn(self, existing, true) : existing || self || Err('Cannot insert nothing.');
            }
            for (x in membs)
                link(membs[x], a, x);
            return a;
        }
        function interpret(def, callName) {
            var temp = New(Element), tree = {}, meta = {};
            if (typeof def == 'function') {
                meta.DO = def;
                meta.name = callName;
            } else {
                if (x = noemum(def, 'ID'))
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
            }
            //non-enumerably add _root and return members
            return def(tree, 'root', { value: Build.setup(root, meta) });
        }
        function factory(f, name) {
            name = name || undefined;
            function Insert() {
                this.$.insert({
                    pr: f,
                    ag: cv(arguments),
                    nm: name
                });
                return this;
            }
            def(f, '__factory__', { value: Insert });
            Inherit(Insert, Deps);
            return Insert;
        }
        define.startOnLoad = function (control, callback) {
            window.onload = function () {
                if (!document || !document.body)
                    Err('`document.body` not found! Is this a browser enviroment?');
                define.start(control, document.body);
                callback();
            };
        };
        define.start = function (control, target) {
            var def;
            if (typeof control == 'string') {
                if (typeof root[control] == 'function')
                    ({
                        _: root[control],
                        $: {
                            insert: function (x) {
                                def = New(x.pr);
                            }
                        }
                    }._());
                else
                    Err('Control Element "' + control + '" is not yet imported or defined!');
            } else
                def = typeof control == 'function' ? New(Element, { INIT: { value: control } }) : typeof control == 'object' ? link(control) : Err('First argument must be identifier of an installed element, in-line element, or initializer function!');
            def.node = target;
            def.__factory__ = Deps;
            def.INIT();
        };
        return define;
    };
    var MainFactory = Factory();
    MainFactory.New = Factory;
    return MainFactory;
}));