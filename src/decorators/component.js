'use strict';

import { module } from './../module';
import { Metastore } from './../metastore';

export const Store = new Map();

export function Component (options = {}) {
    return function decorator (target) {
        if (!options.selector) {
            throw new Error('@Component() must contains `selector` property');
        }

        let meta = Object.assign(Metastore.get(target), {
            controller : target,
            bindings : options.bindings,
            template : options.template,
            templateUrl : options.templateUrl
        });

        Metastore.set(target, meta);

        module.config(['$compileProvider', ($compileProvider) => {
            $compileProvider.component(options.selector, Metastore.get(target));
        }]);
    };
}
