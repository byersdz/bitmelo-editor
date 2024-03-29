
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
import BackIcon from './SVG/back-o.svg';
import BucketIcon from './SVG/bucket-o.svg';
import GridIcon from './SVG/grid-o.svg';
import MoveIcon from './SVG/move-o.svg';
import RectSelectIcon from './SVG/rect-select-o.svg';
import CopyIcon from './SVG/copy-o.svg';
import CutIcon from './SVG/cut-o.svg';
import PasteIcon from './SVG/paste-o.svg';
import DeselectIcon from './SVG/deselect-o.svg';
import SelectAllIcon from './SVG/selectall-o.svg';
import FlipVIcon from './SVG/flip-v-o.svg';
import FlipHIcon from './SVG/flip-h-o.svg';
import CheckIcon from './SVG/check-o.svg';
import CloudSaveIcon from './SVG/cloud-save-o.svg';
import PublishIcon from './SVG/publish-o.svg';
import UserIcon from './SVG/user-o.svg';
import TrashIcon from './SVG/trash-o.svg';
import LineIcon from './SVG/line-o.svg';
import DotsIcon from './SVG/dots-o.svg';
import WorldIcon from './SVG/world-o.svg';
import ClockwiseIcon from './SVG/clockwise-o.svg';
import CounterIcon from './SVG/counter-o.svg';
import LockUnlockedIcon from './SVG/lock-unlocked-o.svg';
import LockLockedIcon from './SVG/lock-locked-o.svg';

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

    case 'back': {
      svgFile = BackIcon;
      noFill = true;
      break;
    }

    case 'bucket': {
      svgFile = BucketIcon;
      noStroke = true;
      break;
    }

    case 'grid': {
      svgFile = GridIcon;
      noFill = true;
      break;
    }

    case 'move': {
      svgFile = MoveIcon;
      noStroke = true;
      break;
    }

    case 'rect-select': {
      svgFile = RectSelectIcon;
      noStroke = true;
      break;
    }

    case 'copy': {
      svgFile = CopyIcon;
      noStroke = true;
      break;
    }

    case 'cut': {
      svgFile = CutIcon;
      noStroke = true;
      break;
    }

    case 'paste': {
      svgFile = PasteIcon;
      noStroke = true;
      break;
    }

    case 'deselect': {
      svgFile = DeselectIcon;
      noStroke = true;
      break;
    }

    case 'selectall': {
      svgFile = SelectAllIcon;
      noStroke = true;
      break;
    }

    case 'flip-v': {
      svgFile = FlipVIcon;
      noStroke = true;
      break;
    }

    case 'flip-h': {
      svgFile = FlipHIcon;
      noStroke = true;
      break;
    }

    case 'check': {
      svgFile = CheckIcon;
      noFill = true;
      break;
    }

    case 'cloud-save': {
      svgFile = CloudSaveIcon;
      noStroke = true;
      break;
    }

    case 'publish': {
      svgFile = PublishIcon;
      noStroke = true;
      break;
    }

    case 'user': {
      svgFile = UserIcon;
      noStroke = true;
      break;
    }

    case 'trash': {
      svgFile = TrashIcon;
      noStroke = true;
      break;
    }

    case 'line': {
      svgFile = LineIcon;
      noStroke = true;
      break;
    }

    case 'dots': {
      svgFile = DotsIcon;
      noStroke = true;
      break;
    }

    case 'world': {
      svgFile = WorldIcon;
      noStroke = true;
      break;
    }

    case 'clockwise': {
      svgFile = ClockwiseIcon;
      noStroke = true;
      break;
    }

    case 'counter': {
      svgFile = CounterIcon;
      noStroke = true;
      break;
    }

    case 'unlocked': {
      svgFile = LockUnlockedIcon;
      noStroke = true;
      break;
    }

    case 'locked': {
      svgFile = LockLockedIcon;
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
