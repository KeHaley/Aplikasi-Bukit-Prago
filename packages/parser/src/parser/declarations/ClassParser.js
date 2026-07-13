"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassParser = void 0;
var ClassNode_1 = require("../ast/ClassNode");
var ClassParser = /** @class */ (function () {
    function ClassParser() {
    }
    ClassParser.prototype.parse = function (text, line) {
        if (!text.startsWith("class ")) {
            return null;
        }
        var afterKeyword = text.substring("class ".length);
        var brace = afterKeyword.indexOf("{");
        var name = brace >= 0
            ? afterKeyword.substring(0, brace).trim()
            : afterKeyword.trim();
        if (name.length === 0) {
            return null;
        }
        return new ClassNode_1.ClassNode(name, line);
    };
    return ClassParser;
}());
exports.ClassParser = ClassParser;
