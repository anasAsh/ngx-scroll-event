"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ScrollDirective = /** @class */ (function () {
    function ScrollDirective() {
        this.onScroll = new core_1.EventEmitter();
        this.bottomOffset = 100;
        this.topOffset = 100;
    }
    // handle host scroll
    ScrollDirective.prototype.scrolled = 
    // handle host scroll
    function ($event) {
        this.elementScrollEvent($event);
    };
    // handle window scroll
    ScrollDirective.prototype.windowScrolled = 
    // handle window scroll
    function ($event) {
        this.windowScrollEvent($event);
    };
    ScrollDirective.prototype.windowScrollEvent = function ($event) {
        var target = $event.target;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var isReachingTop = scrollTop < this.topOffset;
        var isReachingBottom = (target.body.offsetHeight - (window.innerHeight + scrollTop)) < this.bottomOffset;
        var emitValue = { isReachingBottom: isReachingBottom, isReachingTop: isReachingTop, originalEvent: $event, isWindowEvent: true };
        this.onScroll.emit(emitValue);
    };
    ScrollDirective.prototype.elementScrollEvent = function ($event) {
        var target = $event.target;
        var scrollPosition = target.scrollHeight - target.scrollTop;
        var offsetHeight = target.offsetHeight;
        var isReachingTop = scrollPosition < this.topOffset;
        var isReachingBottom = (scrollPosition - offsetHeight) < this.bottomOffset;
        var emitValue = { isReachingBottom: isReachingBottom, isReachingTop: isReachingTop, originalEvent: $event, isWindowEvent: false };
        this.onScroll.emit(emitValue);
    };
    ScrollDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[detectScroll]'
                },] },
    ];
    /** @nocollapse */
    ScrollDirective.ctorParameters = function () { return []; };
    ScrollDirective.propDecorators = {
        "onScroll": [{ type: core_1.Output },],
        "bottomOffset": [{ type: core_1.Input },],
        "topOffset": [{ type: core_1.Input },],
        "scrolled": [{ type: core_1.HostListener, args: ['scroll', ['$event'],] },],
        "windowScrolled": [{ type: core_1.HostListener, args: ['window:scroll', ['$event'],] },],
    };
    return ScrollDirective;
}());
exports.ScrollDirective = ScrollDirective;
//# sourceMappingURL=scroll.directive.js.map