'use strict';
function cv(a, b, c) {
    return [].slice.call(a, b, c);
}
;
var Err = function () {
    function Err$2(e) {
        return function err$2() {
            if (typeof !e == 'string' && isArr(e))
                for (var E = '', i = 0, a = cv(arguments); i < e.length - 1; i++)
                    E += e[i] + (a[i] || '');
            else
                E = e;
            throw new Error(E);
        };
    }
    var errors = {}, x, err = {
            register: function (def) {
                for (x in def)
                    this[x] = Err$2(def[x]);
            }
        };
    return err;
}();
(function () {
    Err.register({
        unevn: [
            'Input must be function or Array divisible by ',
            ' as indicated'
        ],
        nonum: 'Map requires number or arrays',
        incon: 'Input arrays not consistent',
        ninit: 'Element Class exists but has no constructor! Probably it is a namespace.',
        nelem: 'Error starting on element that does not exist!'
    });
    debugger;
    var O = Object, New = O.create, def = O.defineProperty, des = O.getOwnPropertyDescriptor, isArr$2 = function (arr) {
            return O.prototype.toString.call(arr) === '[object Array]';
        }, CloneForIn = function (to, from, shallow) {
            for (var key in from)
                if (!shallow || O.hasOwnProperty(from, key))
                    O.defineProperty(to, key, O.getOwnPropertyDescriptor(from, key));
            return to;
        }, nEnum = function (a, b) {
            return a && def(a, b, { enumerable: false })[b];
        }, Inherit = O.setPrototypeOf || { __proto__: [] } instanceof Array ? function (o, p) {
            o.__proto__ = p;
        } : CloneForIn, Element = {
            get DO() {
                var C = LINK.$ = Factory.New(this);
                Inherit(LINK, this.__factory__);
                function LINK() {
                    C.parse(cv(arguments));
                    return LINK;
                }
                ;
                def(LINK, 'END', {
                    get: function () {
                        C.current.done();
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
            },
            nodeIsInit: function () {
            },
            set init(a) {
                this.nodeIsInit = a;
            },
            get init() {
                return function () {
                    (this.nodeIsInit.apply(this, arguments) || {}).END;
                };
            }
        }, Factory = {
            New: function (on) {
                var n = New(this);
                n.parent = on;
                n.current = {
                    i: -1,
                    node: on,
                    done: function () {
                        console.log('woo done!');
                    }
                };
                return n;
            },
            insert: function (def$2) {
                var t = this, c = t.current;
                if (!t.alt) {
                    var Type = def$2.pr, Elem = New(Type), Node = Type.tagName;
                    if (Node) {
                        Node = Elem.node = document.createElement(Node);
                        if (Type.$Text)
                            Node.textContent = Type.$Text;
                        for (var x in Node = Type.$Atr)
                            Elem.at(x, Node[x]);
                        if (Node = Type.$Css)
                            for (x = 0; x < Node.length;)
                                Elem.node.classList.add(Node[x++]);
                        t.current.node.insert(Elem);
                    }
                    Node = Type.init.apply(Elem, [Elem].concat(def$2.ag));
                    if (def$2.nm)
                        this.parent[def$2.nm] = Elem;
                    t.last = Elem;
                } else {
                }
                if (def$2.i)
                    t.push(def$2.i);
                else
                    t.next;
            },
            push: function (i) {
                var t = this, c = t.current;
                t.current = {
                    i: i,
                    node: t.last,
                    done: function () {
                        t.last.innerIsInit();
                        t.current = c;
                        t.next;
                    }
                };
            },
            get next() {
                this.current.i--;
                while (this.current.i == 0)
                    this.current.done();
            },
            and: function (n) {
            },
            map: function () {
                if (!t.alt) {
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
                } else {
                }
            },
            is: function (n) {
            },
            on: function (n) {
            },
            when: function (n) {
            },
            parseID: function (id, $) {
                id = id.toLowerCase().replace(' ', '').split(/(?=[:#\.@])/);
                $.$Atr = {};
                for (var i = 0, m, n, name; n = id[i++];) {
                    m = n.slice(1);
                    switch (n[0]) {
                    case '@':
                        $.$Atr[m] = 0;
                        break;
                    case '#':
                        $.$Atr.id = m;
                        break;
                    case '.':
                        ($.$Css || ($.$Css = [])).push(m);
                        break;
                    case ':':
                        name = m;
                        $.tagName = $.tagName || m;
                        break;
                    default:
                        $.tagName = n;
                    }
                }
                return name;
            },
            parse: function (args) {
                if (typeof args[0] == 'number')
                    return this.current.i = args[0];
                var $ = New(Element), w = 1, y, i, n, m, name, nCh;
                name = Factory.parseID(args[0], $);
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
                    nCh = y;
                    w++;
                }
                if (typeof (y = args[w]) == 'function') {
                    $.nodeIsInit = y;
                    w++;
                }
                this.insert({
                    pr: $,
                    ag: args.slice(w),
                    nm: name,
                    i: nCh
                });
            }
        }, Commands = {
            i: function (n) {
                this.$.is(n);
            },
            o: function (name) {
                this.$.on(name);
            },
            w: function (cond) {
                this.$.when(cond);
            },
            m: function () {
                this.$.make.apply(this, arguments);
            },
            get a() {
                this.$.push();
                return this;
            },
            get _() {
                var c = this.$.current;
                if (c.i < 0)
                    this.$.current.done();
            }
        };
    window.dominator = function (opts) {
        var root = {}, Deps = New(Commands), doNothing = function () {
            };
        function compile(f) {
            function Insert() {
                this.$.insert({
                    pr: f,
                    ag: cv(arguments)
                });
                return this;
            }
            def(f, '__factory__', { value: Insert });
            Inherit(Insert, Deps);
            return Insert;
        }
        function initDefault() {
        }
        function parse(f, n) {
            if (!f)
                return;
            var template = New(Element), proto = f[1], id = nEnum(proto, 'id');
            template.tagName = id ? Factory.parseID(id, template) : n.toLowerCase();
            template.nodeIsInit = typeof f == 'function' ? f : f[0] || initDefault;
            if (typeof proto == 'function')
                proto.call(template);
            else if (proto) {
                (function () {
                    for (var x in proto)
                        if (x[0] == '_')
                            (template.$Atr || (temp.$Atr = {}))[x.substr(1)] = proto[x];
                        else
                            def(template, x, des(proto, x));
                }());
            }
            return compile(template);
        }
        function link(f, C, X) {
            var x = parse(nEnum(f, '_'), X);
            C[X] = C[X] ? x && CloneForIn(x, C[X], true) || C[X] : x || function throwNoFactory() {
                throw new Error('Element Class exists but has no constructor! Probably it is a namespace.');
            };
            for (x in f)
                link(isArr$2(f[x]) || typeof f[x] == 'function' ? { _: f[x] } : f[x], C[X], x);
        }
        function define(n, factory) {
            for (var i = 0, x, C = root, y = (n = n.split('.')).pop(); x = n[i++];)
                C = C[x] || (C[x] = function throwNoFactory() {
                    throw new Error('Element Class exists but has no constructor! Probably it is a namespace.');
                });
            link(typeof factory == 'function' || !factory ? { _: cv(arguments, 1) } : factory, C, y);
        }
        define.use = function (deps) {
            for (var i = 0, x; x = deps[i]; i++) {
                CloneForIn(Deps, root[x]);
            }
            return this;
        };
        define.start = function (name, target) {
            if (typeof (target && (name = root[name])) == 'function') {
                var e;
                Function.call.call(name, {
                    $: {
                        insert: function (x) {
                            e = x.pr;
                        }
                    }
                });
                e = New(e);
                e.node = target;
                for (name in target = e.$Atr)
                    e.at(name, target[name]);
                e.init(e);
            } else
                throw new Error('Wot m8? You have no element called that.');
        };
        return define;
    };
}());