'use strict';

export function RouteConfig (options) {
    return function decorator (target) {
        if (!target.$componentOptions) {
            target.$componentOptions = {};
        }

        target.$componentOptions.$routeConfig = options;
    }
}
