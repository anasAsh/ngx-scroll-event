# ngx-scroll-event
An Angular 2+ directive to emit an event if scroll occurs on an element or window.

## Features
- Detect scroll on an element or window and emits an event, also calculates if the user is reaching the bottom of that element or not.

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
import { ScrollEventModule } from 'ngx-scroll-event';

@NgModule({
  imports: [
    ...,
    ScrollEventModule,
    ...,
  ]
})
export class AppModule { }
```

In your template you may now add the `detect-scroll` attribute and `(onScroll)` event to any element.
you can also add `[bottomOffest]` to change when reaching bottom is alert is true, defaults to 100, the value should be a number in pixels.

```typescript
// app.awesome.component.ts

...
import { ScrollEvent } from 'ngx-scroll-event';
...

@Component({
   ...
   template: `...
        <div detect-scroll (onScroll)="handleScroll($event)" [bottomOffest]="200">
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
  public handleScroll(event: ScrollEvent) {
    console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      console.log(`the user is reaching the bottom`);
    }
    if (event.isWindowEvent) {
      console.log(`This event is fired on Window not on an element.`);
    }

  }
}
```
