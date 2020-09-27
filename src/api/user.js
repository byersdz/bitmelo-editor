import axios from 'axios';

import { BASE_URL } from './endpoints';
import catchErrors from './catchErrors';

export async function createUser(
  userName,
  email,
  password,
  allowPromotionalEmails,
  phoneNumber,
  lastName,
) {
  try {
    const response = await axios.post( `${ BASE_URL }/api/users`, {
      userName,
      email,
      password,
      allowPromotionalEmails,
      phoneNumber,
      lastName,
    }, { withCredentials: true } );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}

export async function loginUser( email, password ) {
  try {
    const response = await axios.post( `${ BASE_URL }/api/auth/login`, {
      email,
      password,
    }, { withCredentials: true } );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}

export async function logoutUser() {
  try {
    const response = await axios.get(
      `${ BASE_URL }/api/auth/logout`,
      { withCredentials: true },
    );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}

export async function checkIfLoggedIn() {
  try {
    const response = await axios.get(
      `${ BASE_URL }/api/auth/check`,
      { withCredentials: true },
    );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}

export async function deleteUser( userId, password ) {
  try {
    const response = await axios.delete(
      `${ BASE_URL }/api/users/${ userId }`, {
        data: { password },
        withCredentials: true,
      },
    );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}

export async function changePassword( userId, oldPassword, newPassword, newPassword2 ) {
  try {
    const response = await axios.put( `${ BASE_URL }/api/users/${ userId }/password`, {
      oldPassword,
      newPassword,
      newPassword2,
    }, { withCredentials: true } );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}
