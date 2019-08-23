
import React from 'react';

import { Keys } from 'bitmelo';

import './KeysAPI.scss';

class KeysAPI extends React.Component {
  render() {
    const valuesRender = Object.keys( Keys ).map( key => {
      if ( key !== 'codesToKeyCodes' ) {
        return (
          <div className="keys-item" key={ key }>
            <div className="key">
              { `Keys.${ key } =` }
            </div>
            <div className="value">
              { ` ${ Keys[key] }` }
            </div>
          </div>
        );
      }

      return null;
    } );

    const codesValuesRender = Object.keys( Keys.codesToKeyCodes ).map( key => {
      return (
        <div className="keys-item" key={ key }>
          <div className="key">
            { `Keys.codesToKeyCodes.${ key } =` }
          </div>
          <div className="value">
            { ` ${ Keys.codesToKeyCodes[key] }` }
          </div>
        </div>
      );
    } );

    return (
      <div className="api-keys">
        <div className="description">
          {
`
Object containing keyboard key constants. Maps to values returned by event.which in keyboard events.
Keys.codesToKeyCodes maps values returned by event.code to values used by event.which in keyboard events.
`
          }
        </div>
        <h2>Values</h2>
        { valuesRender }
        <h2>Keys.codesToKeyCodes Values</h2>
        { codesValuesRender }
      </div>
    );
  }
}

export default KeysAPI;
