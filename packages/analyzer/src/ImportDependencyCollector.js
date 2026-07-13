"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportDependencyCollector = void 0;
var parser_1 = require("@bpv4/parser");
var Dependency_1 = require("./Dependency");
var DependencyKind_1 = require("./DependencyKind");
var DependencyRegistry_1 = require("./DependencyRegistry");
var ImportDependencyCollector = /** @class */ (function () {
    function ImportDependencyCollector() {
    }
    ImportDependencyCollector.prototype.collect = function (program) {
        var registry = new DependencyRegistry_1.DependencyRegistry();
        for (var _i = 0, _a = program.children; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.kind !== parser_1.NodeKind.Import) {
                continue;
            }
            var importNode = node;
            registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.Import, importNode.name, importNode.source, importNode.line));
        }
        return registry;
    };
    return ImportDependencyCollector;
}());
exports.ImportDependencyCollector = ImportDependencyCollector;
