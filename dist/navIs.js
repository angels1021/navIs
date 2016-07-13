"use strict";

(function () {
    "use strict";

    function navIs() {
        var devices = {
            desktop: false,
            touch: false,
            Android: false,
            IOS: false,
            WinPhone: false,
            BlackBerry: false,
            nokia: false,
            native: false,
            iphone: false,
            ipod: false,
            ipad: false,
            mobile: false,
            tablet: false,
            HD: false
        };
        var uAgent = navigator.userAgent;
        devices.touch = "ontouchstart" in document.documentElement;
        if (uAgent.match(/iPhone/i)) {
            devices.IOS = true;
            devices.iphone = true;
            devices.mobile = true;
        } else if (uAgent.match(/iPod/i)) {
            devices.IOS = true;
            devices.ipod = true;
            devices.mobile = true;
        } else if (uAgent.match(/iPad/i)) {
            devices.IOS = true;
            devices.ipad = true;
            devices.tablet = true;
            devices.mobile = true;
        } else if (uAgent.match(/Android/i)) {
            devices.Android = true;
            if (uAgent.match(/Mobile/i)) {
                devices.mobile = true;
            } else {
                devices.tablet = true;
            }
        } else if (uAgent.match(/IEMobile/i)) {
            devices.WinPhone = true;
            devices.mobile = true;
        } else if (uAgent.match(/BlackBerry/i)) {
            devices.BlackBerry = true;
            devices.mobile = true;
        } else if (uAgent.match(/NokiaBrowser/i)) {
            devices.nokia = true;
            devices.mobile = true;
        } else {
            devices.desktop = true;
        }
        if (navigator.standalone) {
            devices.native = true;
            devices.desktop = false;
        }
        devices.HD = window.devicePixelRatio > 1;
        return devices;
    }

    function MobileApi(window) {
        var exports = {
            is: navIs(),
            isMobile: function isMobile() {
                return window.innerWidth < 768 && exports.navIs.mobile && !exports.navIs.tablet;
            },
            orientation: function orientation() {
                if ('orientation' in window) {
                    return Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';
                }
            },
            onOrientationChange: function onOrientationChange(fn) {
                if (!angular.isFunction(fn)) {
                    return;
                }
                window.addEventListener('orientationchange', function () {
                    fn(exports.orientation());
                });
            },
            offOrientationChange: function offOrientationChange(fn) {
                window.removeEventListener('orientationchange');
            }
        };

        return exports;
    }

    $.navIs = MobileApi(window);
})();