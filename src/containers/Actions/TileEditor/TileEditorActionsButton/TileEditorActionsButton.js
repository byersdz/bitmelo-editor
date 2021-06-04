
import React from 'react';

import ActionsButton from '../../ActionsButton/ActionsButton';
import ExportImageModal from '../ExportImageModal/ExportImageModal';
import ImportPaletteModal from '../../Global/ImportPaletteModal/ImportPaletteModal';

class TileEditorActionsButton extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      dropDownIsOpen: false,
      exportImageModalIsOpen: false,
      importPaletteModalIsOpen: false,
    };
  }

  render() {
    const { exportImageModalIsOpen, importPaletteModalIsOpen, dropDownIsOpen } = this.state;

    const items = [
      {
        key: 'import-palette',
        display: 'Import Palette',
      },
      {
        key: 'export-image',
        display: 'Export PNG',
      },
    ];

    const exportImageModalRender = exportImageModalIsOpen ? (
      <ExportImageModal
        onClose={ () => this.setState( { exportImageModalIsOpen: false } ) }
      />
    ) : null;

    const importPaletteModalRender = importPaletteModalIsOpen ? (
      <ImportPaletteModal
        onClose={ () => this.setState( { importPaletteModalIsOpen: false } ) }
      />
    ) : null;

    return (
      <>
        <ActionsButton
          ref={ this.buttonRef }
          items={ items }
          id="tile-editor-actions-btn"
          dropDownIsOpen={ dropDownIsOpen }
          onDropDownChange={ v => this.setState( { dropDownIsOpen: v } ) }
          onSelect={ k => {
            if ( k === 'export-image' ) {
              this.setState( { exportImageModalIsOpen: true } );
            }
            else if ( k === 'import-palette' ) {
              this.setState( { importPaletteModalIsOpen: true } );
            }

            this.setState( { dropDownIsOpen: false } );
          } }
        />
        { exportImageModalRender }
        { importPaletteModalRender }
      </>
    );
  }
}

export default TileEditorActionsButton;
