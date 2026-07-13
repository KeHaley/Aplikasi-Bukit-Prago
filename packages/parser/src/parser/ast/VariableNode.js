"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableNode = void 0;
var AstNode_1 = require("./AstNode");
var VariableNode = /** @class */ (function () {
    function VariableNode(declaration, name, line) {
        this.declaration = declaration;
        this.name = name;
        this.line = line;
        this.kind = AstNode_1.NodeKind.Variable;
    }
    return VariableNode;
}());
exports.VariableNode = VariableNode;
