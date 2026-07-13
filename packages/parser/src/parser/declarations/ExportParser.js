"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportParser = void 0;
var ExportNode_1 = require("../ast/ExportNode");
var ExportParser = /** @class */ (function () {
    function ExportParser() {
    }
    ExportParser.prototype.parse = function (text, line) {
        if (!text.startsWith("export ")) {
            return null;
        }
        var afterKeyword = text.substring("export ".length).trim();
        var parts = afterKeyword.split(/\s+/);
        if (parts.length < 2) {
            return null;
        }
        var name = parts[1];
        if (name.length === 0) {
            return null;
        }
        return new ExportNode_1.ExportNode(name, line);
    };
    return ExportParser;
}());
exports.ExportParser = ExportParser;
