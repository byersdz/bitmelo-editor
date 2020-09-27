import has from 'lodash.has';

export default function catchErrors( err ) {
  let errors = [{ msg: 'Unknown Error' }];
  let status = 400;

  if ( has( err, 'response.data.errors' ) ) {
    if ( Array.isArray( err.response.data.errors ) ) {
      errors = err.response.data.errors;
    }
  }
  if ( has( err, 'response.status' ) ) {
    status = err.response.status;
  }

  return {
    isError: true,
    errors,
    status,
  };
}
