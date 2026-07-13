export interface WorkspaceDocument {

    id: string;

    title: string;

    path: string;

}

export class WorkspaceDocumentProvider {

    private readonly documents: WorkspaceDocument[] = [];

    add(

        document: WorkspaceDocument

    ): void {

        this.documents.push(document);

    }

    addRange(

        documents: readonly WorkspaceDocument[]

    ): void {

        this.documents.push(...documents);

    }

    getAll(): readonly WorkspaceDocument[] {

        return this.documents;

    }

    findById(

        id: string

    ): WorkspaceDocument | undefined {

        return this.documents.find(

            document => document.id === id

        );

    }

    clear(): void {

        this.documents.length = 0;

    }

}