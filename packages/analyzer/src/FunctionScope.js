"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionScope = void 0;
var FunctionScope = /** @class */ (function () {
    function FunctionScope(name, startLine, endLine) {
        this.name = name;
        this.startLine = startLine;
        this.endLine = endLine;
    }
    return FunctionScope;
}());
exports.FunctionScope = FunctionScope;
