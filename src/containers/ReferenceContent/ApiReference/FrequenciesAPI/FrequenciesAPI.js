
import React from 'react';

import { Notes, Frequencies } from 'bitmelo';

import './FrequenciesAPI.scss';

class FrequenciesAPI extends React.Component {
  render() {
    const valuesRender = Object.keys( Notes ).map( note => {
      return (
        <div className="freq-item" key={ note }>
          <div className="note">
            { `Frequencies[ bitmelo.Notes.${ note } ] =` }
          </div>
          <div className="freq">
            { ` ${ Frequencies[Notes[note]] }` }
          </div>
        </div>
      );
    } );

    return (
      <div className="api-frequencies">
        <div className="description">
          {
`
Array of Frequency values for notes.
`
          }
        </div>
        <h2>Values</h2>
        { valuesRender }
      </div>
    );
  }
}

export default FrequenciesAPI;
