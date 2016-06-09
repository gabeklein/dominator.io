//Who needs libraries when you have time to waist on custom dependancies, right? Guys? Amiright? Guys? D:
Object.defineProperty(window,"log",{get:function(){return this.lastLogged;},set:function(a){console.log(this.lastLogged = a)},configurable:false});
 

Resize = (function(){
    var subs = [], timer, m = {
         X:innerWidth,
         Y:innerHeight,
        dX:0,
        dY:0
    };

    function resizeEvent(){
        calc();
        subs.forEach(function(a){  a(m) });
    }

    function calc(){
        m.dX = -(m.X - (m.X = innerWidth));
        m.dY = -(m.Y - (m.Y = innerHeight));
    }

    window.onresize = function(){
        clearTimeout(timer);
        timer = setTimeout(resizeEvent, 100);
    }

    return {
        addEventListener:function(func){
            subs.push(func);
            calc();
            func(m);
            return func;
        },
        removeEventListener:function(func){
            subs.splice(subs.indexOf(func),1);
        }
    }
    })()

cSS = (function(){
    var proto = {
        set:function(a,b){
            var g=arguments, i=g.length;
            if(g.length % 2 > 0) throw "This function works like Noah's Ark."
            while(i) this.style.setProperty(g[i-=2], g[i+1]);
            return this;
        },
        remove:function(){
            var i = g.list.indexOf(this);
            g.sheet.removeRule(g.list.length - i - 1);
            g.list.splice(i, 1)[0]
            delete g.sty[this.selector];
        }
    }
    function g(a,b){
        var m = g.sty, s = g.sheet, o;
        if(!m[a] || b){
            s.insertRule(a+(b||"{}"),0);
            (o = Object.create(proto)).style = (s.rules || s.cssRules)[0].style;
            g.list.push(o);
            return m[o.selector = a] = o;
        } else return m[a];
    }
    g.sheet = document.getElementsByTagName("head")[0].appendChild(document.createElement("style")).sheet;
    g.map = function(){return [].slice.call(arguments).map(function(a){return cSS(a)})};
    g.list = []; g.sty = {}; return g;
    })()

function Net(a,b,onReady){
    var tcp = new WebSocket(a,b),
    listeners = {},
    callback = null,
    hull = {
        addEventListener:function(event, func){ listeners[event] = func },
        removeEventListener:function(event){ delete listeners[event] },
        call:function(command, data, func){
            callback = func || data
            func ? tcp.send(command + ":" + data) : tcp.send(command)
        },
        cast:function(query){ tcp.send(query) },
        post:function(where, query, worked, didnt){
            var req = new XMLHttpRequest();
            req.open("POST", where, true);
            req.onreadystatechange = state;
            req.send(query);
            function state(){
                if(this.readyState<4) return;
                if(this.status==201)  worked(this.responseText);
                else if(this.status==401) didnt();
            }
        }
    };

    tcp.onopen = function(){ onReady(hull) }

    tcp.onmessage = function(message){
        message = message.data;
        if(message.charAt(0) == "#"){
            (listeners[message.substr(1,3)]||listeners.noHandler)(message.substr(5))
        } else { 
            callback(message)
        }
    }
    tcp.onclose = function(){console.log("bye");}

    return 
}

Matrix = {
    set:function(css){css.style.setProperty("transform", this.css)},
    get identity(){return this.X([1,0,0,0,1,0])},
    get css(){
        m = this.mat;
        return "matrix(" + [m[0],m[3],m[1],m[4],m[2],m[5]].join(",") + ")"
    },
    s:function(x, y) {return this.X([x,0,0,0,y,0])},
    t:function(x, y){return this.X([1,0,x,0,1,y])},
    r:function(a){
        var c = Math.cos(a), n = Math.sin(a);
        return this.reduce([c,-n,0,n,c,0]);
    },
    X:function(M, m){
        if(m = this.mat){
            M = M.concat(0,0,1);
            for(var a=0,b=1,c=2,r=this.mat=[],i;a<6;a+=3,b+=3,c+=3) for(i=0;i<3;i++) r.push(m[a]*M[i] + m[b]*M[i+3] + m[c]*M[i+6]);
            return this;
        } else { (m = Object.create(this)).mat = M; return m;
        }
    }
    }

ShadowGen = {
    Text:function(css, s){
        css.set("text-shadow", this.generate(s));
    },
    Box:function(css, s){
        css.set("box-shadow", this.generate(s));
    },
    generate:function(s){
        var bgr      = s.bg,
            len      = s.size || 30,
            alpha    = s.alpha && s.alpha / 255 || 0.05,
            fade     = Math.ceil(len * (s.fade || 1)),
            shd      = alpha2Color(bgr, alpha),
            shadows  = [],
            x = this.directions[s.dir || "bottomRight"],
                y = x[1];
                x = x[0];

        if(s = s.also){shadows.push(
            s.splice(0,3).join("px ")
            + "px rgba(" + hex2rgb(s[0]).concat(s[1] || 1).join(",") + ")"
        )}

        for(var i = 0; i < len; i++) shadows.push(
            (x * len-i) + "px " +
            (y * len-i) + "px " +
            (i <= fade ? 
            rgb2css(gradient(shd, bgr, fade-i, fade)) :
            rgb2css(shd))
        );

        return shadows.reverse().join(", ");

        function alpha2Color(b, o, c){
            var b = hex2rgb(b), //background
                c = c && hex2rgb(c) || [0,0,0]; //color
                o = Math.max(o<1?o:o/100, 0), //opacity
                r = Math.round;
            return  [
                r((c[0] - b[0]) * o + b[0]),
                r((c[1] - b[1]) * o + b[1]),
                r((c[2] - b[2]) * o + b[2])
            ]
            }
        function gradient(a, b, level, deg){
            if(!(a instanceof Array)) a = hex2rgb(a);
            if(!(b instanceof Array)) b = hex2rgb(b);

            if(undefined === deg) deg = 1;

            if(level > deg) return null;
            return [
                (a[0] + ((b[0] - a[0]) / deg) * level)|0,
                (a[1] + ((b[1] - a[1]) / deg) * level)|0,
                (a[2] + ((b[2] - a[2]) / deg) * level)|0
            ]
            }
        function hex2rgb(hex){
            return [               
                (hex & 0xff0000) >> 16, (hex & 0x00ff00) >> 8, hex & 0x0000ff        
            ];
            }
        function rgb2hex(rgb){
            return (rgb[0] << 16) + 
                   (rgb[1] << 8) + 
                    rgb[2]
            }
        function rgb2css(rgb){
            return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).substr(1);
            }
    }, 
    directions:{
        top:         [ 0,-1],
        right:       [ 1, 0],
        left:        [-1, 0],
        bottom:      [ 0, 1],
        topRight:    [ 1,-1],
        bottomRight: [ 1, 1],
        topLeft:     [-1,-1],
        bottomLeft:  [-1, 1]
    }
    }



Elem = (function(){
    var masterType = {
        add:function(){
            var a = [].slice.call(arguments,0), n = null, r = null, t = this;
            if(!isNaN(a[0])){ n = a.splice(0,1)[0] }
            r = typeof a[0] == "string" && function st(){return (a[1] || t.node).appendChild(document.createElement(a[0]))} ||
                typeof a[0] == "function" && function fn(){return a[0].apply(t, [t].concat(a.slice(1)))} ||
                (function(){throw "bad argument in Elem construct"})()
            return n ? t.itr(n, r) : r();
        },
        binds:function(func){
            var args = [].splice.call(arguments,1), t = this;
            return function(){
                t[func].apply(t, args.concat([].splice.call(arguments,0)))
            }
        },
        set:function(prop, a, b){
            Object.defineProperty(this, prop, b? {get:a,set:b} : {set:a});
        },
        get:function(prop, func){
            Object.defineProperty(this, prop, { get: func });
        },
        itr:function(n, f){
            for(var i=0, l=[]; i<n; i++) l.push(f(i));
            return l;
        },
        attr:function(n, v){
            v === null && this.node.removeAttribute(n) || this.node.setAttribute(n,v);
        }
    }
    return function(m, c){
        var o = Object.create(masterType);
        if(typeof m == "string"){
            if(arguments[2]) arguments[2].call(o);
            return window[m] = r;
        } else {
            if(c) c.call(o);
            c=m;
            return r;
        }
        function r(p){
            var n = Object.create(o);
            if(p && m){
                n.node = document.createElement(m.toLowerCase());
                n.parent = p;
            }
            c&&c.apply(n, [n].concat([].slice.call(arguments,1)));
            p&&n.node&&n.parent.node.appendChild(n.node);
            return n;
        }
    }
    })();