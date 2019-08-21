
import React from 'react';

import { renderProperty, renderMethod } from 'Utils/renderAPI'; // eslint-disable-line

import './Audio.scss';

class Audio extends React.Component {
  render() {
    return (
      <div className="api-audio">
        <div className="description">
          {
`
Handles playing of audio and adding audio data.
`
          }
        </div>
        <h2>Properties</h2>
        {
          renderProperty(
            'audio.context',
            'AudioContext',
            'The AudioContext used. Automatically created in init.',
            null,
          )
        }
        {
          renderProperty(
            'audio.lookAheadTime',
            'number',
            'Time in seconds we should look ahead during update to add audio events to the context.',
            `
audio.lookAheadTime = 0.05;
            `,
          )
        }
        {
          renderProperty(
            'audio.sounds',
            '[bitmelo.Sound]',
            'Array of sounds used, of the Sound class type. Add a sound from data using the addSound method.',
          )
        }
        <h2>Methods</h2>
        {
          renderMethod( 'audio.addSound',
            [
              {
                name: 'soundData',
                type: 'object',
                description: 'The sound data object. This is most likely created by the Editor',
              },
            ],
            `Add a Sound instance to the sounds array from data.
            All sounds created in the editor are automatically added for you.`,
            `
audio.addSound( myCoolSound );
            ` )
        }
        {
          renderMethod(
            'audio.init',
            null,
            'Initialize the audio context. Called automatically by the Engine.',
            `
audio.init();
            `,
          )
        }
        {
          renderMethod( 'audio.playSound',
            [
              {
                name: 'soundIndex',
                type: 'number',
                description: 'The index of the sound to be played',
              },
              {
                name: 'note',
                type: 'number',
                description: 'The note played',
              },
              {
                name: 'duration',
                type: 'number',
                description: `How many tics of the sound to play.
                Each sound has 32 tics, however you can use a longer duration than 32`,
              },
              {
                name: 'volume',
                type: 'number',
                description: 'The volume to play the sound at. Between 0 and 1',
              },
              {
                name: 'speed',
                type: 'number',
                description: `The speed to play the sound at.
                The full 32 tic duration for each speed is:
                -4: 3 seconds,
                -3: 2.5 seconds,
                -2: 2 seconds,
                -1: 1.5 seconds,
                0: 1 second,
                1: 0.75 seconds,
                2: 0.5 seconds,
                3: 0.25 seconds
                `,
              },
            ],
            `Add a Sound instance to the sounds array from data.
            All sounds created in the editor are automatically added for you.`,
            `
audio.addSound( myCoolSound );
            ` )
        }
      </div>
    );
  }
}

export default Audio;
