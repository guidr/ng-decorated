'use strict';

import { module } from './../module';

export function Directive (options) {
    return function decorator (target) {
        let directiveName = options.selector;
        let restrict = 'E';

        if (/^\[\S+\]$/.test(directiveName)) {
            directiveName = directiveName.replace(/^\[(\S+)\]$/, '\$1');
            restrict = 'A';
        } else if (/^\.\S+$/.test(directiveName)) {
            directiveName = directiveName.replace(/^\.(\S+)$/, '\$1');
            restrict = 'C';
        }

        directiveName = dashCaseToCamelCase(directiveName);

        const instance = new target();
        instance.restrict = restrict;

        module.directive(directiveName, () => instance);
    }
}

function dashCaseToCamelCase(string) {
    return string.replace(/-([a-z])/ig, (all, letter) => letter.toUpperCase());
}
