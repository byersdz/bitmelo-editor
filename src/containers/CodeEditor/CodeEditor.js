
import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ScriptPicker from './ScriptPicker/ScriptPicker';

import { setScript } from '../../state/Code/scripts';

import { useSmallWidth, useExtraSmallWidth } from '../../style/dimensions';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';

import './CodeEditor.scss';

class CodeEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.editor = null;
    this.containerRef = React.createRef();

    this.state = {
      containerWidth: 0,
      containerHeight: 0,
    };

    this.updateDimensions = this.updateDimensions.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'resize', this.updateDimensions );

    this.updateDimensions();
  }

  componentDidUpdate( prevProps ) {
    const {
      navigationPanelIsOpen,
      referencePanelIsOpen,
      activeIndex,
    } = this.props;
    const {
      navigationPanelIsOpen: prevNavIsOpen,
      referencePanelIsOpen: prevRefIsOpen,
      activeIndex: prevIndex,
    } = prevProps;

    if (
      navigationPanelIsOpen !== prevNavIsOpen
      || referencePanelIsOpen !== prevRefIsOpen
    ) {
      this.updateDimensions();
    }

    if ( activeIndex !== prevIndex && this.editor ) {
      this.saveScriptMetaData( prevIndex );
      this.editor.session.getUndoManager().reset();

      const { script } = this.props;
      this.editor.selection.moveTo( script.cursorRow, script.cursorColumn );
      this.editor.session.setScrollTop( script.scrollTop );
    }
  }

  saveScriptMetaData( index ) {
    const { scripts, _setScript } = this.props;

    // don't save meta data if the script no longer exists
    if ( index >= scripts.length - 1 ) {
      return;
    }

    _setScript( index, {
      ...scripts[index],
      scrollTop: this.editor.session.getScrollTop(),
    } );
  }

  componentWillUnmount() {
    const { activeIndex } = this.props;
    this.saveScriptMetaData( activeIndex );
    window.removeEventListener( 'resize', this.updateDimensions );
  }

  updateDimensions() {
    const { navigationPanelIsOpen, referencePanelIsOpen } = this.props;

    const windowWidth = window.innerWidth;

    let navigationPanelWidth = navigationPanelIsOpen ? 200 : 40;

    if ( windowWidth <= useExtraSmallWidth ) {
      navigationPanelWidth = 40;
    }

    let referencePanelWidth = 20;
    if ( referencePanelIsOpen ) {
      if ( windowWidth <= useExtraSmallWidth ) {
        referencePanelWidth = 20;
      }
      else if ( windowWidth <= useSmallWidth ) {
        referencePanelWidth = 420;
      }
      else {
        referencePanelWidth = 548;
      }
    }

    const containerWidth = windowWidth - referencePanelWidth - navigationPanelWidth;

    this.setState( {
      containerWidth,
      containerHeight: this.containerRef.current.offsetHeight,
    } );
  }

  handleEditorLoad( editor ) {
    this.editor = editor;
    const { script } = this.props;
    editor.selection.moveTo( script.cursorRow, script.cursorColumn );
    editor.session.setScrollTop( script.scrollTop );

    editor.session.$worker.send(
      'changeOptions',
      [{
        globals: {
          engine: false,
          bitmelo: false,
          inp: true,
          scr: true,
          aud: true,
        },
        maxerr: 10000,
        globalstrict: false,
        strict: 'implied',
      }],
    );
  }

  handleTextChange( value ) {
    const { activeIndex, _setScript, script } = this.props;
    _setScript( activeIndex, { ...script, text: value } );
  }

  handleCursorChange( selection ) {
    const { script, activeIndex, _setScript } = this.props;
    _setScript( activeIndex, {
      ...script,
      cursorRow: selection.cursor.row,
      cursorColumn: selection.cursor.column,
    } );
  }

  render() {
    const { script } = this.props;
    const { containerWidth, containerHeight } = this.state;
    const maxEditorWidth = 1200;
    const minEditorWidth = 640;

    let editorWidth = containerWidth - 8;

    if ( editorWidth > maxEditorWidth ) {
      editorWidth = maxEditorWidth;
    }

    if ( editorWidth < minEditorWidth ) {
      editorWidth = minEditorWidth;
    }

    const editorHeight = containerHeight - 8;

    return (
      <div className="code-editor">
        <div className="editor-controls">
          <ScriptPicker />
        </div>
        <div className="editor-container" ref={ this.containerRef }>
          <AceEditor
            value={ script.text }
            mode="javascript"
            theme="twilight"
            name="ace1"
            width={ `${ editorWidth }px` }
            height={ `${ editorHeight }px` }
            fontSize={ 14 }
            onChange={ ( v, e ) => this.handleTextChange( v, e ) }
            onCursorChange={ s => this.handleCursorChange( s ) }
            onLoad={ e => this.handleEditorLoad( e ) }
            editorProps={ { $blockScrolling: true } }
            tabSize={ 2 }
            setOptions={ {
              enableLiveAutocompletion: true,
              useSoftTabs: true,
            } }
            focus
          />
        </div>
      </div>
    );
  }
}

CodeEditor.propTypes = {
  script: PropTypes.object.isRequired,
  scripts: PropTypes.arrayOf( PropTypes.object ).isRequired,
  _setScript: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  navigationPanelIsOpen: PropTypes.bool.isRequired,
  referencePanelIsOpen: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex, scripts } = state.code;
  const script = scripts[activeIndex];
  return {
    activeIndex,
    script,
    scripts,
    navigationPanelIsOpen: state.layout.navigationPanelIsOpen,
    referencePanelIsOpen: state.layout.referencePanelIsOpen,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setScript: setScript,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( CodeEditor );
