
const { app, BrowserWindow } = require( 'electron' );
const isDev = require( 'electron-is-dev' );

function createWindow() {
  const win = new BrowserWindow( { width: 1360, height: 720 } );

  if ( isDev ) {
    win.loadURL( 'http://localhost:9001' );
    win.webContents.openDevTools();
  }
  else {
    win.loadFile( './electron/react-build/index.html' );
  }
}

app.on( 'ready', createWindow );
