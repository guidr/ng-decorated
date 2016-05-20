'use strict';

export function Inject (...dependencies) {
    return function decorator (target, key, descriptor) {
        if (descriptor) {
            // if it's true then we injecting dependencies into function and not Class constructor
            const fn = descriptor.value;
            fn.$inject = dependencies;
        } else {
            target.$inject = dependencies;
        }
    };
}
