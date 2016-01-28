'use strict';
function cv(a, b, c) {
    return [].slice.call(a, b, c);
}
;
(function () {
    function parseID(id, $) {
        id = id.toLowerCase().replace(new RegExp(' ', 'g'), '').split(/(?=[:#\.@])/);
        if (!$.$Atr)
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
    }
    function CloneForIn(to, from, shallow) {
        for (var key in from)
            if (!shallow || O.hasOwnProperty(from, key))
                O.defineProperty(to, key, O.getOwnPropertyDescriptor(from, key));
        return to;
    }
    function Err(err) {
        throw new Error(err);
    }
    function isArr(arr) {
        return arr && O.prototype.toString.call(arr) === '[object Array]';
    }
    function nEnum(a, b) {
        return a && def(a, b, { enumerable: false })[b];
    }
    var O = Object, New = O.create, def = O.defineProperty, des = O.getOwnPropertyDescriptor, Inherit = O.setPrototypeOf || { __proto__: [] } instanceof Array && function (o, p) {
            o.__proto__ = p;
        } || CloneForIn, Element = {
            YO: function (f) {
                var C$2 = Build.SuperNew(this);
                if (typeof f == 'function')
                    f.call(C$2, C$2) === C$2 && C$2.$.Current.done();
                else {
                    if (//} catch(x){ console.log(x) } }
                        f)
                        C$2.$.parse(cv(arguments), F);
                    return C$2;
                }
            },
            DO: function (f) {
                function L() {
                    C$2.parse(cv(arguments), F$2);
                    return L;
                }
                ;
                var C$2 = L.$ = Build.New(this), F$2 = this.__factory__;
                F$2 && Inherit(L, F$2);
                if (typeof f == 'function')
                    f.call(this, L) === L && L.$.Current.done();
                else {
                    if (//} catch(x){ console.log(x) } }
                        f)
                        C$2.parse(cv(arguments), F$2);
                    return L;
                }
            },
            // TO(adr, f){
            // 	adr = adr.split('.'), i=0, C=this;
            // 	if(!isNaN(adr[0])) C=C.up(parseInt(adr[i++]));
            // 	while(adr[i]) if(!(C=C[adr[i++]])) throw new Error("Element '"+adr[i-1]+"' in '"+adr[i-2]+"' Not Found!");
            // 	function L(){ C.parse(ARGS, F); return L };
            // 	var C = L.$ = Build.New(this), F=this.__factory__;
            // 	F && Inherit(L,F);
            // 	if(f isFun)//{ try{ 
            // 		f.call(L,L)===L && L.$.Current.done(); 
            // 	//} catch(x){ console.log(x) } }
            // 	else{
            // 		C.parse(ARGS,F)
            // 		return L;
            // 	}
            // }
            del: function () {
            },
            itr: function (n, f) {
                for (var i = 0, l = []; i < n; i++)
                    l.push(f(i));
                return l;
            },
            up: function (n) {
                for (var y = this, n = n || 1; n--;)
                    y = y.parentNode;
                return y;
            },
            append: function (New$2) {
                (New$2.parentNode = this).node.appendChild(New$2.node);
            },
            set text(n) {
                var e = this.node;
                while (e.hasChildNodes())
                    e.removeChild(e.lastChild);
                this.node.appendChild(document.createTextNode(n));
            },
            binds: function (func) {
                var t = this, a = cv(arguments, 1);
                return function () {
                    t[func].apply(t, a.concat(cv(arguments)));
                };
            },
            at: function (a, b) {
                b === null || !b && this.node.hasAttribute(a) ? this.node.removeAttribute(a) : this.node.setAttribute(a, b != true && b || '');
            },
            on: function () {
                for (var a, x, i = 0, n = this.node; a = arguments[i++];)
                    for (x in a)
                        n.addEventListener(x, a[x]);
            },
            innerIsInit: function () {
            },
            INIT: function () {
            },
            set init(a) {
                this.INIT = a;
            },
            get init() {
                return function (t, a) {
                    t.INIT.apply(t, [t].concat(a));
                };
            }
        }, Build = {
            SuperNew: function (par, on) {
                function L() {
                    C.parse(cv(arguments), F$2);
                    return L;
                }
                ;
                if (!(n = par._build_))
                    (n = New(this)).parent = par;
                var n, cb = n.Current, F$2 = par.__factory__;
                L.$ = n;
                if (F$2)
                    Inherit(L, F$2);
                n.Current = {
                    i: -1,
                    node: on || par,
                    done: typeof cb == 'function' ? cb : function () {
                        n.Current = cb;
                    }
                };
                return L;
            },
            New: function (on) {
                if (!(n = on._build_))
                    (n = New(this)).parent = on;
                var n, cb = n.Current;
                n.Current = {
                    i: -1,
                    node: on,
                    done: typeof cb == 'function' ? cb : function () {
                        n.Current = cb;
                    }
                };
                return n;
            },
            insert: function (def$2, x) {
                var t = this;
                if (!def$2)
                    return t.Current.i = x;
                var Node, Type = def$2.pr, Elem = New(Type), Cur = t.next(Elem);
                //, afterInit);
                t.Current.i = def$2.i || 0;
                if (def$2.nm)
                    t.is(def$2.nm);
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
                Node = Type.init(Elem, def$2.ag);
                return Elem;
            },
            next: function (a, b) {
                var t = this;
                while (t.Current.i === 0)
                    t.Current.done();
                var c = t.Current;
                t.Current = !a ? {
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
                    this.insert = function () {
                        if (def.i || !def)
                            Err('Nesting is not yet supported in the when function!');
                        this.next(null);
                        delete this.insert;
                    };
            },
            map: function (args) {
                this.insert = function (def$2) {
                    if (def$2.nm)
                        this.parent[def$2.nm] = list;
                    for (var i$2 = 0; i$2 < t; i$2++) {
                        list.push(Build.insert.call(this, {
                            pr: def$2.pr,
                            ag: def$2.ag.concat(x ? x[i$2] : [], i$2)
                        }));
                    }
                    for (def$2 = 2; def$2--;)
                        this.Current.done();
                    delete this.insert;
                };
                var g = args.length, t = args[0], x = null, i = 1, list = [], y, k, l, v, w;
                this.next(null);
                if (isArr(t)) {
                    for (l = t.length; i < g; i++)
                        if (args[i].length != l)
                            Err('Input arrays not consistent');
                    x = args;
                } else if (typeof t == 'number') {
                    if (g > 1)
                        for (x = []; i < g; i++) {
                            y = args[i];
                            if (isArr(y) && y.length % t == 0) {
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
                                Err('Input must be function or Array divisible by ' + t + ' as indicated');
                        }
                } else
                    Err('Map requires number or arrays');
            },
            parse: function (A, p_Fac) {
                if (typeof A[0] == 'number' && A.length == 1)
                    return this.insert(null, A[0]);
                else if (typeof A[0] != 'string')
                    Err('Anonymous elements require atleast a tagname!');
                var $ = New(Element), w = 1, y, i, n, m, nCh;
                if (p_Fac)
                    $.__factory__ = p_Fac;
                if (typeof (y = A[w]) == 'string') {
                    $.$Text = y;
                    w++;
                }
                if (typeof (y = A[w]) == 'object') {
                    $.$Atr = y;
                    w++;
                }
                if (typeof (y = A[w]) == 'number') {
                    nCh = y;
                    w++;
                }
                if (typeof (y = A[w]) == 'function') {
                    $.INIT = y;
                    w++;
                }
                this.insert({
                    pr: $,
                    i: nCh,
                    ag: A.slice(w),
                    nm: parseID(A[0], $)
                });
            }
        }, Commands = {
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
                this.$.map(cv(arguments));
                return this;
            },
            M: function () {
                this.a.$.map(cv(arguments));
                return this;
            },
            get a() {
                this.$.insert(null, 1);
                return this;
            },
            get _() {
                var c = this.$.Current;
                if (c.i < 0)
                    this.$.Current.done();
            },
            get END() {
                this.$.Current.done();
                return this.$.cache;
            }
        };
    window.dominator = function (opts) {
        var root = {}, Deps = New(Commands);
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
        function parse(f, n) {
            if (!f)
                return;
            var t = New(Element);
            typeof n == 'string' && (n = n.toLowerCase());
            if (typeof f == 'function') {
                t.tagName = n;
                t.INIT = f;
            } else {
                nEnum(f, 'ID') ? parseID(f.ID, t) : t.tagName = n || 'noName';
                n = nEnum(f, 'ON');
                t.INIT = nEnum(f, 'DO') ? function () {
                    n && n.apply(this, arguments);
                    this.DO(f.DO);
                } : n || function () {
                };
                for (var x in f)
                    if (x[0] == '_')
                        (t.$Atr || (t.$Atr = {}))[x.substr(1)] = f[x];
                    else
                        def(t, x, des(f, x));
            }
            return compile(t);
        }
        function link(f, C$2, X) {
            var x = parse(nEnum(f, '_'), X), y;
            C$2[X] = C$2[X] ? x && CloneForIn(x, C$2[X], true) || C$2[X] : x || function throwNoFactory() {
                Err('Element Class exists but has no constructor! Probably it is a namespace.');
            };
            for (x in f)
                link((y = f[x])._ ? y : { _: y }, C$2[X], x);
        }
        function define(n, factory) {
            for (var i = 0, x, C$2 = root, y = (n = n.split('.')).pop(); x = n[i++];)
                C$2 = C$2[x] || (C$2[x] = function throwNoFactory() {
                    Err('Element Class exists but has no constructor! Probably it is a namespace.');
                });
            link(typeof factory == 'function' || !factory ? { _: cv(arguments, 1) } : factory, C$2, y);
        }
        define.use = function (deps) {
            for (var i = 0, x; x = deps[i]; i++)
                CloneForIn(Deps, root[x]);
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
                e._build_ = Build.New(e);
                for (name in target = e.$Atr)
                    e.at(name, target[name]);
                e.init(e);
            } else
                Err('Wot m8? You have no element called that.');
        };
        return define;
    };
}());