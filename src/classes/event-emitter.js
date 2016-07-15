'use strict';

export class EventEmitter {
    constructor() {
        this.listeners = new Set();
    }

    addListener(callback) {
        if (!this.listeners.has(callback)) {
            this.listeners.add(callback);
        }
    }

    removeListener(callback) {
        return this.listeners.delete(callback);
    }

    emit(...args) {
        this.listeners.forEach((listener) => {
            listener(...args);
        });
    }
}
