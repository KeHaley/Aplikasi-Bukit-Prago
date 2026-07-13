import { CatalogArtifact } from "./CatalogArtifact.js";

export interface DataCatalogSource {

    name: string;

    type: string;

    source: string;

    description?: string;

}

export class DataCatalogGenerator {

    generate(

        datasets: readonly DataCatalogSource[]

    ): CatalogArtifact[] {

        return datasets.map(

            (dataset, index) =>

                new CatalogArtifact(

                    `DATA-${String(index + 1).padStart(4, "0")}`,

                    dataset.name,

                    "Data",

                    dataset.source,

                    dataset.description ?? dataset.type

                )

        );

    }

}