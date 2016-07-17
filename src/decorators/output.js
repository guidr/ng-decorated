'use strict';

import { __override } from './../helpers';

const Decorators = new Map();

export function Output (alias) {
    return function decorator (target, key, descriptor) {
        const object = target.constructor;

        if (!Decorators.has(object)) {
            Decorators.set(object, new Set());

            Controller.$inject = ['$parse', '$scope', '$attrs'];
            function Controller ($parse, $scope, $attrs) {
                const listeners = Decorators.get(object);
                const observables = [];

                listeners.forEach(({ name, property }) => {
                    const handler = (args) => {
                        // TODO: needs to find a way to send the parameters as variables and not as an object
                        // emitter.emit($val1, $val2) and not emitter.emit({$val1: 1, $val2: 2})
                        const fn = $parse($attrs[name]);
                        fn($scope, args);
                    };

                    this[property].addListener(handler);
                    observables.push({ emitter : property, handler });
                });

                $scope.$on('$destroy', () => {
                    observables.forEach(({ emitter, handler }) => {
                        this[emitter].removeListener(handler);
                    });
                });
            }

            __override(object, 'controller', Controller);
        }

        Decorators.get(object).add({
            name : alias || key,
            property : key
        });
    }
}
