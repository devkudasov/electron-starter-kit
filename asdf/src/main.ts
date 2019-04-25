import path from 'path';
import url from 'url';

import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow | null = null;

app.on('ready', (_: any) => {
    mainWindow = new BrowserWindow();
    
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'ui', "index.html"),
        protocol: "file:",
        slashes: true
    }));

    mainWindow.on('close', (_: any) => {
        mainWindow = null;
    });
});