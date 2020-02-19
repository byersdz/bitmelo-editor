import axios from 'axios';

import { BASE_URL } from './endpoints';
import catchErrors from './catchErrors';

export async function createUser( userName, email, password ) {
  try {
    const response = await axios.post( `${ BASE_URL }/api/user`, {
      userName,
      email,
      password,
    } );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}

export async function loginUser( email, password ) {
  try {
    const response = await axios.post( `${ BASE_URL }/api/login`, {
      email,
      password,
    } );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}
