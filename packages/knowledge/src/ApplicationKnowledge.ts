import { ApplicationModule } from "./ApplicationModule.js";
import { KnowledgeArtifact } from "./KnowledgeArtifact.js";

export class ApplicationKnowledge {

    readonly modules: ApplicationModule[] = [];

    readonly artifacts: KnowledgeArtifact[] = [];

    addModule(

        module: ApplicationModule

    ): void {

        this.modules.push(module);

    }

    addArtifact(

        artifact: KnowledgeArtifact

    ): void {

        this.artifacts.push(artifact);

    }

}