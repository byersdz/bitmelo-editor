
import React from 'react';

import PackageJSON from '../../../package.json';

import BitmeloLogo from './bitmelo-logo.png';
import './About.scss';

class About extends React.Component {
  render() {
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
            `editor v${ PackageJSON.dependencies.bitmelo }`
          }
        </div>
        <div className="itch">
          <iframe frameBorder="0" src="https://itch.io/embed/459253?dark=true" width="552" height="167" title="itch" />
        </div>
      </div>
    );
  }
}

export default About;
