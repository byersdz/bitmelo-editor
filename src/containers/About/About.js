
import React from 'react';

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
          editor v0.0.1
        </div>
        <div className="version">
          engine v0.0.1
        </div>
      </div>
    );
  }
}

export default About;
