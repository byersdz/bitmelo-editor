
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Checkbox from '../../../components/Checkbox/Checkbox';

import { setReferenceTabTitle } from '../../../state/Layout/referenceTabTitle';
import { setMiscSettings } from '../../../state/Project/misc';

import './Motivation.scss';

// https://pixabay.com/photos/dog-sad-waiting-floor-sad-dog-pet-2785074/
import PuppyImage from './img/puppy.png';
import StrongIndependent from './img/strong-independent.png';
// https://pixabay.com/photos/adorable-red-panda-animal-cute-1851650/
import RedPanda from './img/red-panda.png';
// https://pixabay.com/photos/youth-active-jump-happy-sunrise-570881/
import DoIt from './img/do-it.png';
// https://pixabay.com/photos/kitty-cat-kitten-pet-animal-cute-551554/
import Kitten from './img/kitten.png';
// https://pixabay.com/photos/hedgehog-animal-baby-cute-small-468228/
import Hedgehog from './img/hedgehog.png';
// https://pixabay.com/photos/mallard-ducklings-duck-chicks-cute-3524213/
import Duck from './img/duck.png';
// https://pixabay.com/photos/giraffe-baby-giraffe-mammal-1024589/
import Giraffe from './img/giraffe.png';
// https://pixabay.com/photos/cat-dachowiec-kitten-kocurek-4294780/
import Kitten2 from './img/kitten2.png';


// Negative motivation images

// https://pixabay.com/photos/business-businessman-male-work-2879465/
import BackToWork from './img/back-to-work.png';
// https://pixabay.com/photos/dog-angry-teeth-danger-breed-2414477/
import NotFinished from './img/not-finished.png';
// https://pixabay.com/photos/military-drill-instructor-662863/
import DrillInstructor from './img/drill-instructor.png';
// https://pixabay.com/photos/military-drill-instructor-662862/
import DrillInstructor2 from './img/drill-instructor2.png';

const images = [
  PuppyImage,
  StrongIndependent,
  RedPanda,
  DoIt,
  Kitten,
  Hedgehog,
  Duck,
  Giraffe,
  Kitten2,
];

const negativeImages = [
  BackToWork,
  NotFinished,
  DrillInstructor,
  DrillInstructor2,
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
