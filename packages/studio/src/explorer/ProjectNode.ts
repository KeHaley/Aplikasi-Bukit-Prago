export class ProjectNode {

    constructor(

        public readonly name: string,

        public readonly path: string,

        public readonly extension: string,

        public readonly size: number,

        public readonly children: ProjectNode[] = []

    ) {}

    addChild(node: ProjectNode): void {

        this.children.push(node);

    }

    hasChildren(): boolean {

        return this.children.length > 0;

    }

    getChildCount(): number {

        return this.children.length;

    }

    isDirectory(): boolean {

        return this.hasChildren();

    }

    isFile(): boolean {

        return !this.hasChildren();

    }

}