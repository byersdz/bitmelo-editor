
import React from 'react';

import { Notes } from 'bitmelo';

import './NotesAPI.scss';

class NotesAPI extends React.Component {
  render() {
    const valuesRender = Object.keys( Notes ).map( note => {
      return (
        <div className="notes-item" key={ note }>
          <div className="note">
            { `Notes.${ note } =` }
          </div>
          <div className="value">
            { ` ${ Notes[note] }` }
          </div>
        </div>
      );
    } );

    return (
      <div className="api-notes">
        <div className="description">
          {
`
Object containing music note constants
`
          }
        </div>
        <h2>Values</h2>
        { valuesRender }
      </div>
    );
  }
}

export default NotesAPI;
