
import cloneDeep from 'lodash/cloneDeep';

import storeRegistry from '../state/storeRegistry';
import createHTMLGame from './Convert/createHTMLGame';
import compressProjectState from './Convert/compressProjectState';
import { drawPixelDataToCanvas } from './drawToCanvas';

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
  // remove the user data
  delete compressedState.user;

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

export function generatePngFromData( settings ) {
  const {
    width,
    height,
    scale,
  } = settings;

  const canvas = document.createElement( 'canvas' );
  canvas.setAttribute( 'width', width * scale );
  canvas.setAttribute( 'height', height * scale );
  drawPixelDataToCanvas( settings, canvas );

  const pngData = canvas.toDataURL();

  return pngData;
}

export function downloadDataImage( settings ) {
  const {
    fileName,
  } = settings;

  const pngData = generatePngFromData( settings );

  const anchorNode = document.createElement( 'a' );
  anchorNode.setAttribute( 'href', pngData );
  anchorNode.setAttribute( 'download', `${ fileName }.png` );
  document.body.appendChild( anchorNode );
  anchorNode.click();
  anchorNode.remove();
}
