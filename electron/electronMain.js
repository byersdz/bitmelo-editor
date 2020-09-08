/* eslint-disable dot-notation */

const {
  app,
  BrowserWindow,
  shell,
  Menu,
  session,
} = require( 'electron' );
const isDev = require( 'electron-is-dev' );

let userTokenCookie = '';
let refreshTokenCookie = '';
let sessionIdCookie = '';

function createWindow() {
  const win = new BrowserWindow( {
    width: 1360,
    height: 720,
    show: false,
  } );

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

  // change origin headers on web requests
  const bitmeloApifilter = {
    urls: ['*://api.bitmelo.com/*'],
  };

  session.defaultSession.webRequest.onBeforeSendHeaders( bitmeloApifilter, ( details, callback ) => {
    console.log( 'before headers' );
    console.log( details );
    const originUrl = 'https://bitmelo.com';
    // eslint-disable-next-line no-param-reassign
    details.requestHeaders.Origin = originUrl;
    if ( userTokenCookie || refreshTokenCookie || sessionIdCookie ) {
      let cookieString = '';
      if ( userTokenCookie ) {
        cookieString += userTokenCookie;
        cookieString += ';';
      }

      if ( refreshTokenCookie ) {
        cookieString += refreshTokenCookie;
        cookieString += ';';
      }

      if ( sessionIdCookie ) {
        cookieString += sessionIdCookie;
      }

      // eslint-disable-next-line no-param-reassign
      details.requestHeaders['Cookie'] = cookieString;
    }

    callback( { requestHeaders: details.requestHeaders } );
  } );

  // get bitmelo cookies from completed requests
  session.defaultSession.webRequest.onCompleted( bitmeloApifilter, details => {
    if ( details.responseHeaders['Set-Cookie'] ) {
      console.log( 'complete' );
      for ( let i = 0; i < details.responseHeaders['Set-Cookie'].length; i += 1 ) {
        const cookie = details.responseHeaders['Set-Cookie'][i];
        if ( cookie.startsWith( 'user_token' ) ) {
          const split = cookie.split( ';' );
          userTokenCookie = split[0];
        }
        else if ( cookie.startsWith( 'refresh_token' ) ) {
          const split = cookie.split( ';' );
          refreshTokenCookie = split[0];
        }
        else if ( cookie.startsWith( 'session_id' ) ) {
          const split = cookie.split( ';' );
          sessionIdCookie = split[0];
        }
      }

      // save the cookies to a file
    }
  } );
}

app.on( 'ready', createWindow );
