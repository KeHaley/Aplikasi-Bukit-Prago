"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineeringReport = void 0;
var EngineeringReport = /** @class */ (function () {
    function EngineeringReport(knowledge) {
        this.title =
            "BPV4 Engineering Report";
        this.generatedAt =
            new Date();
        this.dependencyCount =
            knowledge.dependencyCount();
        this.callGraphCount =
            knowledge.callGraphCount();
        this.crossFileCount =
            knowledge.crossFileCount();
        this.dataFlowCount =
            knowledge.dataFlowCount();
    }
    return EngineeringReport;
}());
exports.EngineeringReport = EngineeringReport;
