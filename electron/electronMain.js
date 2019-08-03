
const { app, BrowserWindow } = require( 'electron' );

function createWindow() {
  const win = new BrowserWindow( { width: 1360, height: 720 } );
  win.loadFile( './electron/index.html' );
  win.webContents.openDevTools();
}

app.on( 'ready', createWindow );
