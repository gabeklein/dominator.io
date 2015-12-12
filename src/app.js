define = dominator({settings:null});

define("Main", {

	_:[function(t){
	    t.DO
	    	("cardlogo", "Anything", 1)
	    		.Test1()
	    	//.Test1()
	    .END;
	}],

	Test1:function($){
		$.DO
			("uwot", "bruv")
		.END
	}

})

define("Deps", {
	img:function($, src, atr){
		(atr = atr || {}).src = 'img/' + src;
		for(src in atr) $.at(src, atr[src]);
	}
})

window.onload = function(){
	define.start("Main", ["Deps"], document.body);
}

// &timesTwo a; a+a;

// {&timesTwo a; a*2}

// { &thingy 
// 	a,b,c;
// 	doThing1;
// 	hello();

// }





