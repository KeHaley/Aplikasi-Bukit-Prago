"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependency = void 0;
var Dependency = /** @class */ (function () {
    function Dependency(kind, from, to, line) {
        this.kind = kind;
        this.from = from;
        this.to = to;
        this.line = line;
    }
    return Dependency;
}());
exports.Dependency = Dependency;
