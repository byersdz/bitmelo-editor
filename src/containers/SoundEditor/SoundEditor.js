
import React from 'react';
import Card from 'Components/Card/Card';
import WaveEditor from 'Components/WaveEditor/WaveEditor';

import './SoundEditor.scss';

class SoundEditor extends React.Component {
  render() {
    return (
      <div className="sound-editor">
        <Card>
          <WaveEditor minValue={ -12 } maxValue={ 12 } />
        </Card>
      </div>
    );
  }
}

export default SoundEditor;
