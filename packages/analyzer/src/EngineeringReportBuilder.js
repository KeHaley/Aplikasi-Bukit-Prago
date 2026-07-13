"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineeringReportBuilder = void 0;
var EngineeringReport_1 = require("./EngineeringReport");
var EngineeringReportBuilder = /** @class */ (function () {
    function EngineeringReportBuilder() {
    }
    EngineeringReportBuilder.prototype.build = function (knowledge) {
        return new EngineeringReport_1.EngineeringReport(knowledge);
    };
    return EngineeringReportBuilder;
}());
exports.EngineeringReportBuilder = EngineeringReportBuilder;
