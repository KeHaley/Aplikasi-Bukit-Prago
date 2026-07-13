"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
var Tokenizer = /** @class */ (function () {
    function Tokenizer() {
    }
    Tokenizer.prototype.tokenize = function (source) {
        var rows = source.split(/\r?\n/);
        return rows.map(function (text, index) { return ({
            line: index + 1,
            text: text
        }); });
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
