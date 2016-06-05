'use strict';

import { __override } from './../helpers';

const Decorators = new Map();

export function HostListener (eventName, params) {
    return function decorator (target, key, descriptor) {
        const object = target.constructor;

        if (!Decorators.has(object)) {
            Decorators.set(object, new Set());

            __override(object.prototype, 'link', function (scope, element) {
                const listeners = Decorators.get(object);

                listeners.forEach(({ eventName, handler }) => {
                    element.on(eventName, handler.bind(this));
                });

                scope.$on('$destroy', () => {
                    listeners.forEach(({ eventName, handler }) => {
                        element.off(eventName, handler);
                    });
                });
            });
        }

        Decorators.get(object).add({
            eventName,
            handler : function ($event) {
                const values = [];
                if (params) {
                    params.forEach((param) => {
                        values.push(param.split('.').reduce((a, b) => a[b], { $event }));
                    });
                } else {
                    values.push($event);
                }

                descriptor.value.apply(this, values);
            }
        });
    };
}
