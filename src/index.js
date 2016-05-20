'use strict';

import { Component } from './decorators/component';
import { Config } from './decorators/config';
import { Directive } from './decorators/directive';
import { Inject } from './decorators/inject';
import { RouteConfig } from './decorators/route-config';
import { Run } from './decorators/run';
import { Service } from './decorators/service';

export {
    Component,
    Config,
    Directive,
    Inject,
    RouteConfig,
    Run,
    Service
};

import { module } from './module';
export default module.name;
