export class KnowledgeDocument {

    constructor(

        public readonly title: string,

        public readonly sections: readonly KnowledgeSection[]

    ) {}

}

export class KnowledgeSection {

    constructor(

        public readonly title: string,

        public readonly lines: readonly string[]

    ) {}

}