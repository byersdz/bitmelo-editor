
import React from 'react';
import PropTypes from 'prop-types';

import PlayIcon from './SVG/play-o.svg';
import WaveIcon from './SVG/wave-o.svg';

import './Icon.scss';

const Icon = ( props ) => {
  const { file } = props;

  let svgFile = null;

  switch ( file ) {
    case 'play':
      svgFile = PlayIcon;
      break;

    case 'wave':
      svgFile = WaveIcon;
      break;

    default:
      svgFile = null;
      break;
  }

  return (
    <span className="isvg" dangerouslySetInnerHTML={ { __html: svgFile } } />
  );
};

Icon.propTypes = {
  file: PropTypes.string.isRequired,
};

export default Icon;
