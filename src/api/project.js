import axios from 'axios';

import { BASE_URL } from './endpoints';
import catchErrors from './catchErrors';


export async function createProject( projectData ) {
  try {
    const response = await axios.post( `${ BASE_URL }/api/projects`, projectData, { withCredentials: true } );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}
