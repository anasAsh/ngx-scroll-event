import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

export type ScrollEvent = {
  originalEvent: Event,
  isReachingBottom: boolean,
  isWindowEvent: boolean
};

declare const window: Window;

@Directive({
  selector: '[detect-scroll]'
})
export class ScrollDirective {
  @Output() public onScroll = new EventEmitter<ScrollEvent>();
  @Input() public bottomOffest: number = 100;

  constructor() { }

  // handle host scroll
  @HostListener('scroll', ['$event']) public scrolled($event: Event) {
    this.elementScrollEvent($event);
  }

  // handle window scroll
  @HostListener('window:scroll', ['$event']) public windowScrolled($event: Event) {
    this.windowScrollEvent($event);
  }

  protected windowScrollEvent($event: Event) {
    const target = <Document>$event.target;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const isReachingBottom = ( target.body.offsetHeight - (window.innerHeight + scrollTop) ) < this.bottomOffest;
    const emitValue: ScrollEvent = {isReachingBottom, originalEvent: $event, isWindowEvent: true};
    this.onScroll.emit(emitValue);
  }

  protected elementScrollEvent($event: Event) {
    const target = <HTMLElement>$event.target;
    const scrollPosition = target.scrollHeight - target.scrollTop;
    const offsetHeight = target.offsetHeight;
    const isReachingBottom = (scrollPosition - offsetHeight) < this.bottomOffest;
    const emitValue: ScrollEvent = {isReachingBottom, originalEvent: $event, isWindowEvent: false};
    this.onScroll.emit(emitValue);
  }

}
