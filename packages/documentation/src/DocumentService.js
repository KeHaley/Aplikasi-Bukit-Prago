"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
var DocumentGenerator_js_1 = require("./DocumentGenerator.js");
var DocumentService = /** @class */ (function () {
    function DocumentService() {
        this.generator = new DocumentGenerator_js_1.DocumentGenerator();
    }
    DocumentService.prototype.create = function (title, content) {
        return this.generator.generate(title, content);
    };
    DocumentService.prototype.getSummary = function (document) {
        return {
            title: document.title,
            contentLength: document.content.length,
            healthy: this.isHealthy(document)
        };
    };
    DocumentService.prototype.isHealthy = function (document) {
        return (document.title.trim().length > 0 &&
            document.content.trim().length > 0);
    };
    return DocumentService;
}());
exports.DocumentService = DocumentService;
