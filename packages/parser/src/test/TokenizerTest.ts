import { SourceReader } from "../reader/SourceReader";
import { Tokenizer } from "../tokenizer/Tokenizer";

export function runTokenizerTest(filePath: string): void {

    const reader = new SourceReader();
    const tokenizer = new Tokenizer();

    const source = reader.read(filePath);

    const lines = tokenizer.tokenize(source);

    console.log("");
    console.log("========== TOKENIZER TEST ==========");
    console.log("");

    for (const line of lines) {

        console.log(
            `Line ${line.line}: ${line.text}`
        );

    }

    console.log("");
    console.log("Total Lines :", lines.length);
}