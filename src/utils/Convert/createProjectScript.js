
import { libText, Builder } from 'bitmelo';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

export default function createProjectScript( projectData, options = {} ) {
  const isGenerator = get( options, 'isGenerator' );

  const projectCopy = cloneDeep( projectData );
  if ( projectCopy.tileset.present ) {
    projectCopy.tileset = projectCopy.tileset.present;
  }
  if ( projectCopy.tilemap.present ) {
    projectCopy.tilemap = projectCopy.tilemap.present;
  }

  const { scripts } = projectCopy.code;
  delete projectCopy.code;
  let scriptsString = '';

  for ( let i = 0; i < scripts.length; i += 1 ) {
    scriptsString += scripts[i].text;
  }

  scriptsString = Builder.instrumentScript( scriptsString );

  const isGeneratorCodePreCode = isGenerator ? (
    `
    engine.clickToBegin = false;
    engine.dataOnlyMode = true;
    engine.pause();
    `
  ) : '';

  const isGeneratorCodePostCode = isGenerator ? (
    `
    for(let i = 0; i < 60; i += 1) {
      engine.advanceFrame();
    }
    `
  ) : '';

  return `
${ libText }

const engine = new bitmelo.Engine();
const projectData = ${ JSON.stringify( projectCopy ) };
engine.addProjectData( projectData );

${ scriptsString }
${ isGeneratorCodePreCode }
engine.begin();
${ isGeneratorCodePostCode }
`;
}
