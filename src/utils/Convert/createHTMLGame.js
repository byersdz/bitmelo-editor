
import createProjectScript from './createProjectScript';

export default function exportHTMLGame( state ) {
  const style = `
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #000;
      color: #888;
      font-family: sans-serif;
      font-size: 14px;
    }

    a {
      color: #aaa;
      text-decoration: none;
    }

    #bitmelo-container {
      margin: 0 auto;
      margin-top: 32px;
      padding: 0;
    }

    #bitmelo-container canvas {
      margin: auto;
      display: block;
    }

    #made-with {
      margin: 8px auto;
      text-align: center;
    }

  </style>
`;

  const projectScript = createProjectScript( state );

  const htmlGame = `
  <html>
  <head>
    ${ style }
  </head>
  <body>
    <div id="main-container">
      <div id="bitmelo-container"></div>
      <div id="made-with">
        Made with <a href="http://bitmelo.com" target="_blank">Bitmelo</a>
      </div>
    </div>
    <script>
      ${ projectScript }
    </script>
  </body>
  </html>
  `;

  return htmlGame;
}
