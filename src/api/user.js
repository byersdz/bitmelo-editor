import axios from 'axios';

import { BASE_URL } from './endpoints';
import catchErrors from './catchErrors';

export async function createUser( userName, email, password, allowPromotionalEmails ) {
  try {
    const response = await axios.post( `${ BASE_URL }/api/user`, {
      userName,
      email,
      password,
      allowPromotionalEmails,
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
    }, { withCredentials: true } );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}

export async function deleteUser( userId, password ) {
  try {
    const response = await axios.delete( `${ BASE_URL }/api/user/${ userId }`, {
      password,
    } );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}
