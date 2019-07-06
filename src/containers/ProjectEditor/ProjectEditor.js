
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
import { resetProject } from 'State/globalActions';

import ScreenSettings from './ScreenSettings/ScreenSettings';
import TileSizeModal from './TileSizeModal/TileSizeModal';

import './ProjectEditor.scss';

class ProjectEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      tileSizeModalIsOpen: false,
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
      _resetProject,
    } = this.props;
    const { tileSizeModalIsOpen } = this.state;

    const tileSizeString = `Tile Size: ${ tileSize }px`;

    return (
      <div className="project-editor">
        <TileSizeModal
          isOpen={ tileSizeModalIsOpen }
          onClose={ () => this.setState( { tileSizeModalIsOpen: false } ) }
        />
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
          title="Reset Project"
          click={ () => _resetProject() }
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
  _resetProject: PropTypes.func.isRequired,
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
    _resetProject: resetProject,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ProjectEditor );
