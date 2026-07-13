"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyKind = void 0;
var DependencyKind;
(function (DependencyKind) {
    DependencyKind["FunctionCall"] = "FunctionCall";
    DependencyKind["MethodCall"] = "MethodCall";
    DependencyKind["VariableAccess"] = "VariableAccess";
    DependencyKind["Import"] = "Import";
})(DependencyKind || (exports.DependencyKind = DependencyKind = {}));
