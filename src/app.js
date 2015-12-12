define = dominator({settings:null});

define("Main", {

	_:function(t){
	    t.DO
	    	("cardlogo", "Anything", 1)
	    		.Test1()
	    	//.Test1()
	    .END;
	},

	Test1:{
		_:function($){
			$.DO
				("uwot", "bruv")
				.Yolo()
				.img("lol.png")
			.END
		},
		Yolo:function($){
			return $.DO("lol", "wut")
		}
	}

})

define("Deps", {
	img:function($, src, atr){
		(atr = atr || {}).src = 'img/' + src;
		for(src in atr) $.at(src, atr[src]);
	}
})

window.onload = function(){
	define.use(["Deps"]).start("Main", document.body);
}

// &timesTwo a; a+a;

// {&timesTwo a; a*2}

// { &thingy 
// 	a,b,c;
// 	doThing1;
// 	hello();

// }





