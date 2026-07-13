"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportNode = void 0;
var AstNode_1 = require("./AstNode");
var ExportNode = /** @class */ (function () {
    function ExportNode(name, line) {
        this.name = name;
        this.line = line;
        this.kind = AstNode_1.NodeKind.Export;
    }
    return ExportNode;
}());
exports.ExportNode = ExportNode;
