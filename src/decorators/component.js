'use strict';

import { module } from './../module';
import { __getName, __override, dashToCamelCase } from './../helpers';

export function Component (options = {}) {
    return function decorator (target) {
        if (!options.selector) {
            throw new Error('@Component() must contains `selector` property');
        }

        // convert to camelCase in case selector is in kebab-case
        const selector = options.selector.indexOf('-') > -1 ? dashToCamelCase(options.selector) : options.selector;

        /**
         * Watch for changes on bindings and set the value to the correct
         * class property in case the user sets an alias for the binding.
         *
         * E.g. @Input('myAlias') myProperty;
         */
        __override(target.prototype, '$onChanges', function (obj) {
            const meta = ComponentStore.get(__getName(target));
            if (meta.inputs) {
                meta.inputs.forEach(({ name, property }) => {
                    if (name !== property && obj[name]) {
                        this[property] = obj[name].currentValue;
                    }
                });
            }
        });

        ComponentStore
            .get(__getName(target))
            .assign({
                controller : target,
                bindings : {}, // set as empty as it will be populated via @Input decorator
                template : options.template,
                templateUrl : options.templateUrl
            });

        module.config(['$compileProvider', ($compileProvider) => {
            const meta = ComponentStore.get(__getName(target));
            if (meta.inputs) {
                // set component bindings
                meta.inputs.forEach(({ name, property }) => {
                    meta.bindings[name] = '<';
                });
            }

            $compileProvider.component(selector, meta);
        }]);
    };
}

// TODO: move to a separate file
// WORK IN PROGRESS
class DecoratedComponent {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    assign(data) {
        Object.assign(this, data);
        return this;
    }
    push(property, value) {
        if(!this[property]) {
            this[property] = new Set();
        }

        this[property].add(value);
    }
}
const Store = new Map();
export class ComponentStore {
    static get(name) {
        let cmp = Store.get(name);
        if (!cmp) {
            cmp = new DecoratedComponent(name);
            Store.set(name, cmp);
        }

        return cmp;
    }
}
