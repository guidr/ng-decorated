'use strict';

export class Metastore {

    static _map = new Map();

    static get(target) {
        return this._map.get(target) || {};
    }

    static set(target, meta) {
        this._map.set(target, meta);
    }

    static has(target) {
        return this._map.has(target);
    }

}
