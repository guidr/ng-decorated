# ng-decorated
Set of ES6 class decorators for Angular 1.5 for creating Services, Components, Directives and Inject depencencies.

## Contents

* [Installation](#installation)
* [Usage](#usage)
* [Decorators](#decorators)
  * [`@Component`](#component)
  * [`@RouteConfig`](#routeconfig)
  * [`@Directive`](#directive)
  * [`@Service`](#service)
  * [`@Inject`](#inject)
  * [`@Config`](#config)
  * [`@Run`](#run)

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

Option  | Description
--------|------------
selector | **(Required)** This is the selector string for the resulting component.
template | **(Optional)** Defines a template string for the component.

See [Angular docs for Component](https://docs.angularjs.org/guide/component) for a full list of options.

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

See [Angular docs for ComponentRouter docs](https://docs.angularjs.org/guide/component-router) for more details.

### `@Directive`
Declares an angular directive with decorated class as its controller.

Usage:

```javascript
import { Directive } from 'ng-decorated';

@Directive({
	selector: '[my-attr]'
})
class MyAttrDirective {
	link() {
		
	}
}
```

#### Directive Options

Option  | Description
--------|------------
selector | **(Required)** CSS selector to identify the HTML in the template that is associated with the directive. The CSS selector for an attribute is the attribute name in square brackets `[my-directive]` and the CSS selector for a class name is the class name prefixed with a dot `.my-directive`.
restrict | **(Do not use)** The `restrict` option will be set automatically according to the selector type. 

See [Angular docs for Directive docs](https://docs.angularjs.org/guide/directive) for more details.

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

Option  | Description
--------|------------
name | **(Required)** This is the name of the registered service.

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
