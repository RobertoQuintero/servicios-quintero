(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// al hacer click en una imagen se abra su version grande
// Obtener la galería de imágenes
var getImages = function getImages(container) {
  return _toConsumableArray(container.querySelectorAll('img'));
}; // Obtener un array de las rutas de las imagenes grandes


var getLargeImages = function getLargeImages(gallery) {
  return gallery.map(function (el) {
    return el.src;
  });
}; // .map( el => el.replace('thumb', 'large'));
// Obtener las descripciones de las imágenes


var getDescriptions = function getDescriptions(gallery) {
  return gallery.map(function (el) {
    return el.alt;
  });
}; // Capturar el evento click en la galería para abrir el lightbox


var openLigthboxEvent = function openLigthboxEvent(container, gallery, larges, descriptions) {
  container.addEventListener('click', function (e) {
    var el = e.target,
        i = gallery.indexOf(el);

    if (el.tagName === 'IMG') {
      openLightbox(gallery, i, larges, descriptions);
    }
  });
}; // Imprimir overlay del lightbox en el body


var openLightbox = function openLightbox(gallery, i, larges, descriptions) {
  var lightboxElement = document.createElement('div');
  lightboxElement.innerHTML = "\n    <div class=\"lightbox-overlay\">\n      <figure class=\"lightbox-container\">\n        <div class=\"close-modal\">\u2716</div>\n        <img src=\"".concat(larges[i], "\" class=\"ligthbox-image\">\n        <figcaption>\n          <p class=\"lightbox-description\">").concat(descriptions[i], "</p>\n          <nav class=\"lightbox-navigation\">\n            <a href=\"#\" class=\"lightbox-navigation__button prev\">\u25C0</a>\n            <span class=\"lightbox-navigation__counter\">Imagen ").concat(i + 1, " de ").concat(gallery.length, "</span>\n            <a href=\"#\" class=\"lightbox-navigation__button next\">\u25B6</a>\n          </nav>\n        </figcaption>\n      </figure>\n    </div>\n  ");
  lightboxElement.id = 'lightbox';
  document.body.appendChild(lightboxElement);
  closeModal(lightboxElement);
  navigateLightbox(lightboxElement, i, larges, descriptions);
};

var closeModal = function closeModal(modalElement) {
  var closeModal = modalElement.querySelector('.close-modal');
  closeModal.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.removeChild(modalElement);
  });
};

var navigateLightbox = function navigateLightbox(lightboxElement, i, larges, descriptions) {
  var prevButton = lightboxElement.querySelector('.prev'),
      nextButton = lightboxElement.querySelector('.next'),
      image = lightboxElement.querySelector('img'),
      description = lightboxElement.querySelector('p'),
      counter = lightboxElement.querySelector('span'),
      closeButton = lightboxElement.querySelector('.close-modal');
  window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft') prevButton.click();
    if (e.key === 'Escape') closeButton.click();
  });
  lightboxElement.addEventListener('click', function (e) {
    e.preventDefault();
    var target = e.target;

    if (target === prevButton) {
      if (i > 0) {
        image.src = larges[i - 1];
        i--;
      } else {
        image.src = larges[larges.length - 1];
        i = larges.length - 1;
      }
    } else if (target === nextButton) {
      if (i < larges.length - 1) {
        image.src = larges[i + 1];
        i++;
      } else {
        image.src = larges[0];
        i = 0;
      }
    }

    description.textContent = descriptions[i];
    counter.textContent = "Imagen ".concat(i + 1, " de ").concat(larges.length);
  });
};

var lightbox = function lightbox(container) {
  var images = getImages(container),
      larges = getLargeImages(images),
      descriptions = getDescriptions(images);
  openLigthboxEvent(container, images, larges, descriptions);
};

lightbox(document.getElementById('gallery-container'));

},{}],2:[function(require,module,exports){
"use strict";

var getInitialScroll = function getInitialScroll() {
  return document.documentElement.scrollTop;
};

var getFinalScroll = function getFinalScroll(element) {
  return Math.floor(element.getBoundingClientRect().top + getInitialScroll());
};

var animatedScrollTo = function animatedScrollTo(targetElement, time) {
  var initialPosition = getInitialScroll(),
      finalPosition = getFinalScroll(targetElement),
      distanceToScroll = finalPosition - initialPosition,
      scrollFragment = Math.ceil(distanceToScroll / time);
  animateScroll(scrollFragment, finalPosition);
};

var animateScroll = function animateScroll(scrollFragment, finalPosition) {
  var animatedScroll = setInterval(function () {
    document.documentElement.scrollTop += scrollFragment;

    if (scrollFragment > 0) {
      if (document.documentElement.scrollTop > finalPosition - scrollFragment / 2) clearInterval(animatedScroll);
    } else {
      if (document.documentElement.scrollTop < finalPosition - scrollFragment / 2) clearInterval(animatedScroll);
    }
  }, 1);
};

var animatedScrollEvent = function animatedScrollEvent(originElement, time) {
  if (originElement.tagName === 'A' && originElement.hash !== '') {
    var targetElement = document.getElementById(originElement.hash.slice(1));
    originElement.addEventListener('click', function (e) {
      e.preventDefault();
      animatedScrollTo(targetElement, time);
    });
  }
};

var animatedScrollAllLinks = function animatedScrollAllLinks(time) {
  var links = document.links;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var link = _step.value;
      animatedScrollEvent(link, time);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

animatedScrollAllLinks(200);

},{}],3:[function(require,module,exports){
"use strict";

var container = document.getElementById('container');
var width = container.firstElementChild.nextElementSibling.getBoundingClientRect().width; //el ancho del proximo hermano

container.firstElementChild.before(container.lastElementChild);
container.style.transform = "translateX(-".concat(width, "px)");
setInterval(function () {
  container.style.transform = "translateX(-".concat(width * 2, "px)");
  container.classList.add('animation');
  container.append(container.firstElementChild);
  container.style.transform = "translateX(-".concat(width, "px)");
}, 15000);
container.addEventListener('animationend', function () {
  return container.classList.remove('animation');
});
window.addEventListener('resize', function () {
  width = container.firstElementChild.nextElementSibling.getBoundingClientRect().width;
  container.style.transform = "translateX(-".concat(width, "px)");
});

},{}],4:[function(require,module,exports){
"use strict";

var navtoggle = document.getElementById('navtoggle'),
    mainMenu = document.getElementById('main-menu');
navtoggle.addEventListener('click', function () {
  mainMenu.classList.toggle('show');
  mainMenu.classList.contains('show') ? navtoggle.innerHTML = '<span>Ocultar</span>' : navtoggle.innerHTML = '<i class="fa fa-bars"></i>';
});

},{}],5:[function(require,module,exports){
"use strict";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.WOW = mod.exports;
  }
})(void 0, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _class, _temp;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function isIn(needle, haystack) {
    return haystack.indexOf(needle) >= 0;
  }

  function extend(custom, defaults) {
    for (var key in defaults) {
      if (custom[key] == null) {
        var value = defaults[key];
        custom[key] = value;
      }
    }

    return custom;
  }

  function isMobile(agent) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
  }

  function createEvent(event) {
    var bubble = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var cancel = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var detail = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var customEvent = void 0;

    if (document.createEvent != null) {
      // W3C DOM
      customEvent = document.createEvent('CustomEvent');
      customEvent.initCustomEvent(event, bubble, cancel, detail);
    } else if (document.createEventObject != null) {
      // IE DOM < 9
      customEvent = document.createEventObject();
      customEvent.eventType = event;
    } else {
      customEvent.eventName = event;
    }

    return customEvent;
  }

  function emitEvent(elem, event) {
    if (elem.dispatchEvent != null) {
      // W3C DOM
      elem.dispatchEvent(event);
    } else if (event in (elem != null)) {
      elem[event]();
    } else if ('on' + event in (elem != null)) {
      elem['on' + event]();
    }
  }

  function addEvent(elem, event, fn) {
    if (elem.addEventListener != null) {
      // W3C DOM
      elem.addEventListener(event, fn, false);
    } else if (elem.attachEvent != null) {
      // IE DOM
      elem.attachEvent('on' + event, fn);
    } else {
      // fallback
      elem[event] = fn;
    }
  }

  function removeEvent(elem, event, fn) {
    if (elem.removeEventListener != null) {
      // W3C DOM
      elem.removeEventListener(event, fn, false);
    } else if (elem.detachEvent != null) {
      // IE DOM
      elem.detachEvent('on' + event, fn);
    } else {
      // fallback
      delete elem[event];
    }
  }

  function getInnerHeight() {
    if ('innerHeight' in window) {
      return window.innerHeight;
    }

    return document.documentElement.clientHeight;
  } // Minimalistic WeakMap shim, just in case.


  var WeakMap = window.WeakMap || window.MozWeakMap || function () {
    function WeakMap() {
      _classCallCheck(this, WeakMap);

      this.keys = [];
      this.values = [];
    }

    _createClass(WeakMap, [{
      key: 'get',
      value: function get(key) {
        for (var i = 0; i < this.keys.length; i++) {
          var item = this.keys[i];

          if (item === key) {
            return this.values[i];
          }
        }

        return undefined;
      }
    }, {
      key: 'set',
      value: function set(key, value) {
        for (var i = 0; i < this.keys.length; i++) {
          var item = this.keys[i];

          if (item === key) {
            this.values[i] = value;
            return this;
          }
        }

        this.keys.push(key);
        this.values.push(value);
        return this;
      }
    }]);

    return WeakMap;
  }(); // Dummy MutationObserver, to avoid raising exceptions.


  var MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (_temp = _class = function () {
    function MutationObserver() {
      _classCallCheck(this, MutationObserver);

      if (typeof console !== 'undefined' && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    _createClass(MutationObserver, [{
      key: 'observe',
      value: function observe() {}
    }]);

    return MutationObserver;
  }(), _class.notSupported = true, _temp); // getComputedStyle shim, from http://stackoverflow.com/a/21797294

  var getComputedStyle = window.getComputedStyle || function getComputedStyle(el) {
    var getComputedStyleRX = /(\-([a-z]){1})/g;
    return {
      getPropertyValue: function getPropertyValue(prop) {
        if (prop === 'float') {
          prop = 'styleFloat';
        }

        if (getComputedStyleRX.test(prop)) {
          prop.replace(getComputedStyleRX, function (_, _char) {
            return _char.toUpperCase();
          });
        }

        var currentStyle = el.currentStyle;
        return (currentStyle != null ? currentStyle[prop] : void 0) || null;
      }
    };
  };

  var WOW = function () {
    function WOW() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, WOW);

      this.defaults = {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
        callback: null,
        scrollContainer: null,
        resetAnimation: true
      };

      this.animate = function animateFactory() {
        if ('requestAnimationFrame' in window) {
          return function (callback) {
            return window.requestAnimationFrame(callback);
          };
        }

        return function (callback) {
          return callback();
        };
      }();

      this.vendors = ['moz', 'webkit'];
      this.start = this.start.bind(this);
      this.resetAnimation = this.resetAnimation.bind(this);
      this.scrollHandler = this.scrollHandler.bind(this);
      this.scrollCallback = this.scrollCallback.bind(this);
      this.scrolled = true;
      this.config = extend(options, this.defaults);

      if (options.scrollContainer != null) {
        this.config.scrollContainer = document.querySelector(options.scrollContainer);
      } // Map of elements to animation names:


      this.animationNameCache = new WeakMap();
      this.wowEvent = createEvent(this.config.boxClass);
    }

    _createClass(WOW, [{
      key: 'init',
      value: function init() {
        this.element = window.document.documentElement;

        if (isIn(document.readyState, ['interactive', 'complete'])) {
          this.start();
        } else {
          addEvent(document, 'DOMContentLoaded', this.start);
        }

        this.finished = [];
      }
    }, {
      key: 'start',
      value: function start() {
        var _this = this;

        this.stopped = false;
        this.boxes = [].slice.call(this.element.querySelectorAll('.' + this.config.boxClass));
        this.all = this.boxes.slice(0);

        if (this.boxes.length) {
          if (this.disabled()) {
            this.resetStyle();
          } else {
            for (var i = 0; i < this.boxes.length; i++) {
              var box = this.boxes[i];
              this.applyStyle(box, true);
            }
          }
        }

        if (!this.disabled()) {
          addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
          addEvent(window, 'resize', this.scrollHandler);
          this.interval = setInterval(this.scrollCallback, 50);
        }

        if (this.config.live) {
          var mut = new MutationObserver(function (records) {
            for (var j = 0; j < records.length; j++) {
              var record = records[j];

              for (var k = 0; k < record.addedNodes.length; k++) {
                var node = record.addedNodes[k];

                _this.doSync(node);
              }
            }

            return undefined;
          });
          mut.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.stopped = true;
        removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
        removeEvent(window, 'resize', this.scrollHandler);

        if (this.interval != null) {
          clearInterval(this.interval);
        }
      }
    }, {
      key: 'sync',
      value: function sync() {
        if (MutationObserver.notSupported) {
          this.doSync(this.element);
        }
      }
    }, {
      key: 'doSync',
      value: function doSync(element) {
        if (typeof element === 'undefined' || element === null) {
          element = this.element;
        }

        if (element.nodeType !== 1) {
          return;
        }

        element = element.parentNode || element;
        var iterable = element.querySelectorAll('.' + this.config.boxClass);

        for (var i = 0; i < iterable.length; i++) {
          var box = iterable[i];

          if (!isIn(box, this.all)) {
            this.boxes.push(box);
            this.all.push(box);

            if (this.stopped || this.disabled()) {
              this.resetStyle();
            } else {
              this.applyStyle(box, true);
            }

            this.scrolled = true;
          }
        }
      }
    }, {
      key: 'show',
      value: function show(box) {
        this.applyStyle(box);
        box.className = box.className + ' ' + this.config.animateClass;

        if (this.config.callback != null) {
          this.config.callback(box);
        }

        emitEvent(box, this.wowEvent);

        if (this.config.resetAnimation) {
          addEvent(box, 'animationend', this.resetAnimation);
          addEvent(box, 'oanimationend', this.resetAnimation);
          addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
          addEvent(box, 'MSAnimationEnd', this.resetAnimation);
        }

        return box;
      }
    }, {
      key: 'applyStyle',
      value: function applyStyle(box, hidden) {
        var _this2 = this;

        var duration = box.getAttribute('data-wow-duration');
        var delay = box.getAttribute('data-wow-delay');
        var iteration = box.getAttribute('data-wow-iteration');
        return this.animate(function () {
          return _this2.customStyle(box, hidden, duration, delay, iteration);
        });
      }
    }, {
      key: 'resetStyle',
      value: function resetStyle() {
        for (var i = 0; i < this.boxes.length; i++) {
          var box = this.boxes[i];
          box.style.visibility = 'visible';
        }

        return undefined;
      }
    }, {
      key: 'resetAnimation',
      value: function resetAnimation(event) {
        if (event.type.toLowerCase().indexOf('animationend') >= 0) {
          var target = event.target || event.srcElement;
          target.className = target.className.replace(this.config.animateClass, '').trim();
        }
      }
    }, {
      key: 'customStyle',
      value: function customStyle(box, hidden, duration, delay, iteration) {
        if (hidden) {
          this.cacheAnimationName(box);
        }

        box.style.visibility = hidden ? 'hidden' : 'visible';

        if (duration) {
          this.vendorSet(box.style, {
            animationDuration: duration
          });
        }

        if (delay) {
          this.vendorSet(box.style, {
            animationDelay: delay
          });
        }

        if (iteration) {
          this.vendorSet(box.style, {
            animationIterationCount: iteration
          });
        }

        this.vendorSet(box.style, {
          animationName: hidden ? 'none' : this.cachedAnimationName(box)
        });
        return box;
      }
    }, {
      key: 'vendorSet',
      value: function vendorSet(elem, properties) {
        for (var name in properties) {
          if (properties.hasOwnProperty(name)) {
            var value = properties[name];
            elem['' + name] = value;

            for (var i = 0; i < this.vendors.length; i++) {
              var vendor = this.vendors[i];
              elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value;
            }
          }
        }
      }
    }, {
      key: 'vendorCSS',
      value: function vendorCSS(elem, property) {
        var style = getComputedStyle(elem);
        var result = style.getPropertyCSSValue(property);

        for (var i = 0; i < this.vendors.length; i++) {
          var vendor = this.vendors[i];
          result = result || style.getPropertyCSSValue('-' + vendor + '-' + property);
        }

        return result;
      }
    }, {
      key: 'animationName',
      value: function animationName(box) {
        var aName = void 0;

        try {
          aName = this.vendorCSS(box, 'animation-name').cssText;
        } catch (error) {
          // Opera, fall back to plain property value
          aName = getComputedStyle(box).getPropertyValue('animation-name');
        }

        if (aName === 'none') {
          return ''; // SVG/Firefox, unable to get animation name?
        }

        return aName;
      }
    }, {
      key: 'cacheAnimationName',
      value: function cacheAnimationName(box) {
        // https://bugzilla.mozilla.org/show_bug.cgi?id=921834
        // box.dataset is not supported for SVG elements in Firefox
        return this.animationNameCache.set(box, this.animationName(box));
      }
    }, {
      key: 'cachedAnimationName',
      value: function cachedAnimationName(box) {
        return this.animationNameCache.get(box);
      }
    }, {
      key: 'scrollHandler',
      value: function scrollHandler() {
        this.scrolled = true;
      }
    }, {
      key: 'scrollCallback',
      value: function scrollCallback() {
        if (this.scrolled) {
          this.scrolled = false;
          var results = [];

          for (var i = 0; i < this.boxes.length; i++) {
            var box = this.boxes[i];

            if (box) {
              if (this.isVisible(box)) {
                this.show(box);
                continue;
              }

              results.push(box);
            }
          }

          this.boxes = results;

          if (!this.boxes.length && !this.config.live) {
            this.stop();
          }
        }
      }
    }, {
      key: 'offsetTop',
      value: function offsetTop(element) {
        // SVG elements don't have an offsetTop in Firefox.
        // This will use their nearest parent that has an offsetTop.
        // Also, using ('offsetTop' of element) causes an exception in Firefox.
        while (element.offsetTop === undefined) {
          element = element.parentNode;
        }

        var top = element.offsetTop;

        while (element.offsetParent) {
          element = element.offsetParent;
          top += element.offsetTop;
        }

        return top;
      }
    }, {
      key: 'isVisible',
      value: function isVisible(box) {
        var offset = box.getAttribute('data-wow-offset') || this.config.offset;
        var viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
        var viewBottom = viewTop + Math.min(this.element.clientHeight, getInnerHeight()) - offset;
        var top = this.offsetTop(box);
        var bottom = top + box.clientHeight;
        return top <= viewBottom && bottom >= viewTop;
      }
    }, {
      key: 'disabled',
      value: function disabled() {
        return !this.config.mobile && isMobile(navigator.userAgent);
      }
    }]);

    return WOW;
  }();

  exports["default"] = WOW;
  module.exports = exports['default'];
});

},{}],6:[function(require,module,exports){
"use strict";

var _toggle = _interopRequireDefault(require("./components/toggle"));

var _slider = _interopRequireDefault(require("./components/slider"));

var _scroll = _interopRequireDefault(require("./components/scroll"));

var _lightbox = _interopRequireDefault(require("./components/lightbox"));

var _wow = _interopRequireDefault(require("./components/wow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

new _wow["default"]().init();

},{"./components/lightbox":1,"./components/scroll":2,"./components/slider":3,"./components/toggle":4,"./components/wow":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tcG9uZW50cy9saWdodGJveC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3Njcm9sbC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3NsaWRlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL3RvZ2dsZS5qcyIsInNyYy9qcy9jb21wb25lbnRzL3dvdy5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTtBQUVBO0FBQ0EsSUFBTSxTQUFTLEdBQUcsU0FBWixTQUFZLENBQUEsU0FBUztBQUFBLDRCQUFRLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixLQUEzQixDQUFSO0FBQUEsQ0FBM0IsQyxDQUVBOzs7QUFDQSxJQUFNLGNBQWMsR0FBRyxTQUFqQixjQUFpQixDQUFBLE9BQU87QUFBQSxTQUFJLE9BQU8sQ0FDSixHQURILENBQ1EsVUFBQSxFQUFFO0FBQUEsV0FBSSxFQUFFLENBQUMsR0FBUDtBQUFBLEdBRFYsQ0FBSjtBQUFBLENBQTlCLEMsQ0FFb0M7QUFFcEM7OztBQUNBLElBQU0sZUFBZSxHQUFHLFNBQWxCLGVBQWtCLENBQUEsT0FBTztBQUFBLFNBQUksT0FBTyxDQUFDLEdBQVIsQ0FBYSxVQUFBLEVBQUU7QUFBQSxXQUFJLEVBQUUsQ0FBQyxHQUFQO0FBQUEsR0FBZixDQUFKO0FBQUEsQ0FBL0IsQyxDQUVBOzs7QUFDQSxJQUFNLGlCQUFpQixHQUFHLFNBQXBCLGlCQUFvQixDQUFDLFNBQUQsRUFBVyxPQUFYLEVBQW1CLE1BQW5CLEVBQTBCLFlBQTFCLEVBQTJDO0FBQ25FLEVBQUEsU0FBUyxDQUFDLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFVBQUEsQ0FBQyxFQUFJO0FBQ3ZDLFFBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFYO0FBQUEsUUFDSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsRUFB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LE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BQU8sQ0FBQyxTQUFELENBQXhCO0FBQ0QsQ0F2aEJEOzs7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSSxlQUFKLEdBQVUsSUFBViIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGFsIGhhY2VyIGNsaWNrIGVuIHVuYSBpbWFnZW4gc2UgYWJyYSBzdSB2ZXJzaW9uIGdyYW5kZVxyXG5cclxuLy8gT2J0ZW5lciBsYSBnYWxlcsOtYSBkZSBpbcOhZ2VuZXNcclxuY29uc3QgZ2V0SW1hZ2VzID0gY29udGFpbmVyID0+IFsuLi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaW1nJyldO1xyXG5cclxuLy8gT2J0ZW5lciB1biBhcnJheSBkZSBsYXMgcnV0YXMgZGUgbGFzIGltYWdlbmVzIGdyYW5kZXNcclxuY29uc3QgZ2V0TGFyZ2VJbWFnZXMgPSBnYWxsZXJ5ID0+IGdhbGxlcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCggZWwgPT4gZWwuc3JjKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAubWFwKCBlbCA9PiBlbC5yZXBsYWNlKCd0aHVtYicsICdsYXJnZScpKTtcclxuXHJcbi8vIE9idGVuZXIgbGFzIGRlc2NyaXBjaW9uZXMgZGUgbGFzIGltw6FnZW5lc1xyXG5jb25zdCBnZXREZXNjcmlwdGlvbnMgPSBnYWxsZXJ5ID0+IGdhbGxlcnkubWFwKCBlbCA9PiBlbC5hbHQpO1xyXG5cclxuLy8gQ2FwdHVyYXIgZWwgZXZlbnRvIGNsaWNrIGVuIGxhIGdhbGVyw61hIHBhcmEgYWJyaXIgZWwgbGlnaHRib3hcclxuY29uc3Qgb3BlbkxpZ3RoYm94RXZlbnQgPSAoY29udGFpbmVyLGdhbGxlcnksbGFyZ2VzLGRlc2NyaXB0aW9ucykgPT4ge1xyXG4gIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgbGV0IGVsID0gZS50YXJnZXQsXHJcbiAgICAgICAgaSA9IGdhbGxlcnkuaW5kZXhPZihlbCk7XHJcbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0lNRycpIHtcclxuICAgICAgb3BlbkxpZ2h0Ym94KGdhbGxlcnksaSxsYXJnZXMsZGVzY3JpcHRpb25zKTtcclxuICAgIH1cclxuICB9KVxyXG59O1xyXG5cclxuLy8gSW1wcmltaXIgb3ZlcmxheSBkZWwgbGlnaHRib3ggZW4gZWwgYm9keVxyXG5jb25zdCBvcGVuTGlnaHRib3ggPSAoZ2FsbGVyeSxpLGxhcmdlcyxkZXNjcmlwdGlvbnMpID0+IHtcclxuICBsZXQgbGlnaHRib3hFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbGlnaHRib3hFbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgIDxkaXYgY2xhc3M9XCJsaWdodGJveC1vdmVybGF5XCI+XHJcbiAgICAgIDxmaWd1cmUgY2xhc3M9XCJsaWdodGJveC1jb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2UtbW9kYWxcIj7inJY8L2Rpdj5cclxuICAgICAgICA8aW1nIHNyYz1cIiR7bGFyZ2VzW2ldfVwiIGNsYXNzPVwibGlndGhib3gtaW1hZ2VcIj5cclxuICAgICAgICA8ZmlnY2FwdGlvbj5cclxuICAgICAgICAgIDxwIGNsYXNzPVwibGlnaHRib3gtZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9uc1tpXX08L3A+XHJcbiAgICAgICAgICA8bmF2IGNsYXNzPVwibGlnaHRib3gtbmF2aWdhdGlvblwiPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwibGlnaHRib3gtbmF2aWdhdGlvbl9fYnV0dG9uIHByZXZcIj7il4A8L2E+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGlnaHRib3gtbmF2aWdhdGlvbl9fY291bnRlclwiPkltYWdlbiAke2kgKyAxfSBkZSAke2dhbGxlcnkubGVuZ3RofTwvc3Bhbj5cclxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImxpZ2h0Ym94LW5hdmlnYXRpb25fX2J1dHRvbiBuZXh0XCI+4pa2PC9hPlxyXG4gICAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgPC9maWdjYXB0aW9uPlxyXG4gICAgICA8L2ZpZ3VyZT5cclxuICAgIDwvZGl2PlxyXG4gIGA7XHJcbiAgbGlnaHRib3hFbGVtZW50LmlkID0gJ2xpZ2h0Ym94JztcclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpZ2h0Ym94RWxlbWVudCk7XHJcbiAgY2xvc2VNb2RhbChsaWdodGJveEVsZW1lbnQpO1xyXG4gIG5hdmlnYXRlTGlnaHRib3gobGlnaHRib3hFbGVtZW50LGksbGFyZ2VzLGRlc2NyaXB0aW9ucyk7XHJcbn07XHJcblxyXG5jb25zdCBjbG9zZU1vZGFsID0gbW9kYWxFbGVtZW50ID0+IHtcclxuICBsZXQgY2xvc2VNb2RhbCA9IG1vZGFsRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtbW9kYWwnKTtcclxuICBjbG9zZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG1vZGFsRWxlbWVudCk7XHJcbiAgfSlcclxufTtcclxuXHJcbmNvbnN0IG5hdmlnYXRlTGlnaHRib3ggPSAobGlnaHRib3hFbGVtZW50LGksbGFyZ2VzLGRlc2NyaXB0aW9ucykgPT4ge1xyXG4gIGxldCBwcmV2QnV0dG9uID0gbGlnaHRib3hFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2JyksXHJcbiAgICAgIG5leHRCdXR0b24gPSBsaWdodGJveEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKSxcclxuICAgICAgaW1hZ2UgPSBsaWdodGJveEVsZW1lbnQucXVlcnlTZWxlY3RvcignaW1nJyksXHJcbiAgICAgIGRlc2NyaXB0aW9uID0gbGlnaHRib3hFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKSxcclxuICAgICAgY291bnRlciA9IGxpZ2h0Ym94RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzcGFuJyksXHJcbiAgICAgIGNsb3NlQnV0dG9uID0gbGlnaHRib3hFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1tb2RhbCcpO1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0Fycm93UmlnaHQnKSBuZXh0QnV0dG9uLmNsaWNrKCk7XHJcbiAgICBpZiAoZS5rZXkgPT09ICdBcnJvd0xlZnQnKSAgcHJldkJ1dHRvbi5jbGljaygpO1xyXG4gICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgY2xvc2VCdXR0b24uY2xpY2soKTtcclxuICB9KTtcclxuICBsaWdodGJveEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgICBpZiAoIHRhcmdldCA9PT0gcHJldkJ1dHRvbikge1xyXG4gICAgICBpZiAoIGkgPiAwICkge1xyXG4gICAgICAgIGltYWdlLnNyYyA9IGxhcmdlc1tpIC0gMV07XHJcbiAgICAgICAgaS0tXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gbGFyZ2VzW2xhcmdlcy5sZW5ndGggLSAxXTtcclxuICAgICAgICBpID0gbGFyZ2VzLmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09PSBuZXh0QnV0dG9uKSB7XHJcbiAgICAgIGlmICggaSA8ICBsYXJnZXMubGVuZ3RoIC0gMSApIHtcclxuICAgICAgICBpbWFnZS5zcmMgPSBsYXJnZXNbaSArIDFdO1xyXG4gICAgICAgIGkrK1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGltYWdlLnNyYyA9IGxhcmdlc1swXTtcclxuICAgICAgICBpID0gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb25zW2ldO1xyXG4gICAgY291bnRlci50ZXh0Q29udGVudCA9IGBJbWFnZW4gJHtpICsgMX0gZGUgJHtsYXJnZXMubGVuZ3RofWA7XHJcblxyXG4gIH0pXHJcbn07XHJcblxyXG5jb25zdCBsaWdodGJveCA9IGNvbnRhaW5lciA9PiB7XHJcbiAgbGV0IGltYWdlcyA9IGdldEltYWdlcyhjb250YWluZXIpLFxyXG4gICAgICBsYXJnZXMgPSBnZXRMYXJnZUltYWdlcyhpbWFnZXMpLFxyXG4gICAgICBkZXNjcmlwdGlvbnMgPSBnZXREZXNjcmlwdGlvbnMoaW1hZ2VzKTtcclxuICBvcGVuTGlndGhib3hFdmVudChjb250YWluZXIsaW1hZ2VzLGxhcmdlcyxkZXNjcmlwdGlvbnMpO1xyXG59O1xyXG5cclxubGlnaHRib3goZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnktY29udGFpbmVyJykpO1xyXG4iLCJjb25zdCBnZXRJbml0aWFsU2Nyb2xsID0gKCkgPT4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuY29uc3QgZ2V0RmluYWxTY3JvbGwgPSBlbGVtZW50ID0+IE1hdGguZmxvb3IoZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBnZXRJbml0aWFsU2Nyb2xsKCkpO1xyXG5cclxuY29uc3QgYW5pbWF0ZWRTY3JvbGxUbyA9ICh0YXJnZXRFbGVtZW50LHRpbWUpID0+IHtcclxuICBsZXQgaW5pdGlhbFBvc2l0aW9uID0gZ2V0SW5pdGlhbFNjcm9sbCgpLFxyXG4gICAgICBmaW5hbFBvc2l0aW9uID0gZ2V0RmluYWxTY3JvbGwodGFyZ2V0RWxlbWVudCksXHJcbiAgICAgIGRpc3RhbmNlVG9TY3JvbGwgPSBmaW5hbFBvc2l0aW9uIC0gaW5pdGlhbFBvc2l0aW9uLFxyXG4gICAgICBzY3JvbGxGcmFnbWVudCA9IE1hdGguY2VpbChkaXN0YW5jZVRvU2Nyb2xsIC8gdGltZSk7XHJcbiAgYW5pbWF0ZVNjcm9sbChzY3JvbGxGcmFnbWVudCwgZmluYWxQb3NpdGlvbik7XHJcbn07XHJcblxyXG5jb25zdCBhbmltYXRlU2Nyb2xsID0gKHNjcm9sbEZyYWdtZW50LGZpbmFsUG9zaXRpb24pID0+IHtcclxuICBsZXQgYW5pbWF0ZWRTY3JvbGwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCArPSBzY3JvbGxGcmFnbWVudDtcclxuICAgIGlmIChzY3JvbGxGcmFnbWVudCA+IDApIHtcclxuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPiBmaW5hbFBvc2l0aW9uIC0gKHNjcm9sbEZyYWdtZW50IC8gMikpIGNsZWFySW50ZXJ2YWwoYW5pbWF0ZWRTY3JvbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA8IGZpbmFsUG9zaXRpb24gLSAoc2Nyb2xsRnJhZ21lbnQgLyAyKSkgY2xlYXJJbnRlcnZhbChhbmltYXRlZFNjcm9sbClcclxuICAgIH1cclxuXHJcbiAgfSwxKTtcclxufTtcclxuXHJcbmNvbnN0IGFuaW1hdGVkU2Nyb2xsRXZlbnQgPSAob3JpZ2luRWxlbWVudCx0aW1lKSA9PiB7XHJcbiAgaWYgKG9yaWdpbkVsZW1lbnQudGFnTmFtZSA9PT0gJ0EnICYmIG9yaWdpbkVsZW1lbnQuaGFzaCAhPT0gJycpIHtcclxuICAgIGxldCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3JpZ2luRWxlbWVudC5oYXNoLnNsaWNlKDEpKTtcclxuICAgIG9yaWdpbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBhbmltYXRlZFNjcm9sbFRvKHRhcmdldEVsZW1lbnQsdGltZSlcclxuICAgIH0pXHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgYW5pbWF0ZWRTY3JvbGxBbGxMaW5rcyA9IHRpbWUgPT4ge1xyXG4gIGxldCBsaW5rcyA9IGRvY3VtZW50LmxpbmtzO1xyXG4gIGZvciAobGV0IGxpbmsgb2YgbGlua3MpIHtcclxuICAgIGFuaW1hdGVkU2Nyb2xsRXZlbnQobGluayx0aW1lKVxyXG4gIH1cclxufTtcclxuXHJcbmFuaW1hdGVkU2Nyb2xsQWxsTGlua3MoMjAwKTtcclxuIiwiY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXHJcbmxldCB3aWR0aCA9IGNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuLy9lbCBhbmNobyBkZWwgcHJveGltbyBoZXJtYW5vXHJcblxyXG5jb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuYmVmb3JlKGNvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkKVxyXG5jb250YWluZXIuc3R5bGUudHJhbnNmb3JtPSBgdHJhbnNsYXRlWCgtJHt3aWR0aH1weClgXHJcbnNldEludGVydmFsKCgpID0+IHtcclxuICAgIGNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm09IGB0cmFuc2xhdGVYKC0ke3dpZHRoKjJ9cHgpYFxyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbicpXHJcbiAgICBjb250YWluZXIuYXBwZW5kKGNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZClcclxuICAgIGNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm09IGB0cmFuc2xhdGVYKC0ke3dpZHRofXB4KWBcclxufSwgMTUwMDApO1xyXG5cclxuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsKCkgPT4gY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvbicpKVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywoKT0+e1xyXG4gICAgd2lkdGggPSBjb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXHJcbiAgICBjb250YWluZXIuc3R5bGUudHJhbnNmb3JtPSBgdHJhbnNsYXRlWCgtJHt3aWR0aH1weClgXHJcblxyXG59KSIsImxldCBuYXZ0b2dnbGUgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZ0b2dnbGUnKSxcclxuICAgICBtYWluTWVudSAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1tZW51Jyk7XHJcblxyXG5uYXZ0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XHJcbiAgICBtYWluTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdzaG93JylcclxuICAgIG1haW5NZW51LmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpXHJcbiAgICAgICAgP1x0bmF2dG9nZ2xlLmlubmVySFRNTCA9ICc8c3Bhbj5PY3VsdGFyPC9zcGFuPidcclxuXHRcdFx0XHQ6XHRuYXZ0b2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEgZmEtYmFyc1wiPjwvaT4nXHJcbn0pXHJcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ21vZHVsZScsICdleHBvcnRzJ10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShtb2R1bGUsIGV4cG9ydHMpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QsIG1vZC5leHBvcnRzKTtcbiAgICBnbG9iYWwuV09XID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG4gIH0pO1xuXG4gIHZhciBfY2xhc3MsIF90ZW1wO1xuXG4gIGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gIH1cblxuICB2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gICAgfTtcbiAgfSgpO1xuXG4gIGZ1bmN0aW9uIGlzSW4obmVlZGxlLCBoYXlzdGFjaykge1xuICAgIHJldHVybiBoYXlzdGFjay5pbmRleE9mKG5lZWRsZSkgPj0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZChjdXN0b20sIGRlZmF1bHRzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRlZmF1bHRzKSB7XG4gICAgICBpZiAoY3VzdG9tW2tleV0gPT0gbnVsbCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBkZWZhdWx0c1trZXldO1xuICAgICAgICBjdXN0b21ba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VzdG9tO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNNb2JpbGUoYWdlbnQpIHtcbiAgICByZXR1cm4gKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChhZ2VudClcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRXZlbnQoZXZlbnQpIHtcbiAgICB2YXIgYnViYmxlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBhcmd1bWVudHNbMV07XG4gICAgdmFyIGNhbmNlbCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzJdO1xuICAgIHZhciBkZXRhaWwgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDMgfHwgYXJndW1lbnRzWzNdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzNdO1xuXG4gICAgdmFyIGN1c3RvbUV2ZW50ID0gdm9pZCAwO1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCAhPSBudWxsKSB7XG4gICAgICAvLyBXM0MgRE9NXG4gICAgICBjdXN0b21FdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgY3VzdG9tRXZlbnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBidWJibGUsIGNhbmNlbCwgZGV0YWlsKTtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0ICE9IG51bGwpIHtcbiAgICAgIC8vIElFIERPTSA8IDlcbiAgICAgIGN1c3RvbUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICAgIGN1c3RvbUV2ZW50LmV2ZW50VHlwZSA9IGV2ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXN0b21FdmVudC5ldmVudE5hbWUgPSBldmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VzdG9tRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0RXZlbnQoZWxlbSwgZXZlbnQpIHtcbiAgICBpZiAoZWxlbS5kaXNwYXRjaEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIC8vIFczQyBET01cbiAgICAgIGVsZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSBlbHNlIGlmIChldmVudCBpbiAoZWxlbSAhPSBudWxsKSkge1xuICAgICAgZWxlbVtldmVudF0oKTtcbiAgICB9IGVsc2UgaWYgKCdvbicgKyBldmVudCBpbiAoZWxlbSAhPSBudWxsKSkge1xuICAgICAgZWxlbVsnb24nICsgZXZlbnRdKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRXZlbnQoZWxlbSwgZXZlbnQsIGZuKSB7XG4gICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lciAhPSBudWxsKSB7XG4gICAgICAvLyBXM0MgRE9NXG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIC8vIElFIERPTVxuICAgICAgZWxlbS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmFsbGJhY2tcbiAgICAgIGVsZW1bZXZlbnRdID0gZm47XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWxlbSwgZXZlbnQsIGZuKSB7XG4gICAgaWYgKGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciAhPSBudWxsKSB7XG4gICAgICAvLyBXM0MgRE9NXG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChlbGVtLmRldGFjaEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIC8vIElFIERPTVxuICAgICAgZWxlbS5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmFsbGJhY2tcbiAgICAgIGRlbGV0ZSBlbGVtW2V2ZW50XTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbm5lckhlaWdodCgpIHtcbiAgICBpZiAoJ2lubmVySGVpZ2h0JyBpbiB3aW5kb3cpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICAvLyBNaW5pbWFsaXN0aWMgV2Vha01hcCBzaGltLCBqdXN0IGluIGNhc2UuXG4gIHZhciBXZWFrTWFwID0gd2luZG93LldlYWtNYXAgfHwgd2luZG93Lk1veldlYWtNYXAgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdlYWtNYXAoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2Vha01hcCk7XG5cbiAgICAgIHRoaXMua2V5cyA9IFtdO1xuICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoV2Vha01hcCwgW3tcbiAgICAgIGtleTogJ2dldCcsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMua2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5rZXlzW2ldO1xuICAgICAgICAgIGlmIChpdGVtID09PSBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlc1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdzZXQnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5rZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmtleXNbaV07XG4gICAgICAgICAgaWYgKGl0ZW0gPT09IGtleSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFdlYWtNYXA7XG4gIH0oKTtcblxuICAvLyBEdW1teSBNdXRhdGlvbk9ic2VydmVyLCB0byBhdm9pZCByYWlzaW5nIGV4Y2VwdGlvbnMuXG4gIHZhciBNdXRhdGlvbk9ic2VydmVyID0gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93LldlYmtpdE11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93Lk1vek11dGF0aW9uT2JzZXJ2ZXIgfHwgKF90ZW1wID0gX2NsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTXV0YXRpb25PYnNlcnZlcik7XG5cbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ011dGF0aW9uT2JzZXJ2ZXIgaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGJyb3dzZXIuJyk7XG4gICAgICAgIGNvbnNvbGUud2FybignV09XLmpzIGNhbm5vdCBkZXRlY3QgZG9tIG11dGF0aW9ucywgcGxlYXNlIGNhbGwgLnN5bmMoKSBhZnRlciBsb2FkaW5nIG5ldyBjb250ZW50LicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhNdXRhdGlvbk9ic2VydmVyLCBbe1xuICAgICAga2V5OiAnb2JzZXJ2ZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gb2JzZXJ2ZSgpIHt9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIE11dGF0aW9uT2JzZXJ2ZXI7XG4gIH0oKSwgX2NsYXNzLm5vdFN1cHBvcnRlZCA9IHRydWUsIF90ZW1wKTtcblxuICAvLyBnZXRDb21wdXRlZFN0eWxlIHNoaW0sIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjE3OTcyOTRcbiAgdmFyIGdldENvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSB8fCBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsKSB7XG4gICAgdmFyIGdldENvbXB1dGVkU3R5bGVSWCA9IC8oXFwtKFthLXpdKXsxfSkvZztcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0UHJvcGVydHlWYWx1ZTogZnVuY3Rpb24gZ2V0UHJvcGVydHlWYWx1ZShwcm9wKSB7XG4gICAgICAgIGlmIChwcm9wID09PSAnZmxvYXQnKSB7XG4gICAgICAgICAgcHJvcCA9ICdzdHlsZUZsb2F0JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZVJYLnRlc3QocHJvcCkpIHtcbiAgICAgICAgICBwcm9wLnJlcGxhY2UoZ2V0Q29tcHV0ZWRTdHlsZVJYLCBmdW5jdGlvbiAoXywgX2NoYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfY2hhci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50U3R5bGUgPSBlbC5jdXJyZW50U3R5bGU7XG5cbiAgICAgICAgcmV0dXJuIChjdXJyZW50U3R5bGUgIT0gbnVsbCA/IGN1cnJlbnRTdHlsZVtwcm9wXSA6IHZvaWQgMCkgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHZhciBXT1cgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV09XKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdPVyk7XG5cbiAgICAgIHRoaXMuZGVmYXVsdHMgPSB7XG4gICAgICAgIGJveENsYXNzOiAnd293JyxcbiAgICAgICAgYW5pbWF0ZUNsYXNzOiAnYW5pbWF0ZWQnLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgbGl2ZTogdHJ1ZSxcbiAgICAgICAgY2FsbGJhY2s6IG51bGwsXG4gICAgICAgIHNjcm9sbENvbnRhaW5lcjogbnVsbCxcbiAgICAgICAgcmVzZXRBbmltYXRpb246IHRydWVcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYW5pbWF0ZSA9IGZ1bmN0aW9uIGFuaW1hdGVGYWN0b3J5KCkge1xuICAgICAgICBpZiAoJ3JlcXVlc3RBbmltYXRpb25GcmFtZScgaW4gd2luZG93KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9O1xuICAgICAgfSgpO1xuXG4gICAgICB0aGlzLnZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnXTtcblxuICAgICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMucmVzZXRBbmltYXRpb24gPSB0aGlzLnJlc2V0QW5pbWF0aW9uLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuc2Nyb2xsQ2FsbGJhY2sgPSB0aGlzLnNjcm9sbENhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnNjcm9sbGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuY29uZmlnID0gZXh0ZW5kKG9wdGlvbnMsIHRoaXMuZGVmYXVsdHMpO1xuICAgICAgaWYgKG9wdGlvbnMuc2Nyb2xsQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb25maWcuc2Nyb2xsQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnNjcm9sbENvbnRhaW5lcik7XG4gICAgICB9XG4gICAgICAvLyBNYXAgb2YgZWxlbWVudHMgdG8gYW5pbWF0aW9uIG5hbWVzOlxuICAgICAgdGhpcy5hbmltYXRpb25OYW1lQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgdGhpcy53b3dFdmVudCA9IGNyZWF0ZUV2ZW50KHRoaXMuY29uZmlnLmJveENsYXNzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoV09XLCBbe1xuICAgICAga2V5OiAnaW5pdCcsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgaWYgKGlzSW4oZG9jdW1lbnQucmVhZHlTdGF0ZSwgWydpbnRlcmFjdGl2ZScsICdjb21wbGV0ZSddKSkge1xuICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRFdmVudChkb2N1bWVudCwgJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLnN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbmlzaGVkID0gW107XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc3RhcnQnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJveGVzID0gW10uc2xpY2UuY2FsbCh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyB0aGlzLmNvbmZpZy5ib3hDbGFzcykpO1xuICAgICAgICB0aGlzLmFsbCA9IHRoaXMuYm94ZXMuc2xpY2UoMCk7XG4gICAgICAgIGlmICh0aGlzLmJveGVzLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRTdHlsZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGJveCA9IHRoaXMuYm94ZXNbaV07XG4gICAgICAgICAgICAgIHRoaXMuYXBwbHlTdHlsZShib3gsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQoKSkge1xuICAgICAgICAgIGFkZEV2ZW50KHRoaXMuY29uZmlnLnNjcm9sbENvbnRhaW5lciB8fCB3aW5kb3csICdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgICAgICAgIGFkZEV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuc2Nyb2xsQ2FsbGJhY2ssIDUwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25maWcubGl2ZSkge1xuICAgICAgICAgIHZhciBtdXQgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAocmVjb3Jkcykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZWNvcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIHZhciByZWNvcmQgPSByZWNvcmRzW2pdO1xuICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHJlY29yZC5hZGRlZE5vZGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSByZWNvcmQuYWRkZWROb2Rlc1trXTtcbiAgICAgICAgICAgICAgICBfdGhpcy5kb1N5bmMobm9kZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbXV0Lm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc3RvcCcsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgdGhpcy5zdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5jb25maWcuc2Nyb2xsQ29udGFpbmVyIHx8IHdpbmRvdywgJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgICAgIGlmICh0aGlzLmludGVydmFsICE9IG51bGwpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc3luYycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gc3luYygpIHtcbiAgICAgICAgaWYgKE11dGF0aW9uT2JzZXJ2ZXIubm90U3VwcG9ydGVkKSB7XG4gICAgICAgICAgdGhpcy5kb1N5bmModGhpcy5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2RvU3luYycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZG9TeW5jKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCBlbGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlIHx8IGVsZW1lbnQ7XG4gICAgICAgIHZhciBpdGVyYWJsZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyB0aGlzLmNvbmZpZy5ib3hDbGFzcyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgYm94ID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgaWYgKCFpc0luKGJveCwgdGhpcy5hbGwpKSB7XG4gICAgICAgICAgICB0aGlzLmJveGVzLnB1c2goYm94KTtcbiAgICAgICAgICAgIHRoaXMuYWxsLnB1c2goYm94KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BwZWQgfHwgdGhpcy5kaXNhYmxlZCgpKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVzZXRTdHlsZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5hcHBseVN0eWxlKGJveCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdzaG93JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzaG93KGJveCkge1xuICAgICAgICB0aGlzLmFwcGx5U3R5bGUoYm94KTtcbiAgICAgICAgYm94LmNsYXNzTmFtZSA9IGJveC5jbGFzc05hbWUgKyAnICcgKyB0aGlzLmNvbmZpZy5hbmltYXRlQ2xhc3M7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuY2FsbGJhY2soYm94KTtcbiAgICAgICAgfVxuICAgICAgICBlbWl0RXZlbnQoYm94LCB0aGlzLndvd0V2ZW50KTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcucmVzZXRBbmltYXRpb24pIHtcbiAgICAgICAgICBhZGRFdmVudChib3gsICdhbmltYXRpb25lbmQnLCB0aGlzLnJlc2V0QW5pbWF0aW9uKTtcbiAgICAgICAgICBhZGRFdmVudChib3gsICdvYW5pbWF0aW9uZW5kJywgdGhpcy5yZXNldEFuaW1hdGlvbik7XG4gICAgICAgICAgYWRkRXZlbnQoYm94LCAnd2Via2l0QW5pbWF0aW9uRW5kJywgdGhpcy5yZXNldEFuaW1hdGlvbik7XG4gICAgICAgICAgYWRkRXZlbnQoYm94LCAnTVNBbmltYXRpb25FbmQnLCB0aGlzLnJlc2V0QW5pbWF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib3g7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnYXBwbHlTdHlsZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwbHlTdHlsZShib3gsIGhpZGRlbikge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgZHVyYXRpb24gPSBib3guZ2V0QXR0cmlidXRlKCdkYXRhLXdvdy1kdXJhdGlvbicpO1xuICAgICAgICB2YXIgZGVsYXkgPSBib3guZ2V0QXR0cmlidXRlKCdkYXRhLXdvdy1kZWxheScpO1xuICAgICAgICB2YXIgaXRlcmF0aW9uID0gYm94LmdldEF0dHJpYnV0ZSgnZGF0YS13b3ctaXRlcmF0aW9uJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5jdXN0b21TdHlsZShib3gsIGhpZGRlbiwgZHVyYXRpb24sIGRlbGF5LCBpdGVyYXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdyZXNldFN0eWxlJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldFN0eWxlKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgYm94ID0gdGhpcy5ib3hlc1tpXTtcbiAgICAgICAgICBib3guc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3Jlc2V0QW5pbWF0aW9uJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldEFuaW1hdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudHlwZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2FuaW1hdGlvbmVuZCcpID49IDApIHtcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgICAgICAgdGFyZ2V0LmNsYXNzTmFtZSA9IHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSh0aGlzLmNvbmZpZy5hbmltYXRlQ2xhc3MsICcnKS50cmltKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdjdXN0b21TdHlsZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY3VzdG9tU3R5bGUoYm94LCBoaWRkZW4sIGR1cmF0aW9uLCBkZWxheSwgaXRlcmF0aW9uKSB7XG4gICAgICAgIGlmIChoaWRkZW4pIHtcbiAgICAgICAgICB0aGlzLmNhY2hlQW5pbWF0aW9uTmFtZShib3gpO1xuICAgICAgICB9XG4gICAgICAgIGJveC5zdHlsZS52aXNpYmlsaXR5ID0gaGlkZGVuID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG5cbiAgICAgICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICAgICAgdGhpcy52ZW5kb3JTZXQoYm94LnN0eWxlLCB7IGFuaW1hdGlvbkR1cmF0aW9uOiBkdXJhdGlvbiB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVsYXkpIHtcbiAgICAgICAgICB0aGlzLnZlbmRvclNldChib3guc3R5bGUsIHsgYW5pbWF0aW9uRGVsYXk6IGRlbGF5IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVyYXRpb24pIHtcbiAgICAgICAgICB0aGlzLnZlbmRvclNldChib3guc3R5bGUsIHsgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IGl0ZXJhdGlvbiB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZlbmRvclNldChib3guc3R5bGUsIHsgYW5pbWF0aW9uTmFtZTogaGlkZGVuID8gJ25vbmUnIDogdGhpcy5jYWNoZWRBbmltYXRpb25OYW1lKGJveCkgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJveDtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICd2ZW5kb3JTZXQnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZlbmRvclNldChlbGVtLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBwcm9wZXJ0aWVzW25hbWVdO1xuICAgICAgICAgICAgZWxlbVsnJyArIG5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudmVuZG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgdmVuZG9yID0gdGhpcy52ZW5kb3JzW2ldO1xuICAgICAgICAgICAgICBlbGVtWycnICsgdmVuZG9yICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc3Vic3RyKDEpXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3ZlbmRvckNTUycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdmVuZG9yQ1NTKGVsZW0sIHByb3BlcnR5KSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gICAgICAgIHZhciByZXN1bHQgPSBzdHlsZS5nZXRQcm9wZXJ0eUNTU1ZhbHVlKHByb3BlcnR5KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnZlbmRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgdmVuZG9yID0gdGhpcy52ZW5kb3JzW2ldO1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBzdHlsZS5nZXRQcm9wZXJ0eUNTU1ZhbHVlKCctJyArIHZlbmRvciArICctJyArIHByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2FuaW1hdGlvbk5hbWUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFuaW1hdGlvbk5hbWUoYm94KSB7XG4gICAgICAgIHZhciBhTmFtZSA9IHZvaWQgMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhTmFtZSA9IHRoaXMudmVuZG9yQ1NTKGJveCwgJ2FuaW1hdGlvbi1uYW1lJykuY3NzVGV4dDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBPcGVyYSwgZmFsbCBiYWNrIHRvIHBsYWluIHByb3BlcnR5IHZhbHVlXG4gICAgICAgICAgYU5hbWUgPSBnZXRDb21wdXRlZFN0eWxlKGJveCkuZ2V0UHJvcGVydHlWYWx1ZSgnYW5pbWF0aW9uLW5hbWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhTmFtZSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgcmV0dXJuICcnOyAvLyBTVkcvRmlyZWZveCwgdW5hYmxlIHRvIGdldCBhbmltYXRpb24gbmFtZT9cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhTmFtZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdjYWNoZUFuaW1hdGlvbk5hbWUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNhY2hlQW5pbWF0aW9uTmFtZShib3gpIHtcbiAgICAgICAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTIxODM0XG4gICAgICAgIC8vIGJveC5kYXRhc2V0IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIFNWRyBlbGVtZW50cyBpbiBGaXJlZm94XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbk5hbWVDYWNoZS5zZXQoYm94LCB0aGlzLmFuaW1hdGlvbk5hbWUoYm94KSk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2FjaGVkQW5pbWF0aW9uTmFtZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY2FjaGVkQW5pbWF0aW9uTmFtZShib3gpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uTmFtZUNhY2hlLmdldChib3gpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3Njcm9sbEhhbmRsZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3Njcm9sbENhbGxiYWNrJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzY3JvbGxDYWxsYmFjaygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsZWQpIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbGVkID0gZmFsc2U7XG4gICAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib3ggPSB0aGlzLmJveGVzW2ldO1xuICAgICAgICAgICAgaWYgKGJveCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUoYm94KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhib3gpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaChib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmJveGVzID0gcmVzdWx0cztcbiAgICAgICAgICBpZiAoIXRoaXMuYm94ZXMubGVuZ3RoICYmICF0aGlzLmNvbmZpZy5saXZlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvZmZzZXRUb3AnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9mZnNldFRvcChlbGVtZW50KSB7XG4gICAgICAgIC8vIFNWRyBlbGVtZW50cyBkb24ndCBoYXZlIGFuIG9mZnNldFRvcCBpbiBGaXJlZm94LlxuICAgICAgICAvLyBUaGlzIHdpbGwgdXNlIHRoZWlyIG5lYXJlc3QgcGFyZW50IHRoYXQgaGFzIGFuIG9mZnNldFRvcC5cbiAgICAgICAgLy8gQWxzbywgdXNpbmcgKCdvZmZzZXRUb3AnIG9mIGVsZW1lbnQpIGNhdXNlcyBhbiBleGNlcHRpb24gaW4gRmlyZWZveC5cbiAgICAgICAgd2hpbGUgKGVsZW1lbnQub2Zmc2V0VG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3AgPSBlbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgICAgICAgIHRvcCArPSBlbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9wO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2lzVmlzaWJsZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaXNWaXNpYmxlKGJveCkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gYm94LmdldEF0dHJpYnV0ZSgnZGF0YS13b3ctb2Zmc2V0JykgfHwgdGhpcy5jb25maWcub2Zmc2V0O1xuICAgICAgICB2YXIgdmlld1RvcCA9IHRoaXMuY29uZmlnLnNjcm9sbENvbnRhaW5lciAmJiB0aGlzLmNvbmZpZy5zY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgdmFyIHZpZXdCb3R0b20gPSB2aWV3VG9wICsgTWF0aC5taW4odGhpcy5lbGVtZW50LmNsaWVudEhlaWdodCwgZ2V0SW5uZXJIZWlnaHQoKSkgLSBvZmZzZXQ7XG4gICAgICAgIHZhciB0b3AgPSB0aGlzLm9mZnNldFRvcChib3gpO1xuICAgICAgICB2YXIgYm90dG9tID0gdG9wICsgYm94LmNsaWVudEhlaWdodDtcblxuICAgICAgICByZXR1cm4gdG9wIDw9IHZpZXdCb3R0b20gJiYgYm90dG9tID49IHZpZXdUb3A7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnZGlzYWJsZWQnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuY29uZmlnLm1vYmlsZSAmJiBpc01vYmlsZShuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gV09XO1xuICB9KCk7XG5cbiAgZXhwb3J0cy5kZWZhdWx0ID0gV09XO1xuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0pO1xuIiwiaW1wb3J0IHRvZ2dsZSBmcm9tICcuL2NvbXBvbmVudHMvdG9nZ2xlJztcclxuaW1wb3J0IHNsaWRlciBmcm9tICcuL2NvbXBvbmVudHMvc2xpZGVyJztcclxuaW1wb3J0IHNjcm9sbCBmcm9tICcuL2NvbXBvbmVudHMvc2Nyb2xsJztcclxuaW1wb3J0IGxpZ2h0Ym94IGZyb20gJy4vY29tcG9uZW50cy9saWdodGJveCdcclxuaW1wb3J0IFdPVyBmcm9tICcuL2NvbXBvbmVudHMvd293J1xyXG5cclxubmV3IFdPVygpLmluaXQoKVxyXG5cclxuIl19
