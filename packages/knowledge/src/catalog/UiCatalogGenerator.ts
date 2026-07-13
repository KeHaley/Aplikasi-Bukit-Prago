import { CatalogArtifact } from "./CatalogArtifact.js";

export interface UiCatalogSource {

    name: string;

    type: string;

    source: string;

    description?: string;

}

export class UiCatalogGenerator {

    generate(

        components: readonly UiCatalogSource[]

    ): CatalogArtifact[] {

        return components.map(

            (component, index) =>

                new CatalogArtifact(

                    `UI-${String(index + 1).padStart(4, "0")}`,

                    component.name,

                    "UI",

                    component.source,

                    component.description ?? component.type

                )

        );

    }

}