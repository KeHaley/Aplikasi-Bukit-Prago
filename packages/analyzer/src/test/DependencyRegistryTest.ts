import { Tokenizer } from "@bpv4/parser";
import { DependencyCollector } from "../DependencyCollector.js";

const tokenizer = new Tokenizer();
const collector = new DependencyCollector();

const source = `
function savePanen() {

    simpan();

    db.save();

    logger.info();

    await updateStock();

    this.calculate();

    super.render();

}

function login() {

    validateUser();

    createSession();

}
`;

const lines = tokenizer.tokenize(source);

const registry = collector.collect(lines);

if (registry.count() !== 8) {
    throw new Error(
        `Dependency harus berjumlah 8, tetapi ditemukan ${registry.count()}`
    );
}

console.log("");
console.log("======================================");
console.log("Dependency Registry Test PASSED");
console.log("======================================");

for (const dependency of registry.getAll()) {

    console.log(
        `${dependency.kind} | ${dependency.from} -> ${dependency.to} (line ${dependency.line})`
    );

}