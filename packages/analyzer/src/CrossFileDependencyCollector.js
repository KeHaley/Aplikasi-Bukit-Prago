"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossFileDependencyCollector = void 0;
var CrossFileDependency_1 = require("./CrossFileDependency");
var DependencyKind_1 = require("./DependencyKind");
var CrossFileDependencyCollector = /** @class */ (function () {
    function CrossFileDependencyCollector() {
        this.dependencies = [];
    }
    CrossFileDependencyCollector.prototype.collect = function (registry) {
        for (var _i = 0, _a = registry.getAll(); _i < _a.length; _i++) {
            var dependency = _a[_i];
            if (dependency.kind !== DependencyKind_1.DependencyKind.Import) {
                continue;
            }
            this.dependencies.push(new CrossFileDependency_1.CrossFileDependency(dependency.from, dependency.to));
        }
        return registry;
    };
    CrossFileDependencyCollector.prototype.getAll = function () {
        return this.dependencies;
    };
    return CrossFileDependencyCollector;
}());
exports.CrossFileDependencyCollector = CrossFileDependencyCollector;
