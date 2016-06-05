'use strict';

import { module } from './../module';

export function Component (options) {
    return function decorator (target) {
        options = options || {};

        if (!options.selector) {
            throw new Error('@Component() must contains `selector` property');
        }

        if (!target.$componentOptions) {
            target.$componentOptions = {};
        }

        Object.assign(target.$componentOptions, options, {
            controller : target
        });

        module.config(['$compileProvider', ($compileProvider) => {
            $compileProvider.component(target.$componentOptions.selector, target.$componentOptions);
        }]);
    };
}
