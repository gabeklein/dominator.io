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
            DO: function (f) {
                var C = Build.SuperNew(this), c = C.$.Current;
                if (typeof f == 'function')
                    f.call(c.node, C) === C && c.done();
                else if (//remember to put scope resolution on this. Transfer to supernew maybe?
                    f)
                    C.parse(cv(arguments));
                return C;
            },
            // DO(f){
            // 	function L(){ C.parse(ARGS, F); return L };
            // 	var C = L.$ = Build.New(this), F=this.__factory__;
            // 	if(F) Inherit(L,F);
            // 	if(f isFun)
            // 		f.call(this,L)===L && L.$.Current.done();
            // 	else
            // 		return f ? Function.apply.call(L, this, arguments) : L; //f check is failsafe for empty intro element 
            // }
            USE: function (name, i) {
                if (typeof name == 'number')
                    i = name;
                name = 'V';
                if (typeof (i = this[name = name + i]) == 'function')
                    this.DO(i);
            },
            ON: function (one, arg) {
                var a, x, t = this, n = t.node, i = 0, g = one == true ? arg : arguments, listen = one == true ? function (a$2, b) {
                        function once(e) {
                            delete t.listeners[a$2];
                            b(e);
                            n.removeEventListener(a$2, once);
                        }
                        t.listeners[a$2] = b;
                        n.addEventListener(a$2, once);
                    } : function (a$2, b) {
                        t.listeners[a$2] = b;
                        n.addEventListener(a$2, b);
                    };
                if (!t.listeners)
                    t.listeners = {};
                for (; a = g[i];)
                    if (typeof a == 'string') {
                        listen(a, g[i + 1]);
                        i += 2;
                    } else
                        for (x in a) {
                            listen(x, a[x]);
                            i++;
                        }
            },
            ONE: function () {
                this.ON(true, arguments);
            },
            OFF: function (a) {
                this.node.removeEventListener(a, this.listeners[a]);
            },
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
                var n = this.node;
                b === null || !b && n.hasAttribute(a) ? n.removeAttribute(a) : n.setAttribute(a, b != true && b || '');
            },
            cl: function (a, b) {
                var n = this.node.classList;
                b === null ? n.remove(a) : n.toggle(a);
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
                    $.parse(cv(arguments), F);
                    return L;
                }
                ;
                if (!(n = par._build_))
                    (n = New(this)).parent = par;
                var n, cb = n.Current, F = par.__factory__, $ = L.$ = n;
                if (F)
                    Inherit(L, F);
                L.parse = function (a) {
                    $.parse(a, F);
                };
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
        function compile(f, n) {
            function Insert() {
                this.$.insert({
                    pr: f,
                    ag: cv(arguments),
                    nm: n || undefined
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
            if (typeof n == 'string')
                n = n.toLowerCase();
            if (typeof f == 'function') {
                t.tagName = n;
                t.INIT = f;
            } else {
                //when element is set again, it ignores first id, then collides with existing id if same.
                //This forces it into array mode because it thinks it's a dupe.
                //fix.
                nEnum(f, 'ID') ? parseID(f.ID, t) : t.tagName = n || 'noName';
                var on = nEnum(f, 'ON');
                t.INIT = nEnum(f, 'DO') ? on ? function () {
                    on.apply(this, arguments);
                    this.DO(f.DO);
                } : function () {
                    this.DO(f.DO);
                } : on || function () {
                };
                for (var x in f)
                    if (x[0] == '_')
                        (t.$Atr || (t.$Atr = {}))[x.substr(1)] = f[x];
                    else
                        def(t, x, des(f, x));
            }
            return compile(t, n);
        }
        function link(f, C, X) {
            var x = parse(nEnum(f, '_'), X), y;
            C[X] = C[X] ? x && CloneForIn(x, C[X], true) || C[X] : x || function throwNoFactory() {
                Err('Element Class exists but has no constructor! Probably it is a namespace.');
            };
            for (x in f)
                link((y = f[x])._ ? y : { _: y }, C[X], x);
        }
        function define(n, factory) {
            for (var i = 0, x, C = root, y = (n = n.split('.')).pop(); x = n[i++];)
                C = C[x] || (C[x] = function throwNoFactory() {
                    Err('Element Class exists but has no constructor! Probably it is a namespace.');
                });
            link(typeof factory == 'function' || !factory ? { _: cv(arguments, 1) } : factory, C, y);
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