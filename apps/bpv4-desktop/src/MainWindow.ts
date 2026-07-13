import { BrowserWindow } from "electron";

export class MainWindow {

    private window?: BrowserWindow;

    open(): void {

        this.window = new BrowserWindow({

            width: 1600,
            height: 900,

            autoHideMenuBar: true

        });

        this.window.loadURL(
            "https://script.google.com/macros/s/AKfycbwkb8DYqH6nQ_8-_b29mFeK1K5z2FEBb95KPp8aBE2yVb4UAOMC_fShxzAW7OApNV7q/exec"
        );

    }

}