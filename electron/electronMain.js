
const { app, BrowserWindow, shell } = require( 'electron' );
const isDev = require( 'electron-is-dev' );

function createWindow() {
  const win = new BrowserWindow( { width: 1360, height: 720 } );
  win.setMenu( null );

  if ( isDev ) {
    win.loadURL( 'http://localhost:9001' );
    win.webContents.openDevTools();
  }
  else {
    win.loadFile( './electron/react-build/index.html' );
  }

  // open all links in user's browser
  win.webContents.on( 'new-window', ( event, url ) => {
    event.preventDefault();
    shell.openExternal( url );
  } );
}

app.on( 'ready', createWindow );
