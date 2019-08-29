
import React from 'react';

import Property from '../Property/Property';

import './SoundAPI.scss';

class SoundAPI extends React.Component {
  render() {
    return (
      <div className="api-sound">
        <div className="description">
          {
`
Represents a sound that can be played.
`
          }
        </div>
        <h2>Properties</h2>
        <h3>Volume</h3>
        <Property
          name="sound.volumeTics"
          type="[number]"
          description={
`
Array of volume values for the duration of the sound.
Each value must be 0 to 15. Length of the array must always be 32.
`
          }
        />
        <Property
          name="sound.useVolumeLoop"
          type="boolean"
          description={
  `
  Should we loop over the volumeTics when playing a sound?
  If false the last volume tic will be played infinitely once reaching it.
  `
          }
        />
        <Property
          name="sound.volumeLoopStart"
          type="number"
          description={
  `
  The volumeTics index we will start looping at if useVolumeLoop is true.
  `
          }
        />
        <Property
          name="sound.volumeLoopEnd"
          type="number"
          description={
  `
  The volumeTics index we will stop looping at if useVolumeLoop is true.
  `
          }
        />
        <Property
          name="sound.lastVolumeTic"
          type="number"
          description={
  `
  The last volume tic played.
  `
          }
        />
        <h3>Pitch</h3>
        <Property
          name="sound.pitchTics"
          type="[number]"
          description={
`
Array of pitch values for the duration of the sound.
Each value must be -10 to 10. Length of the array must always be 32.
`
          }
        />
        <Property
          name="sound.usePitchLoop"
          type="boolean"
          description={
  `
  Should we loop over the pitchTics when playing a sound?
  If false the last pitch tic will be played infinitely once reaching it.
  `
          }
        />
        <Property
          name="sound.pitchLoopStart"
          type="number"
          description={
  `
  The pitchTics index we will start looping at if usePitchLoop is true.
  `
          }
        />
        <Property
          name="sound.pitchLoopEnd"
          type="number"
          description={
  `
  The pitchTics index we will stop looping at if usePitchLoop is true.
  `
          }
        />
        <Property
          name="sound.pitchScale"
          type="number"
          description={
  `
  The pitch scale used by the pitchTics. Value is in cents.
  `
          }
        />
        <Property
          name="sound.lastPitchTic"
          type="number"
          description={
  `
  The last pitch tic played.
  `
          }
        />
        <h3>Arpeggio</h3>
        <Property
          name="sound.arpTics"
          type="[number]"
          description={
`
Array of arp values for the duration of the sound.
Each value is the number of notes above or below the note of the sound. Length of the array must always be 32.
`
          }
        />
        <Property
          name="sound.useArpLoop"
          type="boolean"
          description={
  `
  Should we loop over the arpTics when playing a sound?
  If false the last arp tic will be played infinitely once reaching it.
  `
          }
        />
        <Property
          name="sound.arpLoopStart"
          type="number"
          description={
  `
  The arpTics index we will start looping at if useArpLoop is true.
  `
          }
        />
        <Property
          name="sound.arpLoopEnd"
          type="number"
          description={
  `
  The arpTics index we will stop looping at id useArpLoop is true.
  `
          }
        />
        <Property
          name="sound.lastArpTic"
          type="number"
          description={
  `
  The last arp tic played.
  `
          }
        />
        <h3>Infinite Sounds</h3>
        <Property
          name="sound.isPlayingInfiniteSound"
          type="boolean"
          description={
  `
  Is an infinite sound currently playing on this sound?
  `
          }
        />
        <Property
          name="sound.infiniteGain"
          type="GainNode"
          description={
  `
  The gain node of the current infinite sound.
  `
          }
        />
        <Property
          name="sound.infiniteNote"
          type="number"
          description={
  `
  The note of the current infinite sound.
  `
          }
        />
        <Property
          name="sound.infiniteOsc"
          type="OscillatorNode"
          description={
  `
  The oscillator node of the current infinite sound.
  `
          }
        />
        <Property
          name="sound.infiniteStartTime"
          type="number"
          description={
  `
  The start time of the current infinite sound.
  `
          }
        />
        <Property
          name="sound.infiniteTicDuration"
          type="number"
          description={
  `
  The duration of a tic in the current infinite sound.
  `
          }
        />
        <Property
          name="sound.infiniteTicsPlayed"
          type="number"
          description={
  `
  The number of tics played in the current infinite sound.
  `
          }
        />
        <Property
          name="sound.infiniteVolume"
          type="number"
          description={
  `
  The volume of the current infinite sound.
  `
          }
        />
        <h3>Other</h3>
        <Property
          name="sound.releaseLength"
          type="number"
          description={
  `
  Number of tics to ramp down playing of the sound. Must always be at least 1.
  `
          }
        />
        <Property
          name="sound.releaseMode"
          type="number"
          description={
  `
  The ramp type used when ramping down after stopping a sound.
  'linear' uses a linear ramp 'expo' uses an exponential ramp
  `
          }
        />
        <Property
          name="sound.wave"
          type="number"
          description={
  `
  The Wave index used by this sound. 0 is Sine. 1 is Triangle. 2 is Square. 3 is Sawtooth.
  `
          }
        />
      </div>
    );
  }
}

export default SoundAPI;
