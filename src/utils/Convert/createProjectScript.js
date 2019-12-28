
import { libText } from 'bitmelo';
import cloneDeep from 'lodash.clonedeep';

export default function createProjectScript( projectData ) {
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

  return `
${ libText }

const engine = new bitmelo.Engine();
const projectData = ${ JSON.stringify( projectCopy ) };
engine.addProjectData( projectData );

${ scriptsString }

engine.begin();
`;
}
