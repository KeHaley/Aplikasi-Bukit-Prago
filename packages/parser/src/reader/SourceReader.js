"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceReader = void 0;
var fs = require("node:fs");
var SourceReader = /** @class */ (function () {
    function SourceReader() {
    }
    SourceReader.prototype.read = function (filePath) {
        return fs.readFileSync(filePath, "utf8");
    };
    return SourceReader;
}());
exports.SourceReader = SourceReader;
