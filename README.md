dominator.io
========

Library for spawning and managing DOM objects 

More documentation to come soon!

## What does it do?

Dominator.io is tool that allows developers to quickly write and compose DOM elements, to cleanly implement anything from simple elements to entire sites and dynamic Single-Page-Applications.

## Installation

Get it from Github and simply copy `dominator.io.js` from **/Dist** to your project directory. Then include it in your `<head>`.

```html
<!DOCTYPE html>
<html>
	<head>
		<script src="dominator.js"></script>
		<script src="main.js"></script>
	</head>
	<body></body>
</html>
```

Then create an instance of `dominator` .

```javascript
var define = dominator();

define("MyApp", function($){
	$.DO
		("div", "hello world!")
	.END
})

window.onload = function(){
	define.start("MyApp", document.body)
}
```

## Questions or Contributing
Contact me; new at this. My contact info is listed on my profile.

## License
MIT. See the `LICENSE` file for more details.