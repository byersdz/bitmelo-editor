
import React from 'react';

import AButton from 'Components/AButton/AButton';

import PackageJSON from '../../../package.json';

import BitmeloLogo from './bitmelo-logo.png';
import './About.scss';

class About extends React.Component {
  render() {
    const forSaleRender = (
      <AButton
        href="https://davidbyers.itch.io/bitmelo"
        className="for-sale"
      >
        <p>Click here to get the desktop version of Bitmelo on itch.io!</p>
        <p>
          { 'Just ' }
          <span className="strike">$29.99</span>
          { ' $14.99 while in early access!' }
        </p>
      </AButton>
    );
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
        <p>Bitmelo is a game engine and editor for making pixel art games.</p>
        { forSaleRender }
        <h2>Community</h2>
        <p>
          {
            `
            Hi, my name's David and I'm the developer of Bitmelo!
            You can check out my Twitter @DavidZByers to get development updates.
            `
          }
        </p>
        <h2>Is Bitmelo Open Source?</h2>

      </div>
    );
  }
}

export default About;
