"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclarationParser = void 0;
var FunctionParser_1 = require("./FunctionParser");
var VariableParser_1 = require("./VariableParser");
var ClassParser_1 = require("./ClassParser");
var ImportParser_1 = require("./ImportParser");
var ExportParser_1 = require("./ExportParser");
var DeclarationParser = /** @class */ (function () {
    function DeclarationParser() {
        this.functionParser = new FunctionParser_1.FunctionParser();
        this.variableParser = new VariableParser_1.VariableParser();
        this.classParser = new ClassParser_1.ClassParser();
        this.importParser = new ImportParser_1.ImportParser();
        this.exportParser = new ExportParser_1.ExportParser();
    }
    DeclarationParser.prototype.parse = function (text, line) {
        var functionNode = this.functionParser.parse(text, line);
        if (functionNode) {
            return functionNode;
        }
        var variableNode = this.variableParser.parse(text, line);
        if (variableNode) {
            return variableNode;
        }
        var classNode = this.classParser.parse(text, line);
        if (classNode) {
            return classNode;
        }
        var importNode = this.importParser.parse(text, line);
        if (importNode) {
            return importNode;
        }
        var exportNode = this.exportParser.parse(text, line);
        if (exportNode) {
            return exportNode;
        }
        return null;
    };
    return DeclarationParser;
}());
exports.DeclarationParser = DeclarationParser;
