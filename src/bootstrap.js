/* global angular */
'use strict';

import { module } from './module';

export function bootstrap (component, otherProviders = []) {
    const app = angular.module(component, [
        module.name,
        ...otherProviders
    ]);

    app.value('$routerRootComponent', component);

    return angular.bootstrap(document, [ app.name ], {
        strictDi : true
    });
}
