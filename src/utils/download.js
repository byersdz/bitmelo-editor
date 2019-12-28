
import cloneDeep from 'lodash.clonedeep';

import storeRegistry from '../state/storeRegistry';
import createHTMLGame from './Convert/createHTMLGame';
import compressProjectState from './Convert/compressProjectState';

export const downloadJSON = ( jsonObject, fileName ) => {
  const jsonString = JSON.stringify( jsonObject );
  const dataString = `data:text/json;charset=utf-8,${ encodeURIComponent( jsonString ) }`;
  const anchorNode = document.createElement( 'a' );
  anchorNode.setAttribute( 'href', dataString );
  anchorNode.setAttribute( 'download', fileName );
  document.body.appendChild( anchorNode );
  anchorNode.click();
  anchorNode.remove();
};

export const downloadSoundData = () => {
  const state = storeRegistry.getStore().getState();
  downloadJSON( state.sound.sounds, 'sounds.json' );
};

export const downloadProjectData = () => {
  const state = storeRegistry.getStore().getState();

  // get rid of undo data
  const compressedState = compressProjectState( state );
  const projectName = compressedState.project.name;
  downloadJSON( compressedState, `${ projectName }.project.json` );
};

export function downloadHTMLGame() {
  const state = cloneDeep( storeRegistry.getStore().getState() );
  // get rid of undo data
  state.tileset = state.tileset.present;
  state.tilemap = state.tilemap.present;
  const projectName = state.project.name;

  const htmlGame = createHTMLGame( state );
  const dataString = `data:text/json;charset=utf-8,${ encodeURIComponent( htmlGame ) }`;
  const anchorNode = document.createElement( 'a' );
  anchorNode.setAttribute( 'href', dataString );
  anchorNode.setAttribute( 'download', `${ projectName }.html` );
  document.body.appendChild( anchorNode );
  anchorNode.click();
  anchorNode.remove();
}
