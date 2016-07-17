'use strict';

import { module } from './../module';
import { ElementRef } from './../classes/element-ref';
import { ComponentStore } from './component';
import { __getName } from './../helpers';

function __dashCaseToCamelCase (string) {
    return string.replace(/-([a-z])/ig, (all, letter) => letter.toUpperCase());
}

function __directiveInfo (selector) {
    let directiveName = selector;
    let restrict = 'E';

    if (/^\[\S+\]$/.test(directiveName)) {
        directiveName = directiveName.replace(/^\[(\S+)\]$/, '\$1');
        restrict = 'A';
    } else if (/^\.\S+$/.test(directiveName)) {
        directiveName = directiveName.replace(/^\.(\S+)$/, '\$1');
        restrict = 'C';
    }

    directiveName = __dashCaseToCamelCase(directiveName);

    return { directiveName, restrict };
}

export function Directive (options = {}) {
    return function decorator (target) {
        const { directiveName, restrict } = __directiveInfo(options.selector);

        module.config(['$compileProvider', ($compileProvider) => {
            $compileProvider.directive(directiveName, [
                '$injector',
                function ($injector) {
                    const definition = Object.assign(options, {
                        restrict,
                        scope : false, // we don't use scope at all
                        controller : function () { }, // we need to set it here, to be able to reasign later
                        compile : function ($element, ...args) {
                            const instance = $injector.instantiate(target, {
                                // custom ElementRef class
                                $element : new ElementRef($element)
                            });

                            if (target.controller) {
                                definition.controller = [
                                    '$parse', '$scope', '$attrs',
                                    ...$injector.annotate(target.controller),
                                    function ($parse, $scope, $attrs, ...injected) {
                                        // get element meta data
                                        const meta = ComponentStore.get(__getName(target));

                                        if (meta.inputs) {
                                            // set up @Input decorator
                                            const watchers = [];

                                            meta.inputs.forEach(({ name, property }) => {
                                                const watcher = $scope.$watch(
                                                    // watch for changes on attribute value
                                                    // ps: we parse the element because we don't use scope, just reading the attribute value
                                                    () => $parse($attrs[name])($scope),
                                                    // set the value on the class instance
                                                    (value) => instance[property] = value
                                                );

                                                watchers.push(watcher);
                                            });

                                            $scope.$on('$destroy', () => {
                                                // removes all watcher attached to the scope
                                                watchers.forEach((watcher) => watcher());
                                            });
                                        }

                                        // TODO: set up @Output decorator here
                                        // TODO: set up @HostListener decorator here

                                        target.controller.call(instance, ...injected);
                                    }
                                ];
                            }

                            if (instance.compile) {
                                // if user has implemented compile function, call it and return
                                return instance.compile.apply(instance, [...args]);
                            }

                            return (...args) => {
                                if (instance.link) {
                                    // if user has implemented link function, call it
                                    instance.link.call(instance, ...args);
                                }
                            };
                        }
                    });

                    return definition;
                }
            ]);
        }]);
    }
}
