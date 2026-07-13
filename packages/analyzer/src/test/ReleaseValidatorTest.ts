import { ReleaseValidator } from "../ReleaseValidator.js";

const validator =
    new ReleaseValidator();

validator.validate();

console.log("");
console.log("======================================");
console.log("Release Validator Test PASSED");
console.log("======================================");