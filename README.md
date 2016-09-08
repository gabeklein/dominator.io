Library for spawning and managing DOM objects. Allows for **programatic** creation of DOM elements, and uses a dead simple object-based class system to group elements and organize your code!

Project currently under development; more documentation to come soon!

## What does it do?

Dominator.io is tool that allows developers to quickly write and compose DOM elements, to cleanly implement anything from simple elements to entire sites and dynamic Single-Page-Applications.

## Installation

Get it from Github and simply copy `dominator.io.js` from **/dist** to your project directory.
Then require it or include it in your `<head>`.

```html
<script src="dominator.io.js"></script>
<script type="text/javascript">

	//if imported directly, library binds to
	window.dom;
	//if not, you can use CommonJS instead with
	var dom = require('dominator.io');

</script>
```

Then start making your elements. After that, start the element you want on the existing node you want, as many times as you want!

```javascript
dom('MyApp', function($){ $
	('div', 'hello world!')
})

window.onload = function(){
	dom.start('MyApp', document.body)
}
```

## Questions or Contributing
Contact me; new at this. My contact info is listed on my profile.

## License
MIT. See the `LICENSE` file for more details.
