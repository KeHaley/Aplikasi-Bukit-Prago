"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyRegistry = void 0;
var DependencyRegistry = /** @class */ (function () {
    function DependencyRegistry() {
        this.dependencies = [];
    }
    DependencyRegistry.prototype.add = function (dependency) {
        this.dependencies.push(dependency);
    };
    DependencyRegistry.prototype.getAll = function () {
        return this.dependencies;
    };
    DependencyRegistry.prototype.count = function () {
        return this.dependencies.length;
    };
    return DependencyRegistry;
}());
exports.DependencyRegistry = DependencyRegistry;
