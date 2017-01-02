'use strict';

export function __isFunction (obj) {
    return typeof obj === 'function' || false;
}

export function __override (object, method, fn) {
    const originalFn = object[method] || function () { };

    Replacement.$inject = [
        ...(fn.$inject || []),
        ...(originalFn.$inject || [])
    ];

    function Replacement (...args) {
        let parameters = [...args];
        if (fn.$inject) {
            fn.apply(this, parameters.splice(0, fn.$inject.length));
        } else {
            fn.call(this, ...args);
        }

        return originalFn.apply(this, parameters);
    }

    object[method] = Replacement;
}

export function __getName(fn) {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = (funcNameRegex).exec((fn).toString());
    return (results && results.length > 1) ? results[1].trim() : "";
}

const DASH_TO_CAMEL_CASE_PATTERN = /-([a-z])/ig;

/**
 * Converts dash-case to camelCase
 * @param value
 * @returns {*}
 */
export function dashToCamelCase(value) {
    return value.replace(DASH_TO_CAMEL_CASE_PATTERN, (all, match) => {
        return match.toUpperCase();
    });
}
