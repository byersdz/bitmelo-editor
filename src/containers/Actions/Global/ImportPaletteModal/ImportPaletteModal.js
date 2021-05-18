
import React from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';
import Select from '../../../../components/Select/Select';
import PaletteItem from './PaletteItem/PaletteItem';
import palettes from './palettes';

import { addPaletteColorSet } from '../../../../state/Palette/colors';
import { replacePalette } from '../../../../state/globalActions';

import { rgbToHex } from '../../../../utils/hexConvert';

import './ImportPaletteModal.scss';

class ImportPaletteModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      file: null,
      errorText: '',
      importMode: 'replace',
    };
  }

  handleImportColors( colors ) {
    const {
      _addPaletteColorSet,
      _replacePalette,
      onClose,
      existingPalette,
    } = this.props;
    const { importMode } = this.state;

    if ( colors.length > 255 ) {
      this.setState( { errorText: 'Too many colors' } );
      return;
    }

    if ( importMode === 'add' ) {
      _addPaletteColorSet( colors );
    }
    else if ( importMode === 'replace' ) {
      _replacePalette( colors, existingPalette );
    }

    onClose();
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
                const hexString = rgbToHex( data[0], data[1], data[2] );
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
    const { file, errorText, importMode } = this.state;

    const importButtonRender = file ? (
      <Button
        title="Import"
        click={ () => this.handleImportFile() }
        standard
      />
    ) : null;

    const palettesRender = palettes.map( p => {
      return (
        <PaletteItem
          name={ p.name }
          author={ p.author }
          link={ p.link }
          colors={ p.colors }
        />
      );
    } );

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
          <div className="import-mode-container">
            <Select
              title="Import Mode"
              items={
                [
                  {
                    value: 'replace',
                    display: 'Replace Colors',
                  },
                  {
                    value: 'add',
                    display: 'Add Colors',
                  },
                ]
              }
              value={ importMode }
              onValueChange={ v => this.setState( { importMode: v } ) }
            />
          </div>
          <div className="import-from-png">Import from PNG:</div>
          <input
            type="file"
            onChange={ e => this.handleFileChange( e ) }
            accept=".png"
          />
          { importButtonRender }
          <hr />
          { palettesRender }
        </div>
      </Modal>
    );
  }
}

ImportPaletteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  _addPaletteColorSet: PropTypes.func.isRequired,
  _replacePalette: PropTypes.func.isRequired,
  existingPalette: PropTypes.arrayOf( PropTypes.string ).isRequired,
};

function mapStateToProps( state ) {
  return {
    existingPalette: state.palette.colors,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _addPaletteColorSet: addPaletteColorSet,
    _replacePalette: replacePalette,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ImportPaletteModal );
