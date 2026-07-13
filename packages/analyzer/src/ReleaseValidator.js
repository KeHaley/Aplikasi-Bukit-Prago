"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseValidator = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var ReleaseValidator = /** @class */ (function () {
    function ReleaseValidator() {
    }
    ReleaseValidator.prototype.validate = function () {
        this.requireFile("index.js");
        this.requireFile("index.d.ts");
    };
    ReleaseValidator.prototype.requireFile = function (fileName) {
        var file = (0, path_1.join)(__dirname, fileName);
        if (!(0, fs_1.existsSync)(file)) {
            throw new Error("Release file tidak ditemukan: ".concat(fileName));
        }
    };
    return ReleaseValidator;
}());
exports.ReleaseValidator = ReleaseValidator;
