define = dominator({ settings: null });
define('Main', {
    _: [function (t) {
            t.DO('cardlogo', 'Anything').Test1().END;
        }],
    Test1: [function ($) {
            $.DO('uwot', 'm8').END;
        }]
});
define('Deps', {
    img: function ($, src, atr) {
        (atr = atr || {}).src = 'img/' + src;
        for (src in atr)
            $.at(src, atr[src]);
    }
});
window.onload = function () {
    define.start('Main', ['Deps'], document.body);
};