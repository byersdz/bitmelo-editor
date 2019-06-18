
import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setScript } from 'State/Code/scripts';

import 'brace/mode/javascript';
import 'brace/theme/twilight';

import './CodeEditor.scss';

class CodeEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.editor = null;
  }

  handleEditorLoad( editor ) {
    this.editor = editor;
    const { script } = this.props;
    editor.selection.moveTo( script.cursorRow, script.cursorColumn );
  }

  handleTextChange( value ) {
    const { activeIndex, _setScript, script } = this.props;
    _setScript( activeIndex, { ...script, text: value } );
    console.log( this.editor );
  }

  handleCursorChange( selection ) {
    const { script, activeIndex, _setScript } = this.props;
    _setScript( activeIndex, {
      ...script,
      cursorRow: selection.selectionLead.row,
      cursorColumn: selection.selectionLead.column,
    } );
  }

  render() {
    const { script } = this.props;

    return (
      <div className="code-editor">
        <AceEditor
          value={ script.text }
          mode="javascript"
          theme="twilight"
          name="blah1"
          width="720px"
          fontSize={ 14 }
          onChange={ ( v, e ) => this.handleTextChange( v, e ) }
          onCursorChange={ s => this.handleCursorChange( s ) }
          onLoad={ e => this.handleEditorLoad( e ) }
          editorProps={ { $blockScrolling: true } }
          tabSize={ 2 }
          focus
        />
      </div>
    );
  }
}

CodeEditor.propTypes = {
  script: PropTypes.object.isRequired,
  _setScript: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex, scripts } = state.code;
  const script = scripts[activeIndex];
  return {
    activeIndex,
    script,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setScript: setScript,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( CodeEditor );
