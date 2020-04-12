
import cloneDeep from 'lodash.clonedeep';

import { getAllProjects, deleteProject } from '../../api/project';

// Actions
export const SET_USER_PROJECTS = 'SET_USER_PROJECTS';
export const SET_USER_PROJECTS_FETCHING = 'SET_USER_PROJECTS_FETCHING';
export const SET_USER_PROJECTS_DELETING = 'SET_USER_PROJECTS_DELETING';
export const SET_USER_PROJECTS_ERRORS = 'SET_USER_PROJECTS_ERRORS';

// Reducer
const initialState = {
  projectsArray: [],
  isFetching: false,
  isDeleting: false,
  errors: [],
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_USER_PROJECTS: {
      const newState = cloneDeep( state );
      newState.projectsArray = [...action.payload];
      return newState;
    }
    case SET_USER_PROJECTS_FETCHING: {
      const newState = cloneDeep( state );
      newState.isFetching = action.payload;
      return newState;
    }
    case SET_USER_PROJECTS_ERRORS: {
      const newState = cloneDeep( state );
      newState.errors = [...action.payload];
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

export function setUserProjectsErrors( errors ) {
  return {
    type: SET_USER_PROJECTS_ERRORS,
    payload: errors,
  };
}


export function setUserProjects( projects ) {
  return {
    type: SET_USER_PROJECTS,
    payload: projects,
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

export function deleteUserProject( projectId ) {
  return async dispatch => {
    dispatch( setUserProjectsDeleting( true ) );

    const response = await deleteProject( projectId );

    console.log( response );

    if ( response.isError ) {
      // deleting errors?
    }
    else {
      // remove the project
    }

    dispatch( setUserProjectsDeleting( false ) );
  };
}
