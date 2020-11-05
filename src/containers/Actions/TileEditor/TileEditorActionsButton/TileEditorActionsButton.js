
import React from 'react';

import ActionsButton from '../../ActionsButton/ActionsButton';

class TileEditorActionsButton extends React.Component {
  render() {
    const items = [
      {
        key: 'export-png',
        display: 'Export PNG',
      },
      {
        key: 'test-1',
        display: 'Test 1',
      },
    ];
    return <ActionsButton items={ items } id="tile-editor-actions-btn" />;
  }
}

export default TileEditorActionsButton;
