define = dominator({settings:null});

define("Main", {

	_:{
		ID:"@hello",
		ON:function(t){
			t.DO(function($){return $
				("lol", 2)
					.m(3).Alrighty()
					("uwot", "bruvi")
			})
		},
		DO:function($){return $
			("lol", 2)
				("thing", "lol")
					//.m(3, [1,2,3]) ("hello")  // .Test1("lol")
				("uwot", "bruvi")
		},
		IN:function(){
			console.log("herp-derp")
		},
		CSS:"abs block bg:#eee proxima w200"
	},

	Alrighty:{
		ID:"lolol",
		ON:function(t){
			t.DO(function($){return $
				("lol", 2)
					.m(3)("thing", "lol")
					("uwot", "bruvi")
			})
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