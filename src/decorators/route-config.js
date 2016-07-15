'use strict';

import { Metastore } from './../metastore';

export function RouteConfig (options) {
    return function decorator (target) {

        let meta = Object.assign(Metastore.get(target), {
            $routeConfig : options
        });

        Metastore.set(target, meta);
    }
}
