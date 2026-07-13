import {
    KnowledgeProvider,
    KnowledgeQueryService,
    KnowledgeRegistry,
    KnowledgeSearchService,
    KnowledgeService,
    KnowledgeSession,
    KnowledgeStatisticsService,
    KnowledgeValidationService
} from "./services/index.js";

export class KnowledgeManager<T = unknown> {

    readonly provider: KnowledgeProvider<T>;

    readonly registry: KnowledgeRegistry<T>;

    readonly session: KnowledgeSession<T>;

    readonly service: KnowledgeService<T>;

    readonly query: KnowledgeQueryService<T>;

    readonly search: KnowledgeSearchService<T>;

    readonly validation: KnowledgeValidationService<T>;

    readonly statistics: KnowledgeStatisticsService<T>;

    private initialized = false;

    constructor() {

        this.provider = new KnowledgeProvider();

        this.registry = new KnowledgeRegistry();

        this.session = new KnowledgeSession(this.provider);

        this.service = new KnowledgeService(this.registry);

        this.query = new KnowledgeQueryService(this.registry);

        this.search = new KnowledgeSearchService(this.query);

        this.validation = new KnowledgeValidationService(this.query);

        this.statistics = new KnowledgeStatisticsService(this.query);

    }

    initialize(): void {

        if (this.initialized) {

            return;

        }

        this.session.clear();

        this.registry.clear();

        this.initialized = true;

    }

    dispose(): void {

        if (!this.initialized) {

            return;

        }

        this.registry.clear();

        this.session.clear();

        this.initialized = false;

    }

    isInitialized(): boolean {

        return this.initialized;

    }

    isEmpty(): boolean {

        return this.statistics.isEmpty();

    }

    getCount(): number {

        return this.statistics.getCount();

    }

}