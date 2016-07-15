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
