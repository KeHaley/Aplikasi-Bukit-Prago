export class DataFlowNode {

    readonly targets: string[] = [];

    constructor(

        public readonly name: string

    ) {}

    addTarget(
        target: string
    ): void {

        if (
            this.targets.includes(target)
        ) {

            return;

        }

        this.targets.push(target);

    }

}