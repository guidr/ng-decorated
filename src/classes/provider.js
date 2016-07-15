'use strict';

import { module } from './../module';

export class Provider {

    constructor(token, options) {
        const { useClass, useValue, useConstant, useFactory } = options;

        if (!useClass && !useValue && !useConstant && !useFactory) {
          throw new Error(`new Provider(${token}) Error: No usage provided (i.e. useClass, useValue, useConstant, useFactory)`);
        }

        const type = Object.keys(options).find((key) => key.startsWith('use') && key !== undefined);

        switch (type) {
            case 'useValue' :
                module.value(token, useValue);
                break;
            case 'useConstant' :
                module.constant(token, useConstant);
                break;
            case 'useClass' :
                module.service(token, useClass);
                break;
            case 'useFactory' :
                module.factory(token, useFactory);
                break;
        }
    }
}

export function provide (token, options) {
    return new Provider(token, options);
}
