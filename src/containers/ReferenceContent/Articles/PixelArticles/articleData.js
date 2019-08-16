
import OneBit from './saint11/1-bit.gif';
import FourLegWalk from './saint11/4LegsWalk.gif';
import AttackSheet from './saint11/AttackSheet.gif';
import Blood from './saint11/Blood.gif';
import Breaking from './saint11/Breaking.gif';
import Bullets from './saint11/Bullets.gif';
import Idle from './saint11/characterIdle.gif';
import City from './saint11/City.gif';

export const SAINT_11 = 'SAINT_11';

const articleData = [];

function addItem( image, title, creator, key ) {
  articleData.push( {
    image,
    title,
    creator,
    key,
  } );
}

addItem( OneBit, '1-bit', SAINT_11, 'onebit' );
addItem( FourLegWalk, 'Quadruped Walk', SAINT_11, 'quadwalk' );
addItem( AttackSheet, 'Attack Animation', SAINT_11, 'attackanim' );
addItem( Blood, 'Blood and Guts', SAINT_11, 'bloodguts' );
addItem( Breaking, 'Breaking Objects', SAINT_11, 'breakingobjects' );
addItem( Bullets, 'Bullets', SAINT_11, 'bullets' );
addItem( Idle, 'Character Idle', SAINT_11, 'charidle' );
addItem( City, 'City Backgrounds', SAINT_11, 'cityback' );


export default articleData;
