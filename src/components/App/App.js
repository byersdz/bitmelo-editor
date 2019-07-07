
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { importProjectData } from 'State/globalActions';

import NavigationTab from 'Containers/NavigationTab/NavigationTab';
import MainContainer from 'Containers/MainContainer/MainContainer';
import ReferenceTab from 'Containers/ReferenceTab/ReferenceTab';
import BitmeloAudio from 'Containers/BitmeloAudio/BitmeloAudio';
import './App.scss';

import { loadStateFromLocalStorage } from 'Utils/Saving/localStorage';

class App extends React.Component {
  componentDidMount() {
    const { _importProjectData } = this.props;
    const savedState = loadStateFromLocalStorage();
    if ( savedState ) {
      savedState.tileset = savedState.tileset.present;
      _importProjectData( savedState );
    }
  }

  render() {
    return (
      <div id="app">
        <NavigationTab />
        <MainContainer />
        <ReferenceTab />
        <BitmeloAudio />
      </div>
    );
  }
}

App.propTypes = {
  _importProjectData: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _importProjectData: importProjectData,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( App );
