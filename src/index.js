'use strict';

export { Component } from './decorators/component';
export { Config } from './decorators/config';
export { Directive } from './decorators/directive';
export { Input } from './decorators/input';
export { Output } from './decorators/output';
export { Inject } from './decorators/inject';
export { RouteConfig } from './decorators/route-config';
export { Run } from './decorators/run';
export { Service } from './decorators/service';
export { HostListener } from './decorators/host-listener';
export { Pipe } from './decorators/pipe';
export { EventEmitter } from './event-emitter';

import { module } from './module';
export default module.name;
