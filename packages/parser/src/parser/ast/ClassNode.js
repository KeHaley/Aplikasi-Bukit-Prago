"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassNode = void 0;
var AstNode_1 = require("./AstNode");
var ClassNode = /** @class */ (function () {
    function ClassNode(name, line) {
        this.name = name;
        this.line = line;
        this.kind = AstNode_1.NodeKind.Class;
    }
    return ClassNode;
}());
exports.ClassNode = ClassNode;
