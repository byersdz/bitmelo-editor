
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';
import NumberPicker from '../../../../components/NumberPicker/NumberPicker';
import TextInput from '../../../../components/TextInput/TextInput';

import { getSelectedTileData } from '../../../../utils/tilesetHelpers';
import { downloadDataImage } from '../../../../utils/download';

class ExportImageModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      scale: 1,
      fileName: 'image',
    };
  }

  handleExportCanvas() {
    const { tileSize, tileset, palette } = this.props;
    const { scale, fileName } = this.state;

    const selectedData = getSelectedTileData( tileset, tileSize );
    selectedData.palette = palette;
    selectedData.dataWidth = selectedData.width;
    selectedData.dataHeight = selectedData.height;
    selectedData.scale = scale;
    selectedData.fileName = fileName;

    downloadDataImage( selectedData );
  }

  render() {
    const { onClose } = this.props;
    const { scale, fileName } = this.state;

    return (
      <Modal
        title={ 'Export PNG' }
        showHeader
        onClose={ onClose }
      >
        <div className="modal-controls">
          <TextInput
            title="File Name"
            value={ fileName }
            onValueChange={ v => this.setState( { fileName: v } ) }
            vertical
          />
          <NumberPicker
            title="Scale"
            value={ scale }
            minValue={ 1 }
            maxValue={ 8 }
            onValueChange={ v => this.setState( { scale: v } ) }
          />
          <Button
            title="Export"
            click={ () => this.handleExportCanvas() }
            standard
          />
        </div>
      </Modal>
    );
  }
}

ExportImageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  tileSize: PropTypes.number.isRequired,
  tileset: PropTypes.object.isRequired,
  palette: PropTypes.arrayOf( PropTypes.string ).isRequired,
};

function mapStateToProps( state ) {
  const { tileSize } = state.project;
  const { activeIndex } = state.tileset.present;
  const activeTileset = state.tileset.present.tilesets[activeIndex];
  return {
    tileset: activeTileset,
    tileSize,
    palette: state.palette.colors,
  };
}

export default connect( mapStateToProps )( ExportImageModal );
