'use strict';

export class ElementRef {

    constructor(element) {
        Object.assign(this, element);
    }

    get nativeElement() {
        return this[0];
    }

}
