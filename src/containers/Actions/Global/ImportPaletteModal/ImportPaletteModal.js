
import React from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';

import { addPaletteColorSet } from '../../../../state/Palette/colors';

import './ImportPaletteModal.scss';

class ImportPaletteModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      file: null,
      errorText: '',
    };
  }

  handleImportColors( colors ) {
    const { _addPaletteColorSet } = this.props;
    _addPaletteColorSet( colors );
  }

  handleFileChange( event ) {
    this.setState( { errorText: '' } );
    const file = event.target.files[0];
    if ( file ) {
      this.setState( { file } );
    }
    else {
      this.setState( { file: null } );
    }
  }

  handleImportFile() {
    const { file } = this.state;
    if ( file ) {
      const reader = new FileReader();

      reader.addEventListener( 'load', () => {
        const image = new Image();
        const src = reader.result;
        image.src = src;

        image.onload = () => {
          const { width, height } = image;
          const maxSize = 256;
          if ( width > maxSize || height > maxSize ) {
            this.setState( { errorText: 'Max image size is 256' } );
          }
          else {
            const canvas = document.createElement( 'canvas' );
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext( '2d' );
            context.drawImage( image, 0, 0, width, height );
            const colorMap = {};
            for ( let y = 0; y < height; y += 1 ) {
              for ( let x = 0; x < width; x += 1 ) {
                const { data } = context.getImageData( x, y, 1, 1 );
                const hexString = `${ data[0].toString( 16 ) }${ data[1].toString( 16 ) }${ data[2].toString( 16 ) }`;
                colorMap[hexString] = true;
              }
            }
            const colorSet = keys( colorMap );
            this.handleImportColors( colorSet );
          }
        };
      } );

      reader.readAsDataURL( file );
    }
  }

  render() {
    const { onClose } = this.props;
    const { file, errorText } = this.state;

    const importButtonRender = file ? (
      <Button
        title="Import"
        click={ () => this.handleImportFile() }
        standard
      />
    ) : null;

    return (
      <Modal
        className="import-palette-modal"
        title={ 'Import Palette' }
        showHeader
        onClose={ onClose }
      >
        <div className="warning">
          { errorText }
        </div>
        <div className="modal-controls">
          <input
            type="file"
            onChange={ e => this.handleFileChange( e ) }
            accept=".png"
          />
          { importButtonRender }
        </div>
      </Modal>
    );
  }
}

ImportPaletteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  _addPaletteColorSet: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _addPaletteColorSet: addPaletteColorSet,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( ImportPaletteModal );
