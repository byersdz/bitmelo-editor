
import OneBit from './saint11/1-bit.gif';

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

export default articleData;
