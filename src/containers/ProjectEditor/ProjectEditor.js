
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextInput from 'Components/TextInput/TextInput';

import { setProjectName } from 'State/Project/name';

import ScreenSettings from './ScreenSettings/ScreenSettings';

import './ProjectEditor.scss';

class ProjectEditor extends React.Component {
  handleNameChange( value ) {
    const { _setProjectName } = this.props;
    _setProjectName( value );
  }

  render() {
    const { name } = this.props;

    return (
      <div className="project-editor">
        <TextInput
          title="Project Name"
          value={ name }
          onValueChange={ v => this.handleNameChange( v ) }
        />
        <ScreenSettings />
      </div>
    );
  }
}

ProjectEditor.propTypes = {
  name: PropTypes.string.isRequired,
  _setProjectName: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    name: state.project.name,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setProjectName: setProjectName,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ProjectEditor );
