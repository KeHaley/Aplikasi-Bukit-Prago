import { CatalogArtifact } from "./CatalogArtifact.js";

export interface ApiCatalogSource {

    name: string;

    method: string;

    path: string;

    description?: string;

}

export class ApiCatalogGenerator {

    generate(

        apis: readonly ApiCatalogSource[]

    ): CatalogArtifact[] {

        return apis.map(

            (api, index) =>

                new CatalogArtifact(

                    `API-${String(index + 1).padStart(4, "0")}`,

                    api.name,

                    "API",

                    `${api.method} ${api.path}`,

                    api.description ?? ""

                )

        );

    }

}