export interface WorkspaceKnowledge {

    id: string;

    type: string;

    name: string;

}

export class WorkspaceKnowledgeProvider {

    private readonly knowledge: WorkspaceKnowledge[] = [];

    add(

        item: WorkspaceKnowledge

    ): void {

        this.knowledge.push(item);

    }

    addRange(

        items: readonly WorkspaceKnowledge[]

    ): void {

        this.knowledge.push(...items);

    }

    getAll(): readonly WorkspaceKnowledge[] {

        return this.knowledge;

    }

    clear(): void {

        this.knowledge.length = 0;

    }

}