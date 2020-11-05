
import React from 'react';

import ActionsButton from '../../ActionsButton/ActionsButton';
import ExportImageModal from '../ExportImageModal/ExportImageModal';

class TileEditorActionsButton extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      dropDownIsOpen: false,
      exportImageModalIsOpen: false,
    };
  }

  render() {
    const { exportImageModalIsOpen, dropDownIsOpen } = this.state;

    const items = [
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

            this.setState( { dropDownIsOpen: false } );
          } }
        />
        { exportImageModalRender }
      </>
    );
  }
}

export default TileEditorActionsButton;
