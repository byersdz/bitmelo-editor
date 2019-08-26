
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Checkbox from 'Components/Checkbox/Checkbox';

import { setReferenceTabTitle } from 'State/Layout/referenceTabTitle';
import { setMiscSettings } from 'State/Project/misc';

import './Motivation.scss';

// https://pixabay.com/photos/dog-sad-waiting-floor-sad-dog-pet-2785074/
import PuppyImage from './img/puppy.png';
import StrongIndependent from './img/strong-independent.png';
// https://pixabay.com/photos/adorable-red-panda-animal-cute-1851650/
import RedPanda from './img/red-panda.png';
// https://pixabay.com/photos/youth-active-jump-happy-sunrise-570881/
import DoIt from './img/do-it.png';


// Negative motivation images

// https://pixabay.com/photos/business-businessman-male-work-2879465/
import BackToWork from './img/back-to-work.png';
// https://pixabay.com/photos/dog-angry-teeth-danger-breed-2414477/
import NotFinished from './img/not-finished.png';
// https://pixabay.com/photos/military-drill-instructor-662863/
import DrillInstructor from './img/drill-instructor.png';

const images = [
  PuppyImage,
  StrongIndependent,
  RedPanda,
  DoIt,
];

const negativeImages = [
  BackToWork,
  NotFinished,
  DrillInstructor,
];

class Motivation extends React.Component {
  constructor( props ) {
    super( props );

    const randomImageIndex = Math.floor( Math.random() * images.length );
    const randomNegaiveIndex = Math.floor( Math.random() * negativeImages.length );

    this.state = {
      imageIndex: randomImageIndex,
      negativeImageIndex: randomNegaiveIndex,
    };
  }

  componentDidMount() {
    const { _setReferenceTabTitle } = this.props;

    _setReferenceTabTitle( 'Motivation' );
  }

  handleNegativeClick( newValue ) {
    const { misc, _setMiscSettings } = this.props;
    _setMiscSettings( { ...misc, useNegativeMotivation: newValue } );
  }

  render() {
    const { misc } = this.props;
    const { imageIndex, negativeImageIndex } = this.state;

    const imageSrc = misc.useNegativeMotivation ? negativeImages[negativeImageIndex] : images[imageIndex];
    return (
      <div className="motivation">
        <img
          src={ imageSrc }
          alt="motivation"
        />
        <Checkbox
          title="for masochists"
          checked={ misc.useNegativeMotivation }
          onChange={ v => this.handleNegativeClick( v ) }
        />
      </div>
    );
  }
}

Motivation.propTypes = {
  _setReferenceTabTitle: PropTypes.func.isRequired,
  misc: PropTypes.object.isRequired,
  _setMiscSettings: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    misc: state.project.misc,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceTabTitle: setReferenceTabTitle,
    _setMiscSettings: setMiscSettings,
  }, dispatch );
}
export default connect( mapStateToProps, mapDispatchToProps )( Motivation );
