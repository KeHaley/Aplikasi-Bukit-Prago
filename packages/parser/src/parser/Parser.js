"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var ProgramNode_1 = require("./ast/ProgramNode");
var DeclarationParser_1 = require("./declarations/DeclarationParser");
var Parser = /** @class */ (function () {
    function Parser() {
        this.declarationParser = new DeclarationParser_1.DeclarationParser();
    }
    Parser.prototype.parse = function (lines) {
        var program = new ProgramNode_1.ProgramNode();
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var text = line.text.trim();
            var node = this.declarationParser.parse(text, line.line);
            if (node) {
                program.add(node);
            }
        }
        return program;
    };
    return Parser;
}());
exports.Parser = Parser;
