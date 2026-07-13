"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionNode = void 0;
var AstNode_1 = require("./AstNode");
var FunctionNode = /** @class */ (function () {
    function FunctionNode(name, line) {
        this.name = name;
        this.line = line;
        this.kind = AstNode_1.NodeKind.Function;
    }
    return FunctionNode;
}());
exports.FunctionNode = FunctionNode;
