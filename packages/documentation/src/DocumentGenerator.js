"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentGenerator = void 0;
var Document_js_1 = require("./Document.js");
var DocumentGenerator = /** @class */ (function () {
    function DocumentGenerator() {
    }
    DocumentGenerator.prototype.generate = function (title, content) {
        return new Document_js_1.Document(title, content);
    };
    return DocumentGenerator;
}());
exports.DocumentGenerator = DocumentGenerator;
