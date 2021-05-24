
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../components/Button/Button';
import AButton from '../../../../../components/AButton/AButton';

import './PaletteItem.scss';


class PaletteItem extends React.PureComponent {
  render() {
    const {
      name,
      author,
      link,
      colors,
      onImport,
    } = this.props;

    const colorsRender = colors.map( c => {
      return (
        <div
          className="color"
          style={
            {
              backgroundColor: `#${ c }`,
            }
          }
        />
      );
    } );

    let authorRender = null;

    if ( author ) {
      if ( link ) {
        authorRender = (
          <div className="author">
            { 'by: ' }
            <AButton href={ link }>
              { author }
            </AButton>
          </div>
        );
      }
      else {
        authorRender = (
          <div className="author">
            { `by: ${ author }` }
          </div>
        );
      }
    }

    return (
      <div className="palette-item">
        <div className="name">
          { name }
        </div>
        { authorRender }
        <div className="color-container">
          { colorsRender }
        </div>
        <Button
          standard
          click={ () => onImport( colors ) }
        >
          Import
        </Button>
        <hr />
      </div>
    );
  }
}

PaletteItem.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string,
  link: PropTypes.string,
  colors: PropTypes.arrayOf( PropTypes.string ).isRequired,
  onImport: PropTypes.func.isRequired,
};

PaletteItem.defaultProps = {
  author: '',
  link: '',
};

export default PaletteItem;
