'use strict';

import { module } from './../module';

export function Service (options) {
    return function decorator (target) {
        options = options || {};

        if (!options.name) {
            throw new Error('@Service() must contains `name` property');
        }

        module.service(options.name, target);
    };
}
