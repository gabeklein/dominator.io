//make function work directly in define
define = dominator();
define('Main', {
    _: {
        DO: function ($) {
            return $('hello');
        }
    }
});
window.onload = function () {
    define.start('Main', document.body);
};