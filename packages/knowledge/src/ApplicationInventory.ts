export class SourceFile {

    constructor(

        public readonly name: string,

        public readonly type: string,

        public readonly path: string

    ) {}

}

export class ApplicationInventory {

    constructor(

        public readonly sourceFiles: SourceFile[]

    ) {}

}
