"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyCollector = void 0;
var Dependency_1 = require("./Dependency");
var DependencyKind_1 = require("./DependencyKind");
var DependencyRegistry_1 = require("./DependencyRegistry");
var FunctionScopeFinder_1 = require("./FunctionScopeFinder");
var DependencyCollector = /** @class */ (function () {
    function DependencyCollector() {
        this.finder = new FunctionScopeFinder_1.FunctionScopeFinder();
    }
    DependencyCollector.prototype.collect = function (lines) {
        var registry = new DependencyRegistry_1.DependencyRegistry();
        var scopes = this.finder.find(lines);
        for (var _i = 0, scopes_1 = scopes; _i < scopes_1.length; _i++) {
            var scope = scopes_1[_i];
            for (var _a = 0, lines_1 = lines; _a < lines_1.length; _a++) {
                var line = lines_1[_a];
                if (line.line < scope.startLine ||
                    line.line > scope.endLine) {
                    continue;
                }
                var text = line.text.trim();
                /*
                 * ---------------------------------------------
                 * METHOD CALL
                 * db.save()
                 * logger.info()
                 * this.render()
                 * super.render()
                 * ---------------------------------------------
                 */
                var methodMatches = text.matchAll(/\b([A-Za-z_][A-Za-z0-9_]*|this|super)\.([A-Za-z_][A-Za-z0-9_]*)\s*\(/g);
                var methodNames = new Set();
                for (var _b = 0, methodMatches_1 = methodMatches; _b < methodMatches_1.length; _b++) {
                    var match = methodMatches_1[_b];
                    var target = "".concat(match[1], ".").concat(match[2]);
                    methodNames.add(match[2]);
                    registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.MethodCall, scope.name, target, line.line));
                }
                /*
                 * ---------------------------------------------
                 * FUNCTION CALL
                 * save()
                 * update()
                 * await save()
                 * ---------------------------------------------
                 */
                var functionMatches = text.matchAll(/\b([A-Za-z_][A-Za-z0-9_]*)\s*\(/g);
                for (var _c = 0, functionMatches_1 = functionMatches; _c < functionMatches_1.length; _c++) {
                    var match = functionMatches_1[_c];
                    var target = match[1];
                    if (target === "function" ||
                        target === "if" ||
                        target === "for" ||
                        target === "while" ||
                        target === "switch" ||
                        target === "catch" ||
                        target === "return" ||
                        target === "await") {
                        continue;
                    }
                    if (target === scope.name) {
                        continue;
                    }
                    /*
                     * save pada db.save()
                     * sudah diproses sebagai MethodCall
                     */
                    if (methodNames.has(target)) {
                        continue;
                    }
                    registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.FunctionCall, scope.name, target, line.line));
                }
            }
        }
        return registry;
    };
    return DependencyCollector;
}());
exports.DependencyCollector = DependencyCollector;
