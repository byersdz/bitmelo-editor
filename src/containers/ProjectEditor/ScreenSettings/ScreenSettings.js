
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from 'Components/Card/Card';
import NumberPicker from 'Components/NumberPicker/NumberPicker';

import { setScreenSettings } from 'State/Project/screen';

import './ScreenSettings.scss';

class ScreenSettings extends React.Component {
  handleScreenWidthChange( value ) {
    const { _setScreenSettings, screen } = this.props;
    _setScreenSettings( { ...screen, width: value } );
  }

  handleScreenHeightChange( value ) {
    const { _setScreenSettings, screen } = this.props;
    _setScreenSettings( { ...screen, height: value } );
  }

  render() {
    const { screen } = this.props;

    return (
      <Card className="screen-settings">
        <NumberPicker
          title="Screen Width"
          value={ screen.width }
          minValue={ 1 }
          maxValue={ 1024 }
          onValueChange={ v => this.handleScreenWidthChange( v ) }
        />
        <NumberPicker
          title="Screen Height"
          value={ screen.height }
          minValue={ 1 }
          maxValue={ 1024 }
          onValueChange={ v => this.handleScreenHeightChange( v ) }
        />
      </Card>
    );
  }
}

ScreenSettings.propTypes = {
  screen: PropTypes.object.isRequired,
  _setScreenSettings: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    name: state.project.name,
    screen: state.project.screen,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setScreenSettings: setScreenSettings,
  }, dispatch );
}


export default connect( mapStateToProps, mapDispatchToProps )( ScreenSettings );
