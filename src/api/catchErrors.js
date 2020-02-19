import has from 'lodash.has';

export default function catchErrors( err ) {
  let errors = [{ msg: 'Unknown Error' }];
  if ( has( err, 'response.data.errors' ) ) {
    if ( Array.isArray( err.response.data.errors ) ) {
      errors = err.response.data.errors;
    }
  }
  return {
    isError: true,
    errors,
  };
}
