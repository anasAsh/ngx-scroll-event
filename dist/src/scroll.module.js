"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var scroll_directive_1 = require("./scroll.directive");
var ScrollEventModule = /** @class */ (function () {
    function ScrollEventModule() {
    }
    ScrollEventModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        scroll_directive_1.ScrollDirective,
                    ],
                    exports: [
                        scroll_directive_1.ScrollDirective,
                    ]
                },] },
    ];
    /** @nocollapse */
    ScrollEventModule.ctorParameters = function () { return []; };
    return ScrollEventModule;
}());
exports.ScrollEventModule = ScrollEventModule;
//# sourceMappingURL=scroll.module.js.map