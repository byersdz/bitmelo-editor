
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

import ScreenSettings from './ScreenSettings/ScreenSettings';

import './ProjectEditor.scss';

class ProjectEditor extends React.Component {
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
    const { name, misc } = this.props;

    return (
      <div className="project-editor">
        <TextInput
          title="Project Name"
          value={ name }
          onValueChange={ v => this.handleNameChange( v ) }
        />
        <div className="tile-size-display">
          <div>
            Tile Size: 16px
          </div>
          <Button
            title="Edit Tile Size"
            click={ () => console.log( 'edit tile size clicked' ) }
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
      </div>
    );
  }
}

ProjectEditor.propTypes = {
  name: PropTypes.string.isRequired,
  _setProjectName: PropTypes.func.isRequired,
  misc: PropTypes.object.isRequired,
  _setMiscSettings: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    name: state.project.name,
    misc: state.project.misc,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setProjectName: setProjectName,
    _setMiscSettings: setMiscSettings,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ProjectEditor );
