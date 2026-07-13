import { CatalogArtifact } from "./CatalogArtifact.js";

export class KnowledgeCatalog {

    private readonly artifacts: CatalogArtifact[] = [];

    add(

        artifact: CatalogArtifact

    ): void {

        this.artifacts.push(artifact);

    }

    addRange(

        artifacts: CatalogArtifact[]

    ): void {

        this.artifacts.push(...artifacts);

    }

    getArtifacts(): readonly CatalogArtifact[] {

        return this.artifacts;

    }

    count(): number {

        return this.artifacts.length;

    }

}