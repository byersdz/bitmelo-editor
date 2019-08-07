
import React from 'react';
import PropTypes from 'prop-types';

import PlayIcon from './SVG/play-o.svg';
import WaveIcon from './SVG/wave-o.svg';
import HamburgerIcon from './SVG/hamburger-o.svg';
import BracketsIcon from './SVG/brackets-o.svg';
import ClipboardIcon from './SVG/clipboard-o.svg';
import TilesIcon from './SVG/tiles-o.svg';
import MapIcon from './SVG/map-o.svg';
import XIcon from './SVG/x-o.svg';
import UpIcon from './SVG/up-o.svg';
import PlusIcon from './SVG/plus-o.svg';
import PencilIcon from './SVG/pencil-o.svg';
import EraserIcon from './SVG/eraser-o.svg';
import InfoIcon from './SVG/info-o.svg';

import './Icon.scss';

const Icon = ( props ) => {
  const { file } = props;

  let svgFile = null;
  let noFill = false;
  let noStroke = false;

  switch ( file ) {
    case 'play':
      svgFile = PlayIcon;
      noStroke = true;
      break;

    case 'wave':
      svgFile = WaveIcon;
      noStroke = true;
      break;

    case 'hamburger':
      svgFile = HamburgerIcon;
      break;

    case 'brackets':
      svgFile = BracketsIcon;
      noFill = true;
      break;

    case 'clipboard':
      svgFile = ClipboardIcon;
      noStroke = true;
      break;

    case 'tiles': {
      svgFile = TilesIcon;
      noStroke = true;
      break;
    }

    case 'map': {
      svgFile = MapIcon;
      noFill = true;
      break;
    }

    case 'x': {
      svgFile = XIcon;
      noFill = true;
      break;
    }

    case 'up': {
      svgFile = UpIcon;
      noFill = true;
      break;
    }

    case 'plus': {
      svgFile = PlusIcon;
      noFill = true;
      break;
    }

    case 'pencil': {
      svgFile = PencilIcon;
      noStroke = true;
      break;
    }

    case 'eraser': {
      svgFile = EraserIcon;
      noStroke = true;
      break;
    }

    case 'info': {
      svgFile = InfoIcon;
      noStroke = true;
      break;
    }

    default:
      svgFile = null;
      break;
  }

  let className = 'isvg';
  if ( noFill ) {
    className += ' no-fill';
  }
  if ( noStroke ) {
    className += ' no-stroke';
  }

  return (
    <span className={ className } dangerouslySetInnerHTML={ { __html: svgFile } } /> // eslint-disable-line
  );
};

Icon.propTypes = {
  file: PropTypes.string.isRequired,
};

export default Icon;
