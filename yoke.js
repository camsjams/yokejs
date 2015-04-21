var yoke = yoke || {};

(function ($) {
    var __yokes = document.createElement('ul'),
        __yokeId = 'yoke-list',
        __fnAddEventListener = function (el, type, fn) {
            if (el.addEventListener) {
                el.addEventListener(type, fn, false);
            } else if (el.attachEvent) {
                el.attachEvent('on' + type, fn);
            }
        },
        __fnRemoveEventListener = function (el, type, fn) {
            if (el.removeEventListener) {
                el.removeEventListener(type, fn, false);
            } else if (el.detachEvent) {
                el.detachEvent('on' + type, fn);
            }
        };
// setup
    __yokes.setAttribute('id', __yokeId);

    yoke = function (name, options) {
        var bind,
            trigger;
        options = options || {};
        // binding function
        bind = function () {

        };
        // triggering function
        trigger = function () {

        };
    };
})();


