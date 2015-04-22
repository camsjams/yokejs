var yoke = yoke || {},
    CustomEvent = CustomEvent || {};

(function (doc) {
    var __yokes = doc.createElement('ul'),
        __yokeId = 'yoke-list',
        __yokeEvents = {},
        __allowedActions = {
            'trigger': true,
            'clear': true,
            'bind': true,
            'unbind': true,
            'list': true
        },
    // utils
        __log = function (msg) {
            return console && console.log && console.log(msg);
        },
        __warn = function (msg) {
            return console && console.warn && console.warn(msg);
        },
        __noop = function () {
        },
        __isStr = function (prop) {
            return typeof prop === 'string';
        },
        __isFun = function (prop) {
            return typeof prop === 'function';
        },
        __isObj = function (prop) {
            return typeof prop === 'object';
        },
        __getChildById = function (ele, id) {
            return ele.querySelector('#' + id);
        },
    // private functions
        __fnAddEvent,
        __fnAddEventListener,
        __fnRemoveEventListener,
        __fnDispatchEvent,
        __fnBind,
        __fnUnBind,
        __fnUnBindAll,
        __fnList,
        __fnTrigger;
    // setup list
    __yokes.setAttribute('id', __yokeId);
    // add event
    __fnAddEvent = function (eventName) {
        try {
            var customEvt;
            if (CustomEvent && __isFun(CustomEvent)) {
                // Create the event and store event in cache
                customEvt = new CustomEvent(eventName);
            } else {
                // Create the event using deprecated method
                customEvt = document.createEvent('Event');
                // Define event name
                customEvt.initEvent(eventName, true, true);
            }
            __yokeEvents[eventName] = customEvt;
        } catch (e) {
            __warn('YokeJS not supported: ' + e);
        }
    };
    // add listener
    __fnAddEventListener = function (element, name, handler) {
        if (element.addEventListener) {
            element.addEventListener(name, handler, false);
        }
    };
    // remove listener
    __fnRemoveEventListener = function (element, name, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(name, handler, false);
        }
    };
    // dispatch listener
    __fnDispatchEvent = function (element, domEvent) {
        if (element.dispatchEvent) {
            element.dispatchEvent(domEvent);
        }
    };
    // binding function
    __fnBind = function (name, options) {
        if (__isFun(options.handler)) {
            // use passed in name or create a random one
            options.id = options.id || 'yoke-' + Math.floor(Math.random() * 100000);
            // remove existing (same id) if one exists
            __fnUnBind(name, options);
            // create new element
            var newYoke = doc.createElement('li');
            newYoke.setAttribute('class', name);
            newYoke.setAttribute('id', options.id);
            // setup custom event
            __fnAddEvent(name);
            // attach listener and handler
            __fnAddEventListener(newYoke, name, function (e, args) {
                try {
                    options.handler(args);
                } catch (exc) {
                    __warn('yoke handler failed:' + exc + ' - ' + name);
                }
            });
            // save into element list
            __yokes.appendChild(newYoke);
        }
    };
    // un-binding function
    __fnUnBind = function (name, options) {
        var oldYoke = __getChildById(__yokes, options.id);
        if (oldYoke) {
            // remove listener and handler
            __fnRemoveEventListener(oldYoke, name, __noop);
            // remove element itself
            __yokes.removeChild(oldYoke);
        }
    };
    // unbind all from name - destructive
    __fnUnBindAll = function (name) {
        var yokes = __yokes.getElementsByClassName(name);
        if (yokes.length) {
            while (yokes.length) {
                if (yokes[0]) {
                    var yokeItem = yokes[0];
                    // remove listener and handler
                    __fnRemoveEventListener(yokeItem, name, __noop);
                    // remove element itself
                    __yokes.removeChild(yokeItem);
                }
            }
        }
    };
    // list all
    __fnList = function (name) {
        var yokes = __yokes.getElementsByClassName(name);
        if (yokes.length) {
            for (var i = 0; i < yokes.length; i++) {
                __log('yoke:' + yokes[i].className + ' id:' + yokes[i].id);
            }
        }
    };
    // triggering function
    __fnTrigger = function (name) {
        var domEvent = __yokeEvents[name];
        if (domEvent) {
            var yokes = __yokes.getElementsByClassName(name);
            if (yokes.length) {
                for (var i = 0; i < yokes.length; i++) {
                    __fnDispatchEvent(yokes[i], domEvent);
                }
            }
        }
    };

    yoke = function (name, options) {
        options = options || {};
        // validate request
        if (__isStr(name) && __isObj(options)) {
            // fill in action for bind shortcut
            if (__isFun(options.handler)) {
                options.action = 'bind';
            }
            // default to action trigger
            options.action = options.action || 'trigger';
            __log('yoke():' + name + ':' + options.action);
            // handle request
            if (__isStr(options.action) && __allowedActions[options.action]) {

                switch (options.action) {
                    case 'bind':
                        __fnBind(name, options);
                        break;
                    case 'unbind':
                        __fnUnBind(name, options);
                        break;
                    case 'trigger':
                        __fnTrigger(name);
                        break;
                    case 'clear':
                        __fnUnBindAll(name);
                        break;
                    case 'list':
                        __fnList(name);
                        break;
                    default:
                        break;
                }
            }
        }
        // exit silently
    };
})(document);