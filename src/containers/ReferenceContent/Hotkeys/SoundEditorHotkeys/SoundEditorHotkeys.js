
import React, { Fragment } from 'react';

import Hotkey from '../Hotkey/Hotkey';

import './SoundEditorHotkeys.scss';

class SoundEditorHotkeys extends React.Component {
  render() {
    return (
      <Fragment>
        <Hotkey
          title="Octave Up"
          value="Up Arrow"
        />
        <Hotkey
          title="Octave Down"
          value="Down Arrow"
        />
        <Hotkey
          title="Temp Octave Down"
          value="Left Arrow"
        />
        <Hotkey
          title="Temp Octave Up"
          value="Right Arrow"
        />
        <Hotkey
          title="C Piano Key"
          value="Z"
        />
        <Hotkey
          title="C# / Db Piano Key"
          value="S"
        />
        <Hotkey
          title="D Piano Key"
          value="X"
        />
        <Hotkey
          title="D# / Eb Piano Key"
          value="D"
        />
        <Hotkey
          title="E Piano Key"
          value="C"
        />
        <Hotkey
          title="F Piano Key"
          value="V"
        />
        <Hotkey
          title="F# / Gb Piano Key"
          value="G"
        />
        <Hotkey
          title="G Piano Key"
          value="B"
        />
        <Hotkey
          title="G# / Ab Piano Key"
          value="H"
        />
        <Hotkey
          title="A Piano Key"
          value="N"
        />
        <Hotkey
          title="A# / Bb Piano Key"
          value="J"
        />
        <Hotkey
          title="B Piano Key"
          value="M"
        />
      </Fragment>
    );
  }
}

export default SoundEditorHotkeys;
