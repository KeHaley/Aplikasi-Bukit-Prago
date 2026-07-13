"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramNode = void 0;
var AstNode_1 = require("./AstNode");
var ProgramNode = /** @class */ (function () {
    function ProgramNode() {
        this.kind = AstNode_1.NodeKind.Program;
        this.line = 0;
        this.children = [];
    }
    ProgramNode.prototype.add = function (node) {
        this.children.push(node);
    };
    return ProgramNode;
}());
exports.ProgramNode = ProgramNode;
