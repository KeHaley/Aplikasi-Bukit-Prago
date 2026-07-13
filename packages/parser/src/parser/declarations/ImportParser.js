"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportParser = void 0;
var ImportNode_1 = require("../ast/ImportNode");
var ImportParser = /** @class */ (function () {
    function ImportParser() {
    }
    ImportParser.prototype.parse = function (text, line) {
        if (!text.startsWith("import ")) {
            return null;
        }
        var fromIndex = text.indexOf(" from ");
        if (fromIndex < 0) {
            return null;
        }
        var importPart = text.substring("import ".length, fromIndex).trim();
        var sourcePart = text.substring(fromIndex + " from ".length).trim();
        var name = importPart
            .replace("{", "")
            .replace("}", "")
            .trim();
        var source = sourcePart
            .replace(/['"]/g, "")
            .replace(/;$/, "");
        if (name.length === 0 ||
            source.length === 0) {
            return null;
        }
        return new ImportNode_1.ImportNode(name, source, line);
    };
    return ImportParser;
}());
exports.ImportParser = ImportParser;
