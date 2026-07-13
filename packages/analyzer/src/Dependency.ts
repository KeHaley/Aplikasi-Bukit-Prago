import { DependencyKind } from "./DependencyKind.js";

export class Dependency {

    constructor(

        public readonly kind: DependencyKind,

        public readonly from: string,

        public readonly to: string,

        public readonly line: number

    ) {}

}