'use strict';

import { module } from './../module';

export function Pipe (options) {
    return function decorator (target, key, descriptor) {
        options = options || {};

        if (!options.name) {
            throw new Error('@Pipe() must contains `name` property');
        }

        return module.filter(options.name, [
            '$injector',
            function ($injector) {
                var instance = $injector.instantiate(target);

                if (!instance.transform) {
                    throw new Error('@Pipe class must implement `transform` method');
                }

                return instance.transform.bind(instance);
            }
        ]);
    };
}
