"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableAccessCollector = void 0;
var Dependency_1 = require("./Dependency");
var DependencyKind_1 = require("./DependencyKind");
var DependencyRegistry_1 = require("./DependencyRegistry");
var FunctionScopeFinder_1 = require("./FunctionScopeFinder");
var VariableAccessCollector = /** @class */ (function () {
    function VariableAccessCollector() {
        this.scopeFinder = new FunctionScopeFinder_1.FunctionScopeFinder();
    }
    VariableAccessCollector.prototype.collect = function (lines) {
        var registry = new DependencyRegistry_1.DependencyRegistry();
        var scopes = this.scopeFinder.find(lines);
        for (var _i = 0, scopes_1 = scopes; _i < scopes_1.length; _i++) {
            var scope = scopes_1[_i];
            this.collectScope(scope, lines, registry);
        }
        return registry;
    };
    VariableAccessCollector.prototype.collectScope = function (scope, lines, registry) {
        var visited = new Set();
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (line.line < scope.startLine ||
                line.line > scope.endLine) {
                continue;
            }
            this.collectLine(scope, line, registry, visited);
        }
    };
    VariableAccessCollector.prototype.collectLine = function (scope, line, registry, visited) {
        var identifiers = this.extractIdentifiers(line.text);
        identifiers =
            this.removeDeclaredVariable(line.text, identifiers);
        for (var _i = 0, identifiers_1 = identifiers; _i < identifiers_1.length; _i++) {
            var identifier = identifiers_1[_i];
            if (this.isKeyword(identifier)) {
                continue;
            }
            if (this.isFunctionDeclaration(line.text)) {
                continue;
            }
            if (this.isFunctionCall(line.text, identifier)) {
                continue;
            }
            var key = scope.name + ":" + identifier;
            if (visited.has(key)) {
                continue;
            }
            visited.add(key);
            registry.add(new Dependency_1.Dependency(DependencyKind_1.DependencyKind.VariableAccess, scope.name, identifier, line.line));
        }
    };
    VariableAccessCollector.prototype.extractIdentifiers = function (text) {
        var matches = text.match(/[A-Za-z_$][A-Za-z0-9_$]*/g);
        if (!matches) {
            return [];
        }
        return matches;
    };
    VariableAccessCollector.prototype.isKeyword = function (value) {
        switch (value) {
            case "function":
            case "return":
            case "const":
            case "let":
            case "var":
            case "if":
            case "else":
            case "for":
            case "while":
            case "do":
            case "switch":
            case "case":
            case "break":
            case "continue":
            case "default":
            case "new":
            case "class":
            case "extends":
            case "import":
            case "export":
            case "from":
            case "await":
            case "async":
            case "try":
            case "catch":
            case "finally":
            case "throw":
            case "this":
            case "super":
            case "true":
            case "false":
            case "null":
            case "undefined":
                return true;
            default:
                return false;
        }
    };
    VariableAccessCollector.prototype.isFunctionDeclaration = function (text) {
        return text
            .trim()
            .startsWith("function ");
    };
    VariableAccessCollector.prototype.isFunctionCall = function (line, identifier) {
        return line.includes(identifier + "(");
    };
    VariableAccessCollector.prototype.removeDeclaredVariable = function (line, identifiers) {
        var match = line.match(/^\s*(const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)/);
        if (!match) {
            return identifiers;
        }
        return identifiers.filter(function (identifier) { return identifier !== match[2]; });
    };
    return VariableAccessCollector;
}());
exports.VariableAccessCollector = VariableAccessCollector;
