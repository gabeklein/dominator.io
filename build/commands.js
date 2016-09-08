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