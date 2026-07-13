"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolCollector = void 0;
var AstNode_1 = require("../../parser/src/parser/ast/AstNode");
var SymbolRegistry_1 = require("./SymbolRegistry");
var Symbol_1 = require("./Symbol");
var SymbolKind_1 = require("./SymbolKind");
var SymbolCollector = /** @class */ (function () {
    function SymbolCollector() {
    }
    SymbolCollector.prototype.collect = function (program) {
        var registry = new SymbolRegistry_1.SymbolRegistry();
        for (var _i = 0, _a = program.children; _i < _a.length; _i++) {
            var node = _a[_i];
            switch (node.kind) {
                case AstNode_1.NodeKind.Function: {
                    var functionNode = node;
                    registry.add(new Symbol_1.Symbol(SymbolKind_1.SymbolKind.Function, functionNode.name, functionNode.line));
                    break;
                }
                case AstNode_1.NodeKind.Variable: {
                    var variableNode = node;
                    registry.add(new Symbol_1.Symbol(SymbolKind_1.SymbolKind.Variable, variableNode.name, variableNode.line));
                    break;
                }
                case AstNode_1.NodeKind.Class: {
                    var classNode = node;
                    registry.add(new Symbol_1.Symbol(SymbolKind_1.SymbolKind.Class, classNode.name, classNode.line));
                    break;
                }
                case AstNode_1.NodeKind.Import: {
                    var importNode = node;
                    registry.add(new Symbol_1.Symbol(SymbolKind_1.SymbolKind.Import, importNode.name, importNode.line));
                    break;
                }
                case AstNode_1.NodeKind.Export: {
                    var exportNode = node;
                    registry.add(new Symbol_1.Symbol(SymbolKind_1.SymbolKind.Export, exportNode.name, exportNode.line));
                    break;
                }
            }
        }
        return registry;
    };
    return SymbolCollector;
}());
exports.SymbolCollector = SymbolCollector;
