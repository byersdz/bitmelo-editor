
let url = 'https://api.bitmelo.com';

if ( IS_DEV ) {
  url = 'http://localhost:5000';
}

export const BASE_URL = url;
