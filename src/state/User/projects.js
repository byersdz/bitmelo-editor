
import cloneDeep from 'lodash.clonedeep';

import { getAllProjects, deleteProject, updateProject } from '../../api/project';

import createTransferProject from '../../utils/Convert/createTransferProject';

// Actions
export const SET_USER_PROJECTS = 'SET_USER_PROJECTS';
export const SET_USER_PROJECTS_FETCHING = 'SET_USER_PROJECTS_FETCHING';
export const SET_USER_PROJECTS_DELETING = 'SET_USER_PROJECTS_DELETING';
export const SET_USER_PROJECTS_SAVING = 'SET_USER_PROJECTS_SAVING';
export const SET_USER_PROJECTS_ERRORS = 'SET_USER_PROJECTS_ERRORS';
export const SET_USER_PROJECTS_DELETING_ERRORS = 'SET_USER_PROJECTS_DELETING_ERRORS';
export const SET_USER_PROJECTS_SAVING_ERRORS = 'SET_USER_PROJECTS_SAVING_ERRORS';
export const REMOVE_USER_PROJECT = 'REMOVE_USER_PROJECT';

// Reducer
const initialState = {
  projectsArray: [],
  isFetching: false,
  isDeleting: false,
  isSaving: false,
  errors: [],
  deletingErrors: [],
  savingErrors: [],
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_USER_PROJECTS: {
      const newState = cloneDeep( state );
      newState.projectsArray = [...action.payload];
      return newState;
    }
    case REMOVE_USER_PROJECT: {
      const newState = cloneDeep( state );
      newState.projectsArray = newState.projectsArray.filter( project => {
        return project.id !== action.payload;
      } );
      return newState;
    }
    case SET_USER_PROJECTS_FETCHING: {
      const newState = cloneDeep( state );
      newState.isFetching = action.payload;
      return newState;
    }
    case SET_USER_PROJECTS_DELETING: {
      const newState = cloneDeep( state );
      newState.isDeleting = action.payload;
      return newState;
    }
    case SET_USER_PROJECTS_SAVING: {
      const newState = cloneDeep( state );
      newState.isSaving = action.payload;
      return newState;
    }
    case SET_USER_PROJECTS_ERRORS: {
      const newState = cloneDeep( state );
      newState.errors = [...action.payload];
      return newState;
    }
    case SET_USER_PROJECTS_DELETING_ERRORS: {
      const newState = cloneDeep( state );
      newState.deletingErrors = [...action.payload];
      return newState;
    }
    case SET_USER_PROJECTS_SAVING_ERRORS: {
      const newState = cloneDeep( state );
      newState.savingErrors = [...action.payload];
      return newState;
    }

    default: return state;
  }
}

// Action Creators
export function setUserProjectsFetching( isFetching ) {
  return {
    type: SET_USER_PROJECTS_FETCHING,
    payload: isFetching,
  };
}

export function setUserProjectsDeleting( isDeleting ) {
  return {
    type: SET_USER_PROJECTS_DELETING,
    payload: isDeleting,
  };
}

export function setUserProjectsSaving( isSaving ) {
  return {
    type: SET_USER_PROJECTS_SAVING,
    payload: isSaving,
  };
}

export function setUserProjectsErrors( errors ) {
  return {
    type: SET_USER_PROJECTS_ERRORS,
    payload: errors,
  };
}

export function setUserProjectsDeletingErrors( errors ) {
  return {
    type: SET_USER_PROJECTS_DELETING_ERRORS,
    payload: errors,
  };
}

export function setUserProjectsSavingErrors( errors ) {
  return {
    type: SET_USER_PROJECTS_SAVING_ERRORS,
    payload: errors,
  };
}

export function setUserProjects( projects ) {
  return {
    type: SET_USER_PROJECTS,
    payload: projects,
  };
}

export function removeUserProject( projectId ) {
  return {
    type: REMOVE_USER_PROJECT,
    payload: projectId,
  };
}

export function fetchUserProjects( userId ) {
  return async dispatch => {
    dispatch( setUserProjects( [] ) );
    dispatch( setUserProjectsErrors( [] ) );
    dispatch( setUserProjectsFetching( true ) );

    const response = await getAllProjects( userId );

    if ( response.isError ) {
      dispatch( setUserProjectsErrors( response.errors ) );
    }
    else {
      dispatch( setUserProjects( response.data ) );
    }

    dispatch( setUserProjectsFetching( false ) );
  };
}

export function saveCurrentProject() {
  return async ( dispatch, getState ) => {
    dispatch( setUserProjectsSaving( true ) );
    dispatch( setUserProjectsSavingErrors( [] ) );

    const projectState = getState();
    const transferProject = createTransferProject( projectState );

    const response = await updateProject( projectState.user.currentProject.id, transferProject );

    if ( response.isError ) {
      dispatch( setUserProjectsSavingErrors( response.errors ) );
    }

    dispatch( setUserProjectsSaving( false ) );
  };
}

export function deleteUserProject( projectId ) {
  return async dispatch => {
    dispatch( setUserProjectsDeleting( true ) );
    dispatch( setUserProjectsDeletingErrors( [] ) );

    const response = await deleteProject( projectId );

    if ( response.isError ) {
      dispatch( setUserProjectsDeletingErrors( response.errors ) );
    }
    else {
      dispatch( removeUserProject( projectId ) );
    }

    dispatch( setUserProjectsDeleting( false ) );
  };
}
