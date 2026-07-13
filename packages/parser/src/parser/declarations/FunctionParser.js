"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionParser = void 0;
var FunctionNode_1 = require("../ast/FunctionNode");
var FunctionParser = /** @class */ (function () {
    function FunctionParser() {
    }
    FunctionParser.prototype.isFunction = function (text) {
        return text.startsWith("function ");
    };
    FunctionParser.prototype.parse = function (text, line) {
        if (!this.isFunction(text)) {
            return null;
        }
        var afterKeyword = text.substring("function ".length);
        var openParen = afterKeyword.indexOf("(");
        if (openParen < 0) {
            return null;
        }
        var name = afterKeyword.substring(0, openParen).trim();
        if (name.length === 0) {
            return null;
        }
        return new FunctionNode_1.FunctionNode(name, line);
    };
    return FunctionParser;
}());
exports.FunctionParser = FunctionParser;
