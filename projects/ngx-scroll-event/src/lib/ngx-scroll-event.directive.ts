import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

export type NgxScrollEvent = {
  isReachingBottom: boolean,
  isReachingTop: boolean,
  originalEvent: Event,
  isWindowEvent: boolean
};

declare const window: Window;

@Directive({
  selector: '[libScrollEvent]'
})
export class NgxScrollEventDirective {
  @Output() public onscroll = new EventEmitter<NgxScrollEvent>();
  @Input() public bottomOffset = 100;
  @Input() public topOffset = 100;

  constructor() { }

  // handle host scroll
  @HostListener('scroll', ['$event']) public scrolled($event: Event): void {
    this.elementScrollEvent($event);
  }

  // handle window scroll
  @HostListener('window:scroll', ['$event']) public windowScrolled($event: Event): void {
    this.windowScrollEvent($event);
  }

  protected windowScrollEvent($event: Event): void {
    const target = $event.target as Document;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const isReachingTop = scrollTop < this.topOffset;
    const isReachingBottom = ( target.body.offsetHeight - (window.innerHeight + scrollTop) ) < this.bottomOffset;
    const emitValue: NgxScrollEvent = {isReachingBottom, isReachingTop, originalEvent: $event, isWindowEvent: true};
    this.onscroll.emit(emitValue);
  }

  protected elementScrollEvent($event: Event): void {
    const target = $event.target as HTMLElement;
    const scrollPosition = target.scrollHeight - target.scrollTop;
    const offsetHeight = target.offsetHeight;
    const isReachingTop = target.scrollTop < this.topOffset;
    const isReachingBottom = (scrollPosition - offsetHeight) < this.bottomOffset;
    const emitValue: NgxScrollEvent = {isReachingBottom, isReachingTop, originalEvent: $event, isWindowEvent: false};
    this.onscroll.emit(emitValue);
  }

}
