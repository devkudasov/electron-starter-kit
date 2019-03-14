import { app, BrowserWindow } from 'electron';

app.on('ready', (_: any) => {
    new BrowserWindow();
});