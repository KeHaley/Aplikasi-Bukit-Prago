"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserContext = void 0;
var ParserContext = /** @class */ (function () {
    function ParserContext(program, text, line) {
        this.program = program;
        this.text = text;
        this.line = line;
    }
    return ParserContext;
}());
exports.ParserContext = ParserContext;
