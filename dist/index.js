(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ng-decorators", [], factory);
	else if(typeof exports === 'object')
		exports["ng-decorators"] = factory();
	else
		root["ng-decorators"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Service = exports.Run = exports.RouteConfig = exports.Inject = exports.Directive = exports.Config = exports.Component = undefined;

	var _component = __webpack_require__(1);

	var _config = __webpack_require__(3);

	var _directive = __webpack_require__(4);

	var _inject = __webpack_require__(5);

	var _routeConfig = __webpack_require__(6);

	var _run = __webpack_require__(7);

	var _service = __webpack_require__(8);

	var _module2 = __webpack_require__(2);

	exports.Component = _component.Component;
	exports.Config = _config.Config;
	exports.Directive = _directive.Directive;
	exports.Inject = _inject.Inject;
	exports.RouteConfig = _routeConfig.RouteConfig;
	exports.Run = _run.Run;
	exports.Service = _service.Service;
	exports.default = _module2.module.name;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* global angular */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Component = Component;

	var _module2 = __webpack_require__(2);

	function Component(options) {
	    return function decorator(target) {
	        options = options || {};

	        if (!options.selector) {
	            throw new Error('@Component() must contains selector property!');
	        }

	        if (!target.$componentOptions) {
	            target.$componentOptions = {};
	        }

	        angular.extend(target.$componentOptions, options, {
	            controller: target
	        });

	        _module2.module.config(['$compileProvider', function ($compileProvider) {
	            $compileProvider.component(target.$componentOptions.selector, target.$componentOptions);
	        }]);
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* global angular */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _module = angular.module('ngDecorators', []);

	exports.module = _module;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Config = Config;

	var _module2 = __webpack_require__(2);

	function Config() {
	    return function decorator(target, key, descriptor) {
	        return _module2.module.config(descriptor.value);
	    };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Directive = Directive;

	var _module2 = __webpack_require__(2);

	function Directive(options) {
	    return function decorator(target) {
	        var directiveName = options.selector;
	        var restrict = 'E';

	        if (/^\[\S+\]$/.test(directiveName)) {
	            directiveName = directiveName.replace(/^\[(\S+)\]$/, '\$1');
	            restrict = 'A';
	        } else if (/^\.\S+$/.test(directiveName)) {
	            directiveName = directiveName.replace(/^\.(\S+)$/, '\$1');
	            restrict = 'C';
	        }

	        directiveName = dashCaseToCamelCase(directiveName);

	        var instance = new target();
	        instance.restrict = restrict;

	        _module2.module.directive(directiveName, function () {
	            return instance;
	        });
	    };
	}

	function dashCaseToCamelCase(string) {
	    return string.replace(/-([a-z])/ig, function (all, letter) {
	        return letter.toUpperCase();
	    });
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Inject = Inject;
	function Inject() {
	    for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
	        dependencies[_key] = arguments[_key];
	    }

	    return function decorator(target, key, descriptor) {
	        if (descriptor) {
	            // if it's true then we injecting dependencies into function and not Class constructor
	            var fn = descriptor.value;
	            fn.$inject = dependencies;
	        } else {
	            target.$inject = dependencies;
	        }
	    };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RouteConfig = RouteConfig;
	function RouteConfig(options) {
	    return function decorator(target) {
	        if (!target.$componentOptions) {
	            target.$componentOptions = {};
	        }

	        target.$componentOptions.$routeConfig = options;
	    };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.Run = Run;

	var _module2 = __webpack_require__(2);

	function Run() {
	   return function decorator(target, key, descriptor) {
	      _module2.module.run(descriptor.value);
	   };
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Service = Service;

	var _module2 = __webpack_require__(2);

	function Service(options) {
	    return function decorator(target) {
	        options = options || {};

	        if (!options.name) {
	            throw new Error('@Service() must contains name property!');
	        }

	        _module2.module.service(options.name, target);
	    };
	}

/***/ }
/******/ ])
});
;