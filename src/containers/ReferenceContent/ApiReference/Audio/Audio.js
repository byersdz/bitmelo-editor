
import React from 'react';

import Property from '../Property/Property';
import Method from '../Method/Method';

import './Audio.scss';

class Audio extends React.Component {
  render() {
    const soundIndexParameter = {
      name: 'soundIndex',
      type: 'number',
      description: 'The index of the sound to be played',
    };

    const noteParameter = {
      name: 'note',
      type: 'number',
      description: 'The note played',
    };

    const durationParameter = {
      name: 'duration',
      type: 'number',
      description: `How many tics of the sound to play.
      Each sound has 32 tics, however you can use a longer duration than 32`,
    };

    const volumeParameter = {
      name: 'volume',
      type: 'number',
      description: 'The volume to play the sound at. Between 0 and 1',
    };

    const speedParameter = {
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
    };

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
        <Property
          name="audio.context"
          type="AudioContext"
          description="The AudioContext used. Automatically created in init."
        />
        <Property
          name="audio.lookAheadTime"
          type="number"
          description="Time in seconds we should look ahead during update to add audio events to the context."
          example={
`
audio.lookAheadTime = 0.05;
`
          }
        />
        <Property
          name="audio.sounds"
          type="[bitmelo.Sound]"
          description="Array of sounds used, of the Sound class type. Add a sound from data using the addSound method."
        />
        <h2>Methods</h2>
        <Method
          name="audio.addSound"
          description={
`
Add a Sound instance to the sounds array from data.
All sounds created in the editor are automatically added for you.
`
          }
          example={
`
audio.addSound( myCoolSound );
`
          }
          params={
            [
              {
                name: 'soundData',
                type: 'object',
                description: 'The sound data object. This is most likely created by the Editor',
              },
            ]
          }
        />
        <Method
          name="audio.init"
          description={
`
Initialize the audio context. Called automatically by the Engine.
`
          }
          example={
`
audio.init();
`
          }
        />
        <Method
          name="audio.playSound"
          description={
`
Play a sound.
`
          }
          example={
`
audio.playSound(
  0,                // soundIndex
  bitmelo.Notes.C4, // note
  64,               // duration
  0.5,              // volume
  2                 // speed
);
`
          }
          params={
            [
              soundIndexParameter,
              noteParameter,
              durationParameter,
              volumeParameter,
              speedParameter,
            ]
          }
        />
        <Method
          name="audio.playInfiniteSound"
          description={
`
Play a sound infinitely. Only one instance of a sound at each index can be played at a time.
`
          }
          example={
`
audio.playInfiniteSound(
  0,                // soundIndex
  bitmelo.Notes.C4, // note
  0.5,              // volume
  2                 // speed
);
`
          }
          params={
            [
              soundIndexParameter,
              noteParameter,
              volumeParameter,
              speedParameter,
            ]
          }
        />
        <Method
          name="audio.stopInfiniteSound"
          description={
`
Stop a sound that is being played infinitely.
Automatically called when playInfiniteSound is called while an infinite sound is currently playing at the soundIndex.
`
          }
          example={
`
audio.stopInfiniteSound( 0 );
`
          }
          params={
            [
              {
                name: 'soundIndex',
                type: 'number',
                description: 'The index of the sound to be stopped',
              },
            ]
          }
        />
        <Method
          name="audio.stopAllInfiniteSounds"
          description={
`
Stop all infinitely playing sounds
`
          }
          example={
`
audio.stopAllInfiniteSounds();
`
          }
        />
        <Method
          name="audio.update"
          description={
`
Update audio events. Called automatically by the Engine in the update loop.
`
          }
          example={
`
audio.update();
`
          }
        />
      </div>
    );
  }
}

export default Audio;
