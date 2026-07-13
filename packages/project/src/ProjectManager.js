"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectManager = void 0;
var Project_js_1 = require("./Project.js");
var ProjectConfiguration_js_1 = require("./ProjectConfiguration.js");
var ProjectManager = /** @class */ (function () {
    function ProjectManager() {
    }
    ProjectManager.prototype.create = function (name) {
        return new Project_js_1.Project(name, "1.0.0");
    };
    ProjectManager.prototype.createConfiguration = function () {
        return new ProjectConfiguration_js_1.ProjectConfiguration();
    };
    return ProjectManager;
}());
exports.ProjectManager = ProjectManager;
