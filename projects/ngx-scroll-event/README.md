# ngx-scroll-event

Lightweight Angular directive that emits scroll events and detects when the user is reaching the top or bottom of an element or the window.

**Angular 21** · Node.js ^20.19, ^22.12, or ≥24

---

## Features

- **Element or window scroll** — Use the same directive on a scrollable element or rely on window scroll.
- **Top/bottom detection** — Know when the user is near the top or bottom via configurable pixel offsets.
- **Standalone & NgModule** — Works with standalone components (default) or the classic module setup.
- **Typed events** — `NgxScrollEvent` includes `isReachingTop`, `isReachingBottom`, `originalEvent`, and `isWindowEvent`.

---

## Install

```bash
npm install ngx-scroll-event
```

```bash
yarn add ngx-scroll-event
```

```bash
pnpm add ngx-scroll-event
```

---

## Quick start

### Standalone (recommended)

Import the directive and add `libScrollEvent` plus the `(onscroll)` handler to any element (or the host for window scroll):

```typescript
import { NgxScrollEventDirective, NgxScrollEvent } from 'ngx-scroll-event';

@Component({
  standalone: true,
  imports: [NgxScrollEventDirective],
  template: `
    <div libScrollEvent (onscroll)="onScroll($event)">
      <!-- scrollable content -->
    </div>
  `,
})
export class MyComponent {
  onScroll(event: NgxScrollEvent) {
    if (event.isReachingBottom) console.log('Near bottom');
    if (event.isReachingTop) console.log('Near top');
    if (event.isWindowEvent) console.log('Window scroll');
  }
}
```

### NgModule

```typescript
import { NgxScrollEventModule } from 'ngx-scroll-event';

@NgModule({
  imports: [NgxScrollEventModule],
})
export class AppModule {}
```

Then in any template:

```html
<div libScrollEvent (onscroll)="onScroll($event)">...</div>
```

---

## API

### Directive: `libScrollEvent`

| Input           | Type     | Default | Description                                      |
|----------------|----------|---------|--------------------------------------------------|
| `topOffset`    | `number` | `100`   | Pixels from top to consider "reaching top".      |
| `bottomOffset` | `number` | `100`   | Pixels from bottom to consider "reaching bottom".|

| Output     | Type               | Description                    |
|------------|--------------------|--------------------------------|
| `onscroll` | `NgxScrollEvent`   | Fired on scroll (element or window). |

### Event: `NgxScrollEvent`

```ts
interface NgxScrollEvent {
  isReachingBottom: boolean;  // true when scroll is within bottomOffset of bottom
  isReachingTop: boolean;     // true when scroll is within topOffset of top
  originalEvent: Event;       // native scroll event
  isWindowEvent: boolean;     // true when the scroll target is the window
}
```

---

## Examples

### Custom offsets

```html
<div
  libScrollEvent
  (onscroll)="onScroll($event)"
  [topOffset]="50"
  [bottomOffset]="200">
  ...
</div>
```

### Infinite scroll

```typescript
onScroll(event: NgxScrollEvent) {
  if (event.isReachingBottom && !this.loading) {
    this.loading = true;
    this.loadMore().finally(() => (this.loading = false));
  }
}
```

### Window scroll (e.g. “back to top” button)

The directive listens to both the element and the window. Add it to any element (e.g. a root wrapper); in the handler, use `event.isWindowEvent` when you only care about window scroll:

```typescript
template: `<div libScrollEvent (onscroll)="onScroll($event)">...</div>`

onScroll(event: NgxScrollEvent) {
  if (event.isWindowEvent) {
    this.showBackToTop = !event.isReachingTop;
  }
}
```

---

## License

MIT · [GitHub](https://github.com/anasAsh/ngx-scroll-event)
