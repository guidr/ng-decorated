'use strict';

import { __getName } from './../helpers';
import { ComponentStore } from './component';

export function Input (alias) {
    return function decorator (target, key, descriptor) {
        ComponentStore
            .get(__getName(target.constructor))
            .push('inputs', {
                name : alias || key,
                property : key
            });
    };
}
