export interface SourceLine {
    line: number;
    text: string;
}

export class Tokenizer {

    tokenize(source: string): SourceLine[] {

        const rows = source.split(/\r?\n/);

        return rows.map((text, index) => ({
            line: index + 1,
            text
        }));

    }

}