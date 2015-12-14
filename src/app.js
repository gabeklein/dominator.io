define = dominator({settings:null});

define("Main", {

	_:[function($){ 
		$.DO
			.m(3)("uwot", "bruv")
		.END
	},{
		ID:"@hello",
		CSS:"abs block bg:#eee proxima w200"
	}],

	Test1:{
		_:[function($){ return $.DO 
			("uwot", "bruv")
			.Yolo()
			.img("lol.png")
		 },%{
			getSwag:function(){

			}
		 }],

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

// &timesTwo a => a+a;

// {&timesTwo a: a*2}

// { &thingy 
// 	a,b,c;
// 	doThing1;
// 	hello();

// }
