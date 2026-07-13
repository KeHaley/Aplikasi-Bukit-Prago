import { EditorManager } from "./EditorManager.js";
import { EditorTabs } from "./EditorTabs.js";
import { FileViewer, OpenFile } from "./FileViewer.js";
import {
    KnowledgeManager,
    KnowledgeWorkspace
} from "./knowledge/index.js";
import { LayoutModel } from "./LayoutModel.js";
import { NavigationModel } from "./NavigationModel.js";
import { View } from "./View.js";
import { ViewHost } from "./ViewHost.js";
import { ViewRegistry } from "./ViewRegistry.js";

import {
    ExplorerProject,
    ProjectExplorer
} from "./explorer/index.js";



export class Workbench {

    private readonly navigation: NavigationModel;

    private readonly layouts: LayoutModel;

    private readonly views: ViewRegistry;

    private readonly viewHost: ViewHost;

    private readonly fileViewer: FileViewer;

    private readonly editors: EditorManager;

    private readonly tabs: EditorTabs;

    private readonly knowledge: KnowledgeManager;

    private readonly knowledgeWorkspace: KnowledgeWorkspace;


    private explorer?: ProjectExplorer;

    private initialized = false;

    constructor() {

        this.navigation = new NavigationModel();

        this.layouts = new LayoutModel();

        this.views = new ViewRegistry();

        this.viewHost = new ViewHost();

        this.fileViewer = new FileViewer();

        this.editors = new EditorManager();

        this.tabs = new EditorTabs();

        this.knowledge = new KnowledgeManager();

        this.knowledgeWorkspace =
            new KnowledgeWorkspace(this.knowledge);

    }

    initialize(): void {

    if (this.initialized) {

        return;

    }

    this.knowledgeWorkspace.initialize();

    this.initialized = true;

}

    dispose(): void {

    if (!this.initialized) {

        return;

    }

    this.clearActiveView();

    this.editors.clear();

    this.tabs.clear();

    this.views.clear();

    this.knowledgeWorkspace.dispose();

    this.initialized = false;

}

    isInitialized(): boolean {

        return this.initialized;

    }

    isDisposed(): boolean {

        return !this.initialized;

    }

    isReady(): boolean {

        return this.initialized;

    }

    loadProject(project: ExplorerProject): void {

        this.explorer = new ProjectExplorer(project);

    }

    hasProject(): boolean {

        return this.explorer !== undefined;

    }

    getProjectExplorer(): ProjectExplorer | undefined {

        return this.explorer;

    }

    openFile(file: OpenFile): void {

        const view = this.fileViewer.open(file);

        this.registerView(view);

        this.editors.open(view);

        this.tabs.add(view.id);

        this.viewHost.setActiveView(view);

        this.explorer?.select(file.path);

    }

    registerView(view: View): void {

        this.views.register(view);

    }

    unregisterView(id: string): boolean {

        if (!this.views.remove(id)) {

            return false;

        }

        this.tabs.remove(id);

        this.editors.close(id);

        if (this.viewHost.isActive(id)) {

            const active = this.editors.getActive();

            if (active) {

                this.viewHost.setActiveView(active);

                this.explorer?.select(active.id);

            } else {

                this.viewHost.clear();

                this.explorer?.clearSelection();

            }

        }

        return true;

    }

    activateView(id: string): boolean {

        const view = this.views.get(id);

        if (!view) {

            return false;

        }

        if (!this.editors.activate(id)) {

            return false;

        }

        this.viewHost.setActiveView(view);

        this.explorer?.select(view.id);

        return true;

    }

    getActiveView(): View | undefined {

        return this.editors.getActive();

    }

    clearActiveView(): void {

        this.viewHost.clear();

        this.explorer?.clearSelection();

    }

    getNavigation(): NavigationModel {

        return this.navigation;

    }

    getLayouts(): LayoutModel {

        return this.layouts;

    }

    getViews(): ViewRegistry {

        return this.views;

    }

    getViewHost(): ViewHost {

        return this.viewHost;

    }

    getFileViewer(): FileViewer {

        return this.fileViewer;

    }

    getEditorManager(): EditorManager {

        return this.editors;

    }

    getEditorTabs(): EditorTabs {

        return this.tabs;

    }

    getKnowledgeManager(): KnowledgeManager {

        return this.knowledge;

    }

    getKnowledge(): KnowledgeManager {

        return this.knowledge;

    }

    getKnowledgeWorkspace(): KnowledgeWorkspace {

        return this.knowledgeWorkspace;

    }

}