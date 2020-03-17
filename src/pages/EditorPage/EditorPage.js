
import React from 'react';

import NavigationTab from '../../containers/NavigationTab/NavigationTab';
import MainContainer from '../../containers/MainContainer/MainContainer';
import ReferenceTab from '../../containers/ReferenceTab/ReferenceTab';
import BitmeloAudio from '../../containers/BitmeloAudio/BitmeloAudio';

import './EditorPage.scss';

class EditorPage extends React.Component {
  constructor( props ) {
    super( props );
    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener( 'keydown', this.handleKeyDown );
  }

  handleKeyDown( event ) {
    if ( event.which === 83 ) { // s
      if ( event.ctrlKey ) {
        // do nothing when the user attempts to save
        // avoids the annoying save website popup
        event.preventDefault();
      }
    }
  }

  render() {
    return (
      <div id="editor-page">
        <NavigationTab />
        <MainContainer />
        <ReferenceTab />
        <BitmeloAudio />
      </div>
    );
  }
}

export default EditorPage;
