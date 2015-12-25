
//make function work directly in define

define = dominator();

define("Main", {
	_:%{
		DO($){ return $
			("hello")
		}
	}
})

window.onload = function(){
	define.start("Main", document.body);
}





// //LESSON 3

// define = dominator({ injectThis: true });

// define("Main", function($){
// 	//Primary thing Dominator wants to help with is not repeating yourself.
// 	//The first cool feature is a map function.

// 	//lets say you had a series of elements that are only marginally different...
// 	$.DO(function($){ return $
// 		("div", 3) 
// 			("span", "goodbye")
// 			("span", "cruel")
// 			("span", "world")
// 	})



// 	$.DO
		
// 	.END

// 	//instead you could do it like this
// 	$.DO
// 		("div", 1)
// 			.m("goodbye", "cruel", "world")
// 				("span")
// 	.END
// 	//here we have the map function
// 	//similar to Array.map, it iterates over the Array
// 	//it considers the immediate element as it's child and clones it for ever item in array
// 	//the items in array are given as arguments to each iteration of that element.
// })

// window.onload = function(){
// 	define.start("Main", document.body);
// }
