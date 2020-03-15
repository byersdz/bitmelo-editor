
import axios from 'axios';

import { BASE_URL } from './endpoints';
import { updateProject } from './project';
import catchErrors from './catchErrors';

export async function publishGame( projectId, projectData ) {
  const updateResponse = await updateProject( projectId, projectData );

  if ( updateResponse.isError ) {
    // return errors from update
    return updateResponse;
  }
  else {
    try {
      const publishResponse = await axios.post( `${ BASE_URL }/api/games`, { projectId }, { withCredentials: true } );
      return publishResponse;
    }
    catch ( err ) {
      return catchErrors( err );
    }
  }
}
