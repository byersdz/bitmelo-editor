
import React from 'react';

import TextInput from 'Components/TextInput/TextInput';
import NumberPicker from 'Components/NumberPicker/NumberPicker';

import './ProjectEditor.scss';

class ProjectEditor extends React.Component {
  render() {
    return (
      <div className="project-editor">
        <TextInput
          title="Project Name"
          value="Project Name"
          onValueChange={ v => console.log( v ) }
        />
        <NumberPicker
          title="Screen Width"
          value={ 128 }
          minValue={ 1 }
          maxValue={ 1024 }
          onValueChange={ v => console.log( v ) }
        />
        <NumberPicker
          title="Screen Height"
          value={ 128 }
          minValue={ 1 }
          maxValue={ 1024 }
          onValueChange={ v => console.log( v ) }
        />

      </div>
    );
  }
}

export default ProjectEditor;
