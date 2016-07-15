'use strict';

import { __override } from './../helpers';

const Decorators = new Map();

export function Input (alias) {
    return function decorator (target, key, descriptor) {
        const object = target.constructor;

        if (!Decorators.has(object)) {
            Decorators.set(object, new Set());

            Controller.$inject = ['$parse', '$scope', '$attrs'];
            function Controller ($parse, $scope, $attrs) {
                const inputs = Decorators.get(object);
                const watchers = [];

                inputs.forEach(({ name, property }) => {
                    const watcher = $scope.$watch(
                        () => $parse($attrs[name])($scope),
                        (value) => this[property] = value
                    );

                    watchers.push(watcher);
                });

                $scope.$on('$destroy', () => {
                    watchers.forEach((watcher) => watcher());
                });
            }

            __override(object, 'controller', Controller);
        }

        Decorators.get(object).add({
            name : alias || key,
            property : key
        });
    };
}
