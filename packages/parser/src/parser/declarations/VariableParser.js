"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableParser = void 0;
var VariableNode_1 = require("../ast/VariableNode");
var VariableParser = /** @class */ (function () {
    function VariableParser() {
    }
    VariableParser.prototype.parse = function (text, line) {
        var declarations = [
            "const",
            "let",
            "var"
        ];
        for (var _i = 0, declarations_1 = declarations; _i < declarations_1.length; _i++) {
            var declaration = declarations_1[_i];
            var prefix = declaration + " ";
            if (!text.startsWith(prefix)) {
                continue;
            }
            var afterKeyword = text.substring(prefix.length);
            var equalIndex = afterKeyword.indexOf("=");
            var variableName = equalIndex >= 0
                ? afterKeyword.substring(0, equalIndex).trim()
                : afterKeyword.trim();
            if (variableName.length === 0) {
                return null;
            }
            return new VariableNode_1.VariableNode(declaration, variableName, line);
        }
        return null;
    };
    return VariableParser;
}());
exports.VariableParser = VariableParser;
