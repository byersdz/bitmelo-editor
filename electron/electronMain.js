
const {
  app,
  BrowserWindow,
  shell,
  Menu,
} = require( 'electron' );
const isDev = require( 'electron-is-dev' );

function createWindow() {
  const win = new BrowserWindow( { width: 1360, height: 720, show: false } );

  // eslint-disable-next-line new-cap
  const menu = new Menu.buildFromTemplate( [
    {
      label: 'Window',
      submenu: [
        {
          label: 'Toggle Dev Tools',
          click: () => {
            win.toggleDevTools();
          },
          accelerator: 'F12',
        },
      ],
    },
  ] );

  win.setMenu( menu );

  if ( isDev ) {
    win.loadURL( 'http://localhost:9001' );
    win.webContents.openDevTools();
  }
  else {
    win.loadFile( './electron/react-build/index.html' );
  }

  win.maximize();
  win.show();

  // open all links in user's browser
  win.webContents.on( 'new-window', ( event, url ) => {
    event.preventDefault();
    shell.openExternal( url );
  } );
}

app.on( 'ready', createWindow );
