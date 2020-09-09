/* eslint-disable dot-notation */

const {
  app,
  BrowserWindow,
  shell,
  Menu,
  session,
} = require( 'electron' );
const isDev = require( 'electron-is-dev' );
const path = require( 'path' );
const fs = require( 'fs' );

let userTokenCookie = '';
let refreshTokenCookie = '';
let sessionIdCookie = '';

const userDataPath = app.getPath( 'userData' );
const cookieFilePath = path.join( userDataPath, 'cookies.json' );

function createWindow() {
  // load api cookies
  try {
    const cookieData = JSON.parse( fs.readFileSync( cookieFilePath ) );

    if ( cookieData.userToken ) {
      userTokenCookie = cookieData.userToken;
    }

    if ( cookieData.refreshToken ) {
      refreshTokenCookie = cookieData.refreshToken;
    }

    if ( cookieData.sessionId ) {
      sessionIdCookie = cookieData.sessionId;
    }
  }
  catch ( err ) {
    console.error( err );
  }

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
      const data = {
        userToken: userTokenCookie,
        refreshToken: refreshTokenCookie,
        sessionId: sessionIdCookie,
      };

      fs.writeFileSync( cookieFilePath, JSON.stringify( data ) );
    }
  } );
}

app.on( 'ready', createWindow );
