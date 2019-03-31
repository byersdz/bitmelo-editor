
import React from 'react';
import Card from 'Components/Card/Card';
import WaveGrid from 'Components/WaveGrid/WaveGrid';

import './SoundEditor.scss';

class SoundEditor extends React.Component {
  render() {
    return (
      <div className="sound-editor">
        <Card>
          <WaveGrid minValue={ -10 } maxValue={ 10 } />
        </Card>
      </div>
    );
  }
}

export default SoundEditor;
