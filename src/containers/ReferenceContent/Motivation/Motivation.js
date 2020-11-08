
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setReferenceTabTitle } from '../../../state/Layout/referenceTabTitle';

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

class Motivation extends React.Component {
  constructor( props ) {
    super( props );

    const randomImageIndex = Math.floor( Math.random() * images.length );

    this.state = {
      imageIndex: randomImageIndex,
    };
  }

  componentDidMount() {
    const { _setReferenceTabTitle } = this.props;

    _setReferenceTabTitle( 'Motivation' );
  }

  render() {
    const { imageIndex } = this.state;

    const imageSrc = images[imageIndex];
    return (
      <div className="motivation">
        <img
          src={ imageSrc }
          alt="motivation"
        />
      </div>
    );
  }
}

Motivation.propTypes = {
  _setReferenceTabTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceTabTitle: setReferenceTabTitle,
  }, dispatch );
}
export default connect( null, mapDispatchToProps )( Motivation );
