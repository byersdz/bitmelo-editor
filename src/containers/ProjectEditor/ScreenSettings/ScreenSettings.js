
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Screen } from 'bitmelo';

import Card from 'Components/Card/Card';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import Select from 'Components/Select/Select';
import Checkbox from 'Components/Checkbox/Checkbox';

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

  handleScaleChange( value ) {
    const { _setScreenSettings, screen } = this.props;
    _setScreenSettings( { ...screen, scale: value } );
  }

  handleMinScaleChange( value ) {
    const { _setScreenSettings, screen } = this.props;
    _setScreenSettings( { ...screen, minScale: value } );
  }

  handleMaxScaleChange( value ) {
    const { _setScreenSettings, screen } = this.props;
    _setScreenSettings( { ...screen, maxScale: value } );
  }

  handleHorizontalCushionChange( value ) {
    const { _setScreenSettings, screen } = this.props;
    _setScreenSettings( { ...screen, horizontalScaleCushion: value } );
  }

  handleVerticalCushionChange( value ) {
    const { _setScreenSettings, screen } = this.props;
    _setScreenSettings( { ...screen, verticalScaleCushion: value } );
  }

  handleRescaleOnWindowResizeChange( value ) {
    const { _setScreenSettings, screen } = this.props;
    _setScreenSettings( { ...screen, rescaleOnWindowResize: value } );
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

    const scaleRender = screen.scaleMode === Screen.SCALE_CONSTANT ? (
      <NumberPicker
        title="Scale"
        value={ screen.scale }
        minValue={ 1 }
        maxValue={ 100 }
        onValueChange={ v => this.handleScaleChange( v ) }
      />
    ) : null;

    const minMaxScaleRender = screen.scaleMode !== Screen.SCALE_CONSTANT ? (
      <Fragment>
        <NumberPicker
          title="Min Scale"
          value={ screen.minScale }
          minValue={ 1 }
          maxValue={ 100 }
          onValueChange={ v => this.handleMinScaleChange( v ) }
        />
        <NumberPicker
          title="Max Scale"
          value={ screen.maxScale }
          minValue={ 1 }
          maxValue={ 100 }
          onValueChange={ v => this.handleMaxScaleChange( v ) }
        />
        <NumberPicker
          title="Horizontal Cushion"
          value={ screen.horizontalScaleCushion }
          minValue={ 0 }
          maxValue={ 1000 }
          onValueChange={ v => this.handleHorizontalCushionChange( v ) }
        />
        <NumberPicker
          title="Vertical Cushion"
          value={ screen.verticalScaleCushion }
          minValue={ 0 }
          maxValue={ 1000 }
          onValueChange={ v => this.handleVerticalCushionChange( v ) }
        />
        <Checkbox
          title="Rescale on Window Resize"
          checked={ screen.rescaleOnWindowResize }
          onChange={ v => this.handleRescaleOnWindowResizeChange( v ) }
        />
      </Fragment>
    ) : null;

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
        { scaleRender }
        { minMaxScaleRender }
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
