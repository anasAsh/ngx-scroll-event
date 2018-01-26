import { EventEmitter } from '@angular/core';
export declare type ScrollEvent = {
    isReachingBottom: boolean;
    isReachingTop: boolean;
    originalEvent: Event;
    isWindowEvent: boolean;
};
export declare class ScrollDirective {
    onScroll: EventEmitter<ScrollEvent>;
    bottomOffset: number;
    topOffset: number;
    constructor();
    scrolled($event: Event): void;
    windowScrolled($event: Event): void;
    protected windowScrollEvent($event: Event): void;
    protected elementScrollEvent($event: Event): void;
}
