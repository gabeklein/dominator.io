'use strict';
function cv(a, b, c) {
    return [].slice.call(a, b, c);
}
;
(function () {
    var O = Object, New = O.create, def = O.defineProperty, des = O.getOwnPropertyDescriptor, isArr = function (arr) {
            return O.prototype.toString.call(arr) === '[object Array]';
        }, CloneForIn = function (to, from, shallow) {
            for (var key in from)
                if (!shallow || O.hasOwnProperty(from, key))
                    O.defineProperty(to, key, O.getOwnPropertyDescriptor(from, key));
            return to;
        }, Inherit = O.setPrototypeOf || { __proto__: [] } instanceof Array ? function (o, p) {
            o.__proto__ = p;
        } : CloneForIn, Element = {
            get DO() {
                function LINK() {
                    C.Unwrap(cv(arguments));
                    return LINK;
                }
                ;
                var C = LINK.$ = New(Generator), N = C.root = C.current = New(Generator.Node);
                C.parent = this;
                N.i = -1;
                N.tp = 'top';
                Inherit(LINK, this.__factory__);
                def(LINK, 'END', {
                    get: function () {
                        C.BuildAndAppend();
                        return 'lol done.';
                    }
                });
                return LINK;
            },
            insert: function (New$2, insertBefore) {
                (New$2.parentNode = this).node.appendChild(New$2.node);
            },
            append: function (New$2) {
                (New$2.parentNode = this).node.appendChild(New$2.node);
            },
            set text(n) {
                this.node.appendChild(document.createTextNode(n));
            },
            binds: function (func) {
                var t = this, a = cv(arguments, 1);
                return function () {
                    t[func].apply(t, a.concat(cv(arguments)));
                };
            },
            at: function (a, b) {
                b === null || this.node.hasAttribute(a) ? this.node.removeAttribute(a) : this.node.setAttribute(a, b || '');
            },
            on: function (a) {
                var t = this, x;
                for (var x in a)
                    c(x, a[x]);
                return a;
                function c(a$2, b) {
                    t.node.addEventListener(a$2, b);
                }
                ;
            },
            innerIsInit: function () {
            }
        }, Generator = {
            Node: {
                top: function (p) {
                    return p;
                },
                std: function (parent) {
                    var Type = this.pr, Elem = New(Type), Node = Type.tagName, x, y;
                    if (Node) {
                        Node = Elem.node = document.createElement(Node);
                        if (Type.$Text)
                            Node.textContent = Type.$Text;
                        for (var x in Node = Type.$Atr)
                            Elem.at(x, Node[x]);
                        if (Node = Type.$Css)
                            for (x = 0; x < Node.length;)
                                Elem.node.classList.add(Node[x++]);
                        parent.insert(Elem);
                    }
                    Node = Type.nodeIsInit.apply(Elem, [Elem].concat(this.ag));
                    if (typeof (Node && Node.END) == 'function')
                        Node.END();
                    return Elem;
                },
                skp: function (p) {
                    if (this.ts) {
                        p = New(p);
                        p.innerIsInit = function () {
                        };
                        return p;
                    } else
                        return this.ch = null;
                },
                map: function (parent, before) {
                    var i = this, ts = i.ts, ag = i.ag, ch = i.ch, j, k, list = [];
                    if (!ch[0].tp == 'std')
                        throw new Error('iterable element can\'t be special');
                    if (!ag)
                        for (i = 1; i < ts; i++)
                            ch[i] = ch[0];
                    else {
                        ch = ch[0];
                        j = ch.ag.length;
                        this.ch = null;
                        for (i = 0, k = ag[0].length + 1; i < ts; i++) {
                            [].splice.apply(ch.ag, [
                                j,
                                k
                            ].concat(ag[i]).concat(i));
                            list.push(ch.std(parent, before));
                        }
                    }
                    return parent;
                },
                dfr: function () {
                },
                set i(n) {
                    if (n && !this._i) {
                        this.ch = [];
                        this._i = n;
                    }
                },
                _i: 0,
                tp: 'std',
                build: function ($r, node, next, par) {
                    var t = this, Node = t[t.tp].call(t, node), ch = t.ch, i, y;
                    if (Node && (i = t.nm)) {
                        if (y = par[i]) {
                            if (y instanceof Array)
                                y.push(Node);
                            else
                                par[i] = [
                                    y,
                                    Node
                                ];
                        } else
                            par[i] = Node;
                    }
                    if (ch) {
                        $r(ch[i = 0], Node, function ($r$2) {
                            if (ch[++i])
                                $r$2(ch[i], Node);
                            else {
                                Node.innerIsInit();
                                next($r$2);
                            }
                        });
                    } else {
                        if (Node && Node.innerIsInit)
                            Node.innerIsInit();
                        next($r);
                    }
                }
            },
            Unwrap: function (args) {
                if (typeof //MIGHT NEED TO INCLUDE IN INITIALIZER; USES NAKED ELEM!
                    args[0] == 'number')
                    return this.current.i = args[0];
                var $ = New(Element), w = 1, y, i, n, m, name, itr, out = { pr: $ };
                $.$Atr = {};
                y = args[0].toLowerCase().split(/(?=[:#\.])/);
                for (i = 0; n = y[i++];) {
                    m = n.slice(1);
                    if (n[0] == '#')
                        $.$Atr.id = m;
                    else if (n[0] == '.') {
                        ($.$Css || ($.$Css = [])).push(m);
                    } else if (n[0] == ':') {
                        name = m;
                        $.tagName = $.tagName || m;
                    } else
                        $.tagName = n;
                }
                if (typeof (y = args[w]) == 'string') {
                    $.$Text = y;
                    w++;
                }
                if (typeof (y = args[w]) == 'object') {
                    for (i in y)
                        $.$Atr[i] = y[i];
                    w++;
                }
                if (typeof (y = args[w]) == 'number') {
                    itr = y;
                    w++;
                }
                if (typeof (y = args[w]) == 'function') {
                    $.nodeIsInit = y;
                    w++;
                } else
                    $.nodeIsInit = function () {
                    };
                out.ag = this.I({
                    pr: $,
                    ag: args.slice(w),
                    nm: name,
                    i: itr
                });
            },
            I: function (o) {
                var //Insert
                    n = New(this.Node), C = this.current;
                while (!C._i)
                    C = C.up;
                C._i--;
                C.ch.push(n);
                n.up = C;
                for (var x in o)
                    n[x] = o[x];
                return this.current = n;
            },
            BuildAndAppend: function () {
                var Node = this.parent, Par = Node, Cur = this.root;
                function Call(n) {
                    n();
                }
                while (Cur)
                    Cur.build(function (X, N, C) {
                        Cur = X;
                        if (N)
                            Node = N;
                        if (C)
                            Call = C;
                    }, Node, Call, Par);
            }
        }, Commands = {
            a: function (n) {
                this.$.current.i = n;
            },
            b: function (n) {
            },
            //break in data to static generator
            i: function (n) {
                this.$.current.nm = n;
            },
            o: function (n, c) {
                this.$.I({
                    tp: 'dfr',
                    as: n,
                    ib: null,
                    i: c || 1
                });
            },
            //set ib at build time
            w: function (t, c) {
                this.$.I({
                    tp: 'skp',
                    ts: t,
                    i: c || 1
                });
            },
            m: function () {
                var g = arguments.length, t = arguments[0], x = null, y, k, l, i = 1, v, w;
                if (t && t.forEach) {
                    for (l = t.length; i < g; i++)
                        if (!arguments.length == l)
                            throw new Error('Input arrays not consistent');
                    x = cv(arguments);
                } else if (typeof t == 'number') {
                    if (g > 1)
                        for (x = []; i < g; i++) {
                            y = arguments[i];
                            if (y.forEach && y.length % t == 0) {
                                l = Math.abs(y.length / t);
                                k = 0;
                                if (t > 0)
                                    for (; k < t; k++)
                                        x.push(y.slice(k * l, k * l + l));
                                else
                                    for (t *= -1; k < t; k++) {
                                        x.push(w = []);
                                        for (v = 0; v < l; v++)
                                            w.push(y[k + t * v]);
                                    }
                            } else if (typeof y == 'function')
                                x.push(y);
                            else
                                throw new Error('Input must be function or Array divisible by ' + t + ' as indicated');
                        }
                } else
                    throw new Error('Map requires number or arrays');
                this.$.I({
                    tp: 'map',
                    ts: t,
                    ag: x,
                    i: 1
                });
            }
        };
    window.dominator = function (opts) {
        var Elem = New(Element), root = window.rootThing = {}, Deps = New(Commands), doNothing = function () {
            };
        function compile(f) {
            function Insert() {
                this.$.I({
                    pr: f,
                    ag: cv(arguments)
                });
                return this;
            }
            def(f, '__factory__', { value: Insert });
            Inherit(Insert, Deps);
            return Insert;
        }
        function parse(f) {
            var template = New(Elem), proto;
            template.nodeIsInit = typeof (f && f) == 'function' ? f : f[0] || function () {
            };
            if (typeof proto == 'function')
                proto.call(template);
            else
                (function () {
                    for (var x in proto)
                        if (x[0] == '_')
                            (template.$Atr || (temp.$Atr = {}))[x.substr(1)] = proto[x];
                        else
                            def(template, x, des(proto, x));
                }());
            return template;
        }
        function throwNoFactory() {
            throw new Error('Element Class exists but has no constructor! Probably it is a namespace.');
        }
        function link(f, C, X) {
            var x = f._ && compile(parse(def(f, '_', { enumerable: false })._));
            C[X] = C[X] ? x && CloneForIn(x, C[X], true) || C[X] : x || throwNoFactory;
            for (x in f)
                link(isArr(f[x]) || typeof f[x] == 'function' ? { _: f[x] } : f[x], C[X], x);
        }
        function define(n, factory) {
            for (var i = 0, x, C = root, y = (n = n.split('.')).pop(); x = n[i++];)
                C = C[x] || (C[x] = throwNoFactory);
            link(typeof factory == 'function' || !factory ? { _: cv(arguments, 1) } : factory, C, y);
        }
        define.start = function (name, deps, target) {
            if (typeof (target && (name = root[name])) == 'function') {
                var e;
                Function.call.call(name, {
                    $: {
                        I: function (x) {
                            e = x.pr;
                        }
                    }
                });
                e = New(e);
                e.node = target;
                e.nodeIsInit(e);
            } else
                throw new Error('Wot m8? You have no element called that.');
        };
        return define;
    };
}());