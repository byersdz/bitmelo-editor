
import React, { Fragment } from 'react';

import AButton from 'Components/AButton/AButton';
import Changelog from 'Components/Changelog/Changelog';

import PackageJSON from '../../../package.json';

import BitmeloLogo from './bitmelo-logo.png';
import './About.scss';

class About extends React.Component {
  render() {
    const webWelcome = (
      <Fragment>
        <p>
          {
            `
            Bitmelo is a game editor and engine for making small pixel art games right here in your browser.
            This editor has everything you need to develop a game in one convenient location.
            You can code, draw tiles and tilemaps, design sound effects, view the documentation,
            and playtest your game, all without having to break focus by switching applications.
            Once complete you can then export your game as a single HTML file.
            `
          }

        </p>
        <p>
          {
            `
            Bitmelo is currently in early access. Right now it has everything you need to make a minimal game,
            however many more features are planned for the future.
            `
          }
        </p>
      </Fragment>
    );

    const desktopWelcome = (
      <Fragment>
        <p>
          {
            `
            Bitmelo is a game editor and engine for making small pixel art games.
            This editor has everything you need to develop a game in one convenient location.
            You can code, draw tiles and tilemaps, design sound effects, view the documentation,
            and playtest your game, all without having to break focus by switching applications.
            Once complete you can then export your game as a single HTML file.
            `
          }

        </p>
        <p>
          {
            `
            Bitmelo is currently in early access. Right now it has everything you need to make a minimal game,
            however many more features are planned for the future.
            `
          }
        </p>
      </Fragment>
    );

    const welcomeRender = IS_DESKTOP ? desktopWelcome : webWelcome;

    const forSaleRender = !IS_DESKTOP ? (
      <AButton
        href="https://davidbyers.itch.io/bitmelo"
        className="for-sale"
      >
        <p>Click here to get the desktop version of Bitmelo on itch.io!</p>
      </AButton>
    ) : null;

    return (
      <div className="about">
        <img
          className="bitmelo-logo"
          src={ BitmeloLogo }
          alt="Bitmelo Logo"
        />
        <div className="version">
          {
            `editor v${ PackageJSON.version }`
          }
        </div>
        <div className="version">
          {
            `engine v${ PackageJSON.dependencies.bitmelo }`
          }
        </div>
        <h2 className="welcome">Welcome to Bitmelo!</h2>
        { welcomeRender }
        { forSaleRender }
        <h2>Community</h2>
        <p>
          {
            `
            Hi, my name's David and I'm the developer of Bitmelo! To get development
            updates you can check out my Twitter
            `
          }
          <AButton href="https://twitter.com/DavidZByers">
            {
              '@DavidZByers.'
            }
          </AButton>
        </p>
        <p>
          {
            `
            Check out the official Discord server
            `
          }
          <AButton href="https://discord.gg/akar4FG">
            {
              'here.'
            }
          </AButton>
        </p>
        <p>
          {
            `
            Or the official Reddit
            `
          }
          <AButton href="https://www.reddit.com/r/bitmelo/">
            {
              'here.'
            }
          </AButton>
        </p>
        <h2>Recent Changes</h2>
        <Changelog />
        <h2>Is Bitmelo Open Source?</h2>
        <p>
          {
            `
              The Bitmelo engine is open source under the MIT License. This means that you
              are free to do whatever you want with the games you make using the engine,
              including games made in the editor.
            `
          }
        </p>
        <AButton href="https://github.com/byersdz/bitmelo">
          View the Bitmelo engine source on Github
        </AButton>
        <p>
          {
            `
              The Bitmelo editor is licensed using a source available license. This license
              allows you to download the source for personal use, but does not allow you to
              distribute it to third parties. In addition, three years after the
              release of each version of the editor, that version is dual licensed to
              use the GNU Affero General Public License.
            `
          }
        </p>
        <AButton href="https://github.com/byersdz/bitmelo-editor">
          View the Bitmelo editor source on Github
        </AButton>
      </div>
    );
  }
}

export default About;
