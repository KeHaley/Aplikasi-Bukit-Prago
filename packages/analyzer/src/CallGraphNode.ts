export class CallGraphNode {

    readonly callees: string[] = [];

    constructor(

        public readonly name: string

    ) {}

    addCallee(name: string): void {

        if (this.callees.includes(name)) {

            return;

        }

        this.callees.push(name);

    }

}