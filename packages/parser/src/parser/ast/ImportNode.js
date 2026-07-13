"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportNode = void 0;
var AstNode_1 = require("./AstNode");
var ImportNode = /** @class */ (function () {
    function ImportNode(name, source, line) {
        this.name = name;
        this.source = source;
        this.line = line;
        this.kind = AstNode_1.NodeKind.Import;
    }
    return ImportNode;
}());
exports.ImportNode = ImportNode;
