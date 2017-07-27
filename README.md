# ng2-scroll-event
An Angular 2 directive to emit an event if scroll occurs on an element or window.

## Features
- Detect scroll on an element or window and emits an event, also calculates if the user is reaching the bottom of that element or not.

## Install
```sh
npm install ng2-scroll-event --save
```
## Usage
Import ScrollEvent and add it to the imports array of your module.


```typescript
// app.module.ts
import { ScrollEvent } from 'ng2-scroll-event';

@NgModule({
  imports: [
    ....,
    ScrollEvent.forRoot(),
  ]
})
export class AppModule { }
```


In your template you may now add the `detect-scroll` attribute and `(onScroll)` event to any element.
you can also add `[bottomOffest]` to change when reaching bottom is alert is true, defaults to 100, the value should be a number in pixels.

```typescript
// app.awesome.component.ts
@Component({
   ...
   template: `...
        <div detect-scroll (onScroll)="handleScroll($event)" [bottomOffest]="200">
            <section>Bla bla bla</section>
            <section>Bla bla bla</section>
            <section>Bla bla bla</section>
            <section>Bla bla bla</section>
            <section>Bla bla bla</section>
            <section>Bla bla bla</section>
            <section>Bla bla bla</section>
            <section>Bla bla bla</section>
            <section>Bla bla bla</section>
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
      console.log(`This event is hapening on Window not on an element.`);
    }

  }
}
```

