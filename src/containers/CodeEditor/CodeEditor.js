
import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setScript } from 'State/Code/scripts';

import { useSmallWidth, useExtraSmallWidth } from 'Style/dimensions';

import 'brace/mode/javascript';
import 'brace/theme/twilight';
import 'brace/ext/language_tools';

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
    } = this.props;
    const {
      navigationPanelIsOpen: prevNavIsOpen,
      referencePanelIsOpen: prevRefIsOpen,
    } = prevProps;

    if (
      navigationPanelIsOpen !== prevNavIsOpen
      || referencePanelIsOpen !== prevRefIsOpen
    ) {
      this.updateDimensions();
    }
  }

  componentWillUnmount() {
    const { script, activeIndex, _setScript } = this.props;
    _setScript( activeIndex, {
      ...script,
      scrollTop: this.editor.session.getScrollTop(),
    } );

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
  }

  handleTextChange( value ) {
    const { activeIndex, _setScript, script } = this.props;
    _setScript( activeIndex, { ...script, text: value } );
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
    const { containerWidth, containerHeight } = this.state;
    const maxEditorWidth = 1200;
    const minEditorWidth = 640;

    let editorWidth = containerWidth - 16;

    if ( editorWidth > maxEditorWidth ) {
      editorWidth = maxEditorWidth;
    }

    if ( editorWidth < minEditorWidth ) {
      editorWidth = minEditorWidth;
    }

    const editorHeight = containerHeight - 16;

    return (
      <div className="code-editor">
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
              useSoftTabs: false,
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
