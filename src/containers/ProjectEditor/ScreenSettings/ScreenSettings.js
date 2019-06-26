
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Screen } from 'bitmelo';

import Card from 'Components/Card/Card';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import Select from 'Components/Select/Select';

import { setScreenSettings } from 'State/Project/screen';

import './ScreenSettings.scss';

class ScreenSettings extends React.Component {
  handleScaleModeChange( value ) {
    const { _setScreenSettings, screen } = this.props;
    _setScreenSettings( { ...screen, scaleMode: Number.parseInt( value, 10 ) } );
  }

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

    const scaleModeItems = [
      {
        value: Screen.SCALE_CONSTANT.toString(),
        display: 'Constant',
      },
      {
        value: Screen.SCALE_FIT_WINDOW.toString(),
        display: 'Fit Window',
      },
    ];

    return (
      <Card className="screen-settings">
        <Select
          items={ scaleModeItems }
          title="Scale Mode"
          value={ screen.scaleMode.toString() }
          onValueChange={ v => this.handleScaleModeChange( v ) }
        />
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
