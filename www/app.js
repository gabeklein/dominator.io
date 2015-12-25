// define = dominator({settings:null});
define = dominator();
define('Main', {
    _: {
        DO: function ($) {
            return $('hello', 2)('wow')('wot')('yolow').a('mybolooo').Junk();
        }
    },
    Junk: {
        _: {
            ON: function ($) {
                $.text = 'hi';
            }
        }
    }
});
window.onload = function () {
    define.start('Main', document.body);
};