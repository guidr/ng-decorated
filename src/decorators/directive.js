'use strict';

import { module } from './../module';
import { ElementRef } from './../classes/element-ref';

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

export function Directive (options) {
    return function decorator (target) {
        const { directiveName, restrict } = __directiveInfo(options.selector);

        module.config(['$compileProvider', ($compileProvider) => {
            $compileProvider.directive(directiveName, [
                '$injector',
                function ($injector) {
                    const definition = Object.assign(options, {
                        restrict,
                        scope : false,
                        controller : function () { }, // we need to set it here, to be able to reasign later
                        compile : function ($element, ...args) {
                            const instance = $injector.instantiate(target, {
                                // custom ElementRef class
                                $element : new ElementRef($element)
                            });

                            if (target.controller) {
                                definition.controller = [
                                    ...$injector.annotate(target.controller),
                                    function (...injected) {
                                        target.controller.call(instance, ...injected);
                                    }
                                ];
                            }

                            if (instance.compile) {
                                return instance.compile.apply(instance, [...args]);
                            }

                            return (...args) => {
                                if (instance.link) {
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
