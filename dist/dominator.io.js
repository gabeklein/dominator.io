'use strict';
(function (root, mod) {
    if (typeof define === 'function' && define.amd)
        define([], mod);
    else if (typeof module === 'object' && module.exports)
        module.exports = mod();
    else
        root.dom = mod();
}(this, function () {
    var New = Object.create, def = Object.defineProperty, Inherit = Object.setPrototypeOf || { __proto__: [] } instanceof Array ? function (object, prototype) {
            object.__proto__ = prototype;
        } : copyToForIn;
    function Err(e) {
        throw new Error(e);
    }
    function Warn(e) {
        console.warn(e);
    }
    function isArr(a) {
        return a && Object.prototype.toString.call(a) === '[object Array]' && a || false;
    }
    function cv(a, b, c) {
        return [].slice.call(a, b, c);
    }
    function hide(a, b, c) {
        return def(a, b, c ? { value: c } : { enumerable: false })[b];
    }
    ;
    function put(a, b, c) {
        if (typeof b == 'string')
            def(a, b, { value: c });
        else
            for (c in b)
                def(a, c, { value: b[c] });
        return a;
    }
    function copyToForIn(onto, from, shallow) {
        var O = Object;
        for (var key in from)
            O.defineProperty(onto, key, O.getOwnPropertyDescriptor(from, key));
        return onto;
    }
    var Build = function () {
            //EXPORT
            return function (does, instance, params) {
                var build = session(instance);
                (does || instance.type.DO).apply(instance, [build].concat(params || []));
                build.END();
            };
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
            function session(Parent) {
                //INIT
                var SpawnOp = spawn, Cache = {}, State = {
                        i: -1,
                        node: Parent
                    };
                function Do() {
                    make(cv(arguments));
                    return Do;
                }
                copyToForIn(Do, {
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
                    END: function () {
                        while (State.i === 0)
                            State.pop();
                        Parent.type.willClose(Parent, Cache);
                    }
                });
                include(Do, Parent.type.defs);
                return Do;
                function delegate(type) {
                    return function () {
                        insert(type, arguments);
                        return Do;
                    };
                }
                function include(API, context) {
                    var spawnable = {}, x;
                    for (x in context)
                        spawnable[x] = delegate(context[x]);
                    Inherit(Do, spawnable);
                }
                function push(i, done) {
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
                function insert(type, args) {
                    var onto = push(type.expects, type.IN && type.willClose).node;
                    Process(type, args, onto);
                }
                function make(A) {
                    var a = A[0], i = 1, x, type = new Type();
                    if (typeof a == 'number')
                        return expect(a);
                    if (typeof a == 'string')
                        parse(a, type);
                    else
                        Err('Anonymous elements require atleast a tagname!');
                    if (typeof (a = A[i]) == 'string') {
                        i++;
                        type.text = a;
                    }
                    if (typeof (a = A[i]) == 'object') {
                        i++;
                        for (x in a)
                            type.atrs[x] = a[x];
                    }
                    if (typeof (a = A[i]) == 'number') {
                        i++;
                        type.expects = a;
                    }
                    if (typeof (a = A[i]) == 'function') {
                        i++;
                        type.DO = a;
                    }
                    insert(type);
                }
                function spawn(type, args, parentNode) {
                    var i, x, a, instance = State.node = New(type.element), element = instance.node = document.createElement(type.tag);
                    if (a = type.wrap)
                        for (i = 0, x; x = a[i++];) {
                        }    /*Process wrapper elements*/
                    if (a = type.name)
                        reference(a, instance);
                    if (a = type.text)
                        element.textContent = a;
                    for (x in i = type.atrs)
                        instance.at(x, i[x]);
                    for (i = 0, x = type.clss; i < x.length;)
                        instance.cl(x[i++]);
                    parentNode.append(element);
                    type.didInsert(instance, args);
                    return instance;
                }
                function spawnOnlyIf(cond, nullifyN) {
                    if (cond)
                        return;
                    push(nullifyN || 1);
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
                map:
                    (function (params) {
                        var repetitions, parentNode = push(1, finished);
                        (function () {
                            var args = cv(params), number = args.length, output = [], row, columnar, subject, i, j, k;
                            if (isArr(args[0])) {
                                repetitions = args[0].length;
                                for (i = 0; subject = args[i++];)
                                    if (subject.length = repetitions)
                                        output.push(cache);
                                    else
                                        Err('Inupt arrays must be consistent');
                            } else if (typeof (repetitions = args[0]) == 'number') {
                                if (repetitions < 0) {
                                    repetitions *= -1;
                                    columnar = true;
                                }
                                if (!repetitions == 1)
                                    return;
                                //uuuh that has a side-effect...
                                for (i = 0; subject = args[i++];)
                                    if ((k = subject.length) == repetitions)
                                        output.push(cache);
                                    else
                                        for (j = 0, k = k / repetitions; j < k; j++)
                                            output.push(cache.slice(repetitions * j, repetitions * j + repetitions));
                            } else
                                Err('Map requires a number or modal array.');
                            params = [];
                            for (i = 0, number = output.length; i < repetitions; i++) {
                                params.push(subject = []);
                                for (j = 0; j < number;)
                                    subject.push(output[j++][i]);
                            }
                        }());
                        SpawnOp = function (type, args) {
                            var x, i;
                            if (x = def.name)
                                var list = Cache[x] = [];
                            for (i = 0; i < repetitions; i++) {
                                x = spawn(type, (args || []).concat(params[i] || [], i), parentNode.node);
                                list && list.push(x);
                            }
                        };
                        function finished() {
                            SpawnOp = spawn;
                        }
                    });
            }
        }();
    function Factory(SETTINGS) {
        var DEPS = {}, DEFINED = {};
        function compile(def, name, root) {
            var outer = {}, Q = [outer], x, i = 0;
            put(outer, '_into', root || (root = {}));
            outer[name || '_'] = def;
            while (outer = Q[i]) {
                for (x in outer) {
                    var def = outer[x], next = {}, self = outer._into[x] || (outer._into[x] = new Type());
                    self.tag = name.toLowerCase();
                    for (var x in def)
                        if (/^[a-z]/.test(x))
                            self.element[x] = def[x];
                        else if (/^[A-Z][^A-Z]/.test(x))
                            next[x] = def[x];
                        else if (/DO|ON|IN/.test(x))
                            self[x] = def[x];
                        else if (/^_/.test(x))
                            if (typeof def[x] == 'string')
                                self.atr[x.substr(1)] = def[x];
                            else
                                Err('Underscores are for (string-value) attributes!');
                    if (Object.keys(next).length)
                        Q.push(put(next, '_into', self.defs));
                }
                if (++i > Q.length / 2) {
                    Q = Q.slice(i);
                    i = 0;
                }
            }
            ;
            if (!name)
                return root._;
        }
        ;
        return put(function define(path, def) {
            if (!path)
                Err('Name required for definiton');
            if (!def)
                Err('No definition found for element: ' + path);
            var cd = DEFINED, name = (path = path.split('.')).pop();
            for (var i = 0, x; x = path[i++];)
                (cd = cd.defs[x]) || Err('Path does not exist already! Define parent elements before their children.');
            compile(typeof def == 'function' ? { DO: def } : def, name, cd);
        }, {
            startOnLoad: function (control, callback) {
                var start = this.start;
                window.onload = function () {
                    if (!document || !document.body)
                        Err('`document.body` not found! Is this a browser enviroment?');
                    start(control, document.body);
                    if (typeof callback == 'function')
                        callback();
                };
            },
            start: function (control, target, args) {
                var def = typeof control == 'string' ? DEFINED[control] || Err('Control Element "' + control + '" is not yet imported or registered!') : typeof control == 'function' ? put(new Type(), 'DO', control) : typeof control == 'object' ? compile(control) : Err('First argument must be a defined element\'s id, element definition, or initializer function!');
                var elem = New(def.element);
                elem.node = target;
                def.didInsert(elem, args);
            }
        });
    }
    function Type() {
        (this.element = New(this.element)).type = this;
        this.defs = {};
        this.atrs = {};
        this.clss = [];
    }
    copyToForIn(Type.prototype, {
        didInsert: function (instance, args) {
            if (this.ON) {
                args = this.ON.apply(instance, args);
                if (typeof args == 'function')
                    Build(args, instance);
            }
            if (this.DO && (!args || typeof args.length == 'number'))
                Build(this.DO, instance, args);
        },
        get willClose() {
            var after = this.IN;
            return function (instance, cache) {
                after && after.call(instance, cache);
            };
        },
        element: {
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
                return typeof jQuery == 'function' && hide(this, '$', jQuery(this.node));
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
        }
    });
    return put(Factory(), 'New', Factory);
}));