'use strict';

import { ComponentStore } from './component';
import { __getName } from './../helpers';

export function RouteConfig (options) {
    return function decorator (target) {
        ComponentStore
            .get(__getName(target))
            .assign({
                $routeConfig : options
            });
    }
}
