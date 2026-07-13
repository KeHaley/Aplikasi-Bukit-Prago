"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionScopeFinder = void 0;
var FunctionScope_1 = require("./FunctionScope");
var FunctionScopeFinder = /** @class */ (function () {
    function FunctionScopeFinder() {
    }
    FunctionScopeFinder.prototype.find = function (lines) {
        var scopes = [];
        var currentName = "";
        var startLine = 0;
        var braceDepth = 0;
        var insideFunction = false;
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var text = line.text.trim();
            if (!insideFunction && text.startsWith("function ")) {
                var afterKeyword = text.substring("function ".length);
                var bracket = afterKeyword.indexOf("(");
                currentName =
                    bracket >= 0
                        ? afterKeyword.substring(0, bracket).trim()
                        : afterKeyword.trim();
                startLine = line.line;
                insideFunction = true;
            }
            for (var _a = 0, text_1 = text; _a < text_1.length; _a++) {
                var ch = text_1[_a];
                if (ch === "{") {
                    braceDepth++;
                }
                if (ch === "}") {
                    braceDepth--;
                    if (insideFunction && braceDepth === 0) {
                        scopes.push(new FunctionScope_1.FunctionScope(currentName, startLine, line.line));
                        insideFunction = false;
                    }
                }
            }
        }
        return scopes;
    };
    return FunctionScopeFinder;
}());
exports.FunctionScopeFinder = FunctionScopeFinder;
