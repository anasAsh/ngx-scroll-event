# Now supports Angualr 10+

# ngx-scroll-event
An Angular 2+ directive to emit an event if scroll occurs on an element or window.

## Features
- Detect scroll on an element or window and emits an event, also calculates if the user is reaching the top/bottom of that element or not.

## Install
- With NPM
```sh
npm install ngx-scroll-event --save
```

- With Yarn
```sh
yarn add ngx-scroll-event
```

## Usage
Import ScrollEvent and add it to the imports array of your module.


```typescript
// app.module.ts
import { NgxScrollEventModule } from 'ngx-scroll-event';

@NgModule({
  imports: [
    ...,
    NgxScrollEventModule,
    ...,
  ]
})
export class AppModule { }
```

In your template you may now add the `libScrollEvent` attribute and `(onscroll)` event to any element.
you can also add `[bottomOffset]` or `[topOffset]` to change when reaching bottom or top detection, bot values defaults to 100px, the value should be a number in pixels.

```typescript
// app.awesome.component.ts

...
import { NgxScrollEvent } from 'ngx-scroll-event';
...

@Component({
   ...
   template: `...
        <div libScrollEvent (onscroll)="handleScroll($event)" [bottomOffset]="200" [topOffset]="200" >
            <div>Bla bla bla</div>
            <div>Bla bla bla</div>
            <div>Bla bla bla</div>
            <div>Bla bla bla</div>
            <div>Bla bla bla</div>
            <div>Bla bla bla</div>
            <div>Bla bla bla</div>
            <div>Bla bla bla</div>
            <div>Bla bla bla</div>
        <div>
   ...`,
})
export class AwesomeComponent {
  public handleScroll(event: NgxScrollEvent) {
    console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      console.log(`the user is reaching the bottom`);
    }
    if (event.isReachingTop) {
      console.log(`the user is reaching the top`);
    }
    if (event.isWindowEvent) {
      console.log(`This event is fired on Window not on an element.`);
    }

  }
}
```



## Code scaffolding

Run `ng generate component component-name --project ngx-scroll-event` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-scroll-event`.
> Note: Don't forget to add `--project ngx-scroll-event` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-scroll-event` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-scroll-event`, go to the dist folder `cd dist/ngx-scroll-event` and run `npm publish`.

## Running unit tests

Run `ng test ngx-scroll-event` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
