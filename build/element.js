var Element = {
        get DO() {
            var N = Build.New(this);
            return function (f) {
                if (typeof f == 'function') {
                    var n$2 = f.apply(N.$.Current.node, [N].concat(cv(arguments, 1)));
                    if (n$2 === N)
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
                var event = one ? b : function (e$2) {
                        delete t.listeners[a];
                        b(e$2);
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
        itr: function (n$2, f) {
            //run function n-times and return mapped enumerable
            //do I need this?
            for (var i = 0, l = []; i < n$2; i++)
                l.push(f(i));
            return l;
        },
        up: function (n$2) {
            //retrieves node n-elements up the hierarchy. Default returns immediate parent.
            for (var y = this, n$2 = n$2 || 1; n$2--;)
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
            var n$2 = this.node;
            b === null || !b && n$2.hasAttribute(a) ? n$2.removeAttribute(a) : n$2.setAttribute(a, b != true && b || '');
        },
        cl: function (a, b) {
            this.node.classList[b === undefined && 'toggle' || b && 'add' || 'remove'](a);
        }    //get shim working if necessitated
,
        INIT: function () {
        }
    };