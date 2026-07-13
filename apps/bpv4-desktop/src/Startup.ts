import { App } from "./App.js";

const APP_VERSION = "0.1.0-alpha";

export class Startup {

    start(projectPath?: string): void {

        switch (projectPath) {

            case "--help":
            case "-h":
                this.showHelp();
                return;

            case "--version":
            case "-v":
                console.log(APP_VERSION);
                return;

        }

        if (!projectPath) {

            this.showHelp();

            process.exit(1);

        }

        new App().run(projectPath);

    }

    private showHelp(): void {

        console.log("BPV4 MASTER");

        console.log("");

        console.log("Usage:");

        console.log("  bpv4-master <project-folder>");

        console.log("");

        console.log("Options:");

        console.log("  -h, --help       Show help");

        console.log("  -v, --version    Show version");

    }

}