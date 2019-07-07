
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextInput from 'Components/TextInput/TextInput';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import Checkbox from 'Components/Checkbox/Checkbox';
import Button from 'Components/Button/Button';

import { setProjectName } from 'State/Project/name';
import { setMiscSettings } from 'State/Project/misc';

import { downloadProjectData } from 'Utils/download';

import ScreenSettings from './ScreenSettings/ScreenSettings';
import TileSizeModal from './TileSizeModal/TileSizeModal';
import ImportProjectModal from './ImportProjectModal/ImportProjectModal';
import StartNewProjectModal from './StartNewProjectModal/StartNewProjectModal';


import './ProjectEditor.scss';

class ProjectEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      tileSizeModalIsOpen: false,
      importModalIsOpen: false,
      startProjectModalIsOpen: false,
    };
  }

  handleNameChange( value ) {
    const { _setProjectName } = this.props;
    _setProjectName( value );
  }

  handleHideCursorChange( value ) {
    const { _setMiscSettings, misc } = this.props;
    _setMiscSettings( { ...misc, hideCursor: value } );
  }

  handleClickToBeginChange( value ) {
    const { _setMiscSettings, misc } = this.props;
    _setMiscSettings( { ...misc, clickToBegin: value } );
  }

  handleStartFramesChange( value ) {
    const { _setMiscSettings, misc } = this.props;
    _setMiscSettings( { ...misc, startTransitionFrames: value } );
  }

  render() {
    const {
      name,
      misc,
      tileSize,
    } = this.props;

    const {
      tileSizeModalIsOpen,
      importModalIsOpen,
      startProjectModalIsOpen,
    } = this.state;

    const tileSizeString = `Tile Size: ${ tileSize }px`;
    const tileSizeModalRender = tileSizeModalIsOpen ? (
      <TileSizeModal
        onClose={ () => this.setState( { tileSizeModalIsOpen: false } ) }
      />
    ) : null;

    const importProjectModalRender = importModalIsOpen ? (
      <ImportProjectModal
        onClose={ () => this.setState( { importModalIsOpen: false } ) }
      />
    ) : null;

    const startModalRender = startProjectModalIsOpen ? (
      <StartNewProjectModal
        onClose={ () => this.setState( { startProjectModalIsOpen: false } ) }
      />
    ) : null;

    return (
      <div className="project-editor">
        { tileSizeModalRender }
        { importProjectModalRender }
        { startModalRender }
        <TextInput
          title="Project Name"
          value={ name }
          onValueChange={ v => this.handleNameChange( v ) }
        />
        <div className="tile-size-display">
          <div>
            { tileSizeString }
          </div>
          <Button
            title="Edit Tile Size"
            click={ () => this.setState( { tileSizeModalIsOpen: true } ) }
            standard
          />
        </div>
        <ScreenSettings />
        <Checkbox
          title="Hide Cursor"
          checked={ misc.hideCursor }
          onChange={ v => this.handleHideCursorChange( v ) }
        />
        <Checkbox
          title="Require Click to Start"
          checked={ misc.clickToBegin }
          onChange={ v => this.handleClickToBeginChange( v ) }
        />
        <NumberPicker
          title="Start transition frames"
          value={ misc.startTransitionFrames }
          minValue={ 1 }
          maxValue={ 500 }
          onValueChange={ v => this.handleStartFramesChange( v ) }
        />
        <Button
          title="Import Project Data"
          click={ () => this.setState( { importModalIsOpen: true } ) }
          standard
        />
        <Button
          title="Download Project Data"
          click={ () => downloadProjectData() }
          standard
        />
        <Button
          title="Start New Project"
          click={ () => this.setState( { startProjectModalIsOpen: true } ) }
          standard
        />
      </div>
    );
  }
}

ProjectEditor.propTypes = {
  name: PropTypes.string.isRequired,
  _setProjectName: PropTypes.func.isRequired,
  misc: PropTypes.object.isRequired,
  _setMiscSettings: PropTypes.func.isRequired,
  tileSize: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  return {
    name: state.project.name,
    misc: state.project.misc,
    tileSize: state.project.tileSize,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setProjectName: setProjectName,
    _setMiscSettings: setMiscSettings,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ProjectEditor );
