
import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/twilight';

import './CodeEditor.scss';

class CodeEditor extends React.Component {
  render() {
    return (
      <div className="code-editor">
        <AceEditor
          mode="javascript"
          theme="twilight"
          name="blah1"
          width="720px"
          fontSize={ 14 }
        />
      </div>
    );
  }
}

export default CodeEditor;
