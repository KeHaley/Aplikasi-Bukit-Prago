import { app } from "electron";
import { MainWindow } from "./MainWindow.js";

app.whenReady().then(() => {

    const window = new MainWindow();

    window.open();

});

app.on("window-all-closed", () => {

    app.quit();

});