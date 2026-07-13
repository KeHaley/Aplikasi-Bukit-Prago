"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTokenizerTest = runTokenizerTest;
var SourceReader_1 = require("../reader/SourceReader");
var Tokenizer_1 = require("../tokenizer/Tokenizer");
function runTokenizerTest(filePath) {
    var reader = new SourceReader_1.SourceReader();
    var tokenizer = new Tokenizer_1.Tokenizer();
    var source = reader.read(filePath);
    var lines = tokenizer.tokenize(source);
    console.log("");
    console.log("========== TOKENIZER TEST ==========");
    console.log("");
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        console.log("Line ".concat(line.line, ": ").concat(line.text));
    }
    console.log("");
    console.log("Total Lines :", lines.length);
}
