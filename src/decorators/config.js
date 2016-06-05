'use strict';

import { module } from './../module';

export function Config () {
    return function decorator (target, key, descriptor) {
        return module.config(descriptor.value);
    };
}
