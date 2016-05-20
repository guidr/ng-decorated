'use strict';

import { module } from './../module';

export function Run () {
    return function decorator (target, key, descriptor) {
       module.run(descriptor.value);
    };
}
