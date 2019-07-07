
export const RESET_PROJECT = 'RESET_PROJECT';

export function resetProject() {
  return {
    type: RESET_PROJECT,
  };
}

export const IMPORT_PROJECT_DATA = 'IMPORT_PROJECT_DATA';

export function importProjectData( data ) {
  return {
    type: IMPORT_PROJECT_DATA,
    payload: data,
  };
}
