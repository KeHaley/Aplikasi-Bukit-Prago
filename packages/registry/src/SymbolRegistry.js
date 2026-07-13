"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolRegistry = void 0;
var SymbolRegistry = /** @class */ (function () {
    function SymbolRegistry() {
        this.symbols = [];
    }
    SymbolRegistry.prototype.add = function (symbol) {
        this.symbols.push(symbol);
    };
    SymbolRegistry.prototype.getAll = function () {
        return this.symbols;
    };
    SymbolRegistry.prototype.count = function () {
        return this.symbols.length;
    };
    return SymbolRegistry;
}());
exports.SymbolRegistry = SymbolRegistry;
