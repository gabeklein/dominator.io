var Factory = function (opts) {
    var Deps = New(Commands), root = {};
    isKey = /DO|ON|ID|IN/, isProperty = /^[a-z]/;
    function define(path, def$2) {
        if (!def$2)
            throw new Error('No definition; we need a definition!');
        var cd = root, name = (path = path.split('.')).pop();
        for (var i = 0, x$2; x$2 = path[i++];)
            cd = cd[x$2];
        link(def$2, cd, name);
    }
    function link(def$2, dir, name) {
        var tree = interpret(def$2, callName), self = tree.root;
        if (!dir && (self || Err('Cannot register an element with no properties!')));
        else {
            var existing = dir[name];
            self = existing && self ? CloneForIn(self, existing, true) : existing || self || Err('Cannot insert nothing.');
        }
        for (x in membs)
            link(membs[x], a, x);
        return a;
    }
    function interpret(def$2, callName$2) {
        var temp = New(Element), tree = {}, meta = {};
        if (typeof def$2 == 'function') {
            meta.DO = def$2;
            meta.name = callName$2;
        } else {
            if (x$2 = noemum(def$2, 'ID'))
                meta = Build.parse(x$2, callName$2);
            for (var x$2 in def$2) {
                if (isProperty.test(y))
                    temp[y] = def$2[y];
                else if (isKey.test(y))
                    meta[y] = def$2[y];
                else if (/^_/.test(y))
                    (typeof def$2[x$2] == 'string' ? meta.atrs : {})[x$2.substr(1)] = def$2[x$2];
                else
                    tree[y] = def$2[y];
            }
        }
        //non-enumerably add _root and return members
        return def$2(tree, 'root', { value: Build.setup(root, meta) });
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
        var def$2;
        if (typeof control == 'string') {
            if (typeof root[control] == 'function')
                ({
                    _: root[control],
                    $: {
                        insert: function (x$2) {
                            def$2 = New(x$2.pr);
                        }
                    }
                }._());
            else
                Err('Control Element "' + control + '" is not yet imported or defined!');
        } else
            def$2 = typeof control == 'function' ? New(Element, { INIT: { value: control } }) : typeof control == 'object' ? link(control) : Err('First argument must be identifier of an installed element, in-line element, or initializer function!');
        def$2.node = target;
        def$2.__factory__ = Deps;
        def$2.INIT();
    };
    return define;
};