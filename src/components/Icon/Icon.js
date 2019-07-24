
import React from 'react';
import PropTypes from 'prop-types';

import PlayIcon from './SVG/play-o.svg';
import WaveIcon from './SVG/wave-o.svg';
import HamburgerIcon from './SVG/hamburger-o.svg';
import BracketsIcon from './SVG/brackets-o.svg';

import './Icon.scss';

const Icon = ( props ) => {
  const { file } = props;

  let svgFile = null;
  let noFill = false;

  switch ( file ) {
    case 'play':
      svgFile = PlayIcon;
      break;

    case 'wave':
      svgFile = WaveIcon;
      break;

    case 'hamburger':
      svgFile = HamburgerIcon;
      break;

    case 'brackets':
      svgFile = BracketsIcon;
      noFill = true;
      break;

    default:
      svgFile = null;
      break;
  }

  let className = 'isvg';
  if ( noFill ) {
    className += ' no-fill';
  }
  return (
    <span className={ className } dangerouslySetInnerHTML={ { __html: svgFile } } /> // eslint-disable-line
  );
};

Icon.propTypes = {
  file: PropTypes.string.isRequired,
};

export default Icon;
