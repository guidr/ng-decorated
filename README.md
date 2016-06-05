# ng-decorated
Set of ES6 decorators to write Angular 2 style code in AngularJS 1.5. 


[![NPM](https://nodei.co/npm/ng-decorated.png)](https://nodei.co/npm/ng-decorated/)

## Contents

* [Installation](#installation)
* [Usage](#usage)
* [Decorators](#decorators)
  * [`@Component`](#component)
  * [`@RouteConfig`](#routeconfig)
  * [`@Directive`](#directive)
     * [`@Input`](#input)
     * [`@Output`](#output)
     * [`@HostListener`](#hostlistener)
  * [`@Service`](#service)
  * [`@Inject`](#inject)
  * [`@Config`](#config)
  * [`@Run`](#run)
  * [`@Pipe`](#pipe)

## Installation
```
npm install ng-decorated --save-dev
```

## Usage
The decorators provided by this package work by adding metadata to your ES6 classes and loading them to Angular .

**(1)** Import `ng-decorated` into your project.

**(2)** Add `ngDecorated` to your main module's list of dependencies.

```javascript
import angular from 'angular';
import ngDecorated from 'ng-decorated';

angular.module('myApp', [ngDecorated]);
```

## Decorators

### `@Component`
Defines a component with a template and an isolated scope.

Usage:

```javascript
import { Component } from 'ng-decorated';

@Component({
  selector: 'myTest',
  template: '<h1>Hello World!</h1>'
})
class MyTestComponent { }
```

#### Component Options
> See [Angular docs for Component](https://docs.angularjs.org/guide/component) for a full list of options.

--- 

`selector`: **(Required)** This is the selector string for the resulting component.

---

`template`: **(Optional)** Defines a template string for the component.

### `@RouteConfig`
Used with `@Component` decorator to define the route config for a component.

Usage:

```javascript
import { Component, RouteConfig } from 'ng-decorated';

@Component({
  selector: 'myTest',
  template: '<h1>Hello World!</h1>'
})
@RouteConfig([
  {path: '/', name: 'Homepage', component: 'homepage', useAsDefault: true},
  {path: '/users/...', name: 'Users', component: 'users'}
])
class MyTestComponent { }
```

> See [Angular docs for ComponentRouter docs](https://docs.angularjs.org/guide/component-router) for more details.

### `@Directive`
Declares an angular directive with decorated class as its controller.

Usage:

```javascript
import { Directive, @Inject } from 'ng-decorated';

@Directive({
  selector: '[my-attr]'
})
@Inject('$element')
class MyAttrDirective {
  constructor($element) {
    this.element = $element[0];
  }
}
```

#### Directive Options


> See [Angular docs for Directive docs](https://docs.angularjs.org/guide/directive) for more details.

---

`selector`: **(Required)** CSS selector to identify the HTML in the template that is associated with the directive.  

**Examples**

* `[my-directive]`: Atributte directive (`restrict = 'A'`)
* `.my-directive`: Class directive (`restrict = 'C'`)
* `my-directive`: Element directive (`restrict = 'E'`) (PS: Consider using [`@Component`](#component))

---

`restrict`: **(Do not use)** This option will be set automatically according to the selector type. 

---

`scope`: **(Do not use)** Directives do not have isolated scopes. You need to declare your properties and use the specific decorators to define them:

#### `@Input` [Angular docs](https://angular.io/docs/ts/latest/api/core/index/Input-var.html)
Declares a data-bound input property.

Angular automatically updates data-bound properties during change detection.

`InputMetadata` takes an optional parameter that specifies the name used when instantiating a component in the template. When not provided, the name of the decorated property is used.

Usage:

```javascript
import { Directive, Inject, Input } from 'ng-decorated';

@Directive({ selector: 'my-dir' })
@Inject('$element')
class MyDirective {
  constructor($element) {
    this.el = $element[0];
  }
  
  /**
   * Markup example:
   * <my-dir bg-color="$ctrl.bgColor"></my-dir>
   */
  @Input()
  set bgColor(color) {
    this.el.style.backgroundColor = color;
  }

  /**
   * Markup example:
   * <my-dir is-bold="true"></my-dir>
   */
  @Input('isBold')
  set fontStyle(bold) {
  	this.el.style.fontWeight = bold ? 'bold' : 'normal';
  }
}
```

#### `@Output` [Angular docs](https://angular.io/docs/ts/latest/api/core/index/Output-var.html)
Declares an event-bound output property.

When an output property emits an event, an event handler attached to that event the template is invoked.

`OutputMetadata` takes an optional parameter that specifies the name used when instantiating a component in the template. When not provided, the name of the decorated property is used.

Usage:

```javascript
import { Directive, Output, EventEmitter } from 'ng-decorated';

@Directive({ selector: 'interval-dir' })
class MyDirective {
  /**
   * Markup example:
   * <interval-dir every-second="$ctrl.everySecond(param)"></interval-dir>
   */
  @Output() 
  everySecond = new EventEmitter();

  /**
   * Markup example:
   * <interval-dir every-five-seconds="$ctrl.everyFiveSecond(param1, param2)"></interval-dir>
   */  
  @Output('everyFiveSeconds') 
  five5Secs = new EventEmitter();
  
  constructor() {
    setInterval(() => this.everySecond.emit({ param: 'value' }), 1000);
    setInterval(() => this.five5Secs.emit({ param1: 'value', param2: 'another value' }), 5000);
  }  
}
```

#### `@HostListener` [Angular docs](https://angular.io/docs/ts/latest/api/core/index/HostListener-var.html)
Declares a host listener.

Angular will invoke the decorated method when the host element emits the specified event.

Usage:

```javascript
import { Directive, HostListener } from 'ng-decorated';

@Directive({ selector: '[counting]' })
class CountClicks {
  numberOfClicks = 0;
  
  /**
   * Markup example:
   * <button counting>Increment</button>
   */
  @HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
  }
}
```

---

### `@Service`
Registers a new angular service with the given name. 

Usage:

```javascript
import { Service } from 'ng-decorated';

@Service({
  name: 'myService'
})
class MyService { }
```

#### Service Options

`name`: **(Required)** This is the name of the registered service.

### `@Inject`
Defines a list services to be injected to a constructor or method.

Usage:

```javascript
import { Inject } from 'ng-decorated';

@Inject('$q', '$http')
class ExampleService {
  constructor($q, $http) {
    // services are injected to class constructor
  }
}

class AnotherService {
  @Inject('$log')
  static warnToConsole($log) {
    // services can also be injected to a method
  }
}
```

### `@Config`
Declare an angular config clause with a static method within a class.

Usage:

```javascript
import { Config } from 'ng-decorated';

class AppConfig {
  @Config()
  static configSomething() {
  
  }
}
```


### `@Run`
Declare an angular run clause with a static method within a class.

Usage:

```javascript
import { Run } from 'ng-decorated';

class AppRun {
  @Run()
  static runSomething() {
  
  }
}
```

### `@Pipe`
Declare reusable pipe function. (Called filters in Angular 1.x)

The class must declare the `transform` method.

Usage:

```javascript
import { Pipe } from 'ng-decorated';

@Pipe({ name: 'lowercase' })
class Lowercase {
  transform(value) { 
    return v.toLowerCase(); 
  }
}
```

#### Pipe Options

`name`: **(Required)** This is the name of the registered pipe.


## License

The MIT License

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.