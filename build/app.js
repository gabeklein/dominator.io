// define = dominator({settings:null});
define = dominator();
define('Main', {
    _: {
        DO: function ($) {
            return $('hello', 2).Junk('lol')(2)('hello')('world')('helo')('lolol');
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