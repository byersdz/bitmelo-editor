
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../components/Button/Button';

import './PaletteItem.scss';


class PaletteItem extends React.PureComponent {
  render() {
    const { name, author, colors } = this.props;

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

    return (
      <div className="palette-item">
        <div className="name">
          { name }
        </div>
        <div className="author">
          { `by: ${ author }` }
        </div>
        <div className="color-container">
          { colorsRender }
        </div>
        <Button
          standard
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
  colors: PropTypes.arrayOf( PropTypes.string ).isRequired,
};

PaletteItem.defaultProps = {
  author: '',
};

export default PaletteItem;
