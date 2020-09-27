
import cloneDeep from 'lodash.clonedeep';
import get from 'lodash.get';

import {
  getAllProjects,
  deleteProject,
  updateProject,
  createProject,
} from '../../api/project';

import { logoutUser } from './currentUser';
import { setCurrentUserProjectId } from './currentProject';
import { resetProject } from '../globalActions';
import { setProjectName } from '../Project/name';

import createTransferProject from '../../utils/Convert/createTransferProject';

// Actions
export const SET_USER_PROJECTS = 'SET_USER_PROJECTS';
export const SET_USER_PROJECTS_FETCHING = 'SET_USER_PROJECTS_FETCHING';
export const SET_USER_PROJECTS_DELETING = 'SET_USER_PROJECTS_DELETING';
export const SET_USER_PROJECTS_SAVING = 'SET_USER_PROJECTS_SAVING';
export const SET_USER_PROJECTS_SHOW_SAVE_SUCCESS = 'SET_USER_PROJECTS_SHOW_SAVE_SUCCESS';
export const SET_USER_PROJECTS_CREATING = 'SET_USER_PROJECTS_CREATING';
export const SET_USER_PROJECTS_ERRORS = 'SET_USER_PROJECTS_ERRORS';
export const SET_USER_PROJECTS_DELETING_ERRORS = 'SET_USER_PROJECTS_DELETING_ERRORS';
export const SET_USER_PROJECTS_SAVING_ERRORS = 'SET_USER_PROJECTS_SAVING_ERRORS';
export const SET_USER_PROJECTS_CREATING_ERRORS = 'SET_USER_PROJECTS_CREATING_ERRORS';
export const REMOVE_USER_PROJECT = 'REMOVE_USER_PROJECT';

// Reducer
const initialState = {
  projectsArray: [],
  isFetching: false,
  isDeleting: false,
  isSaving: false,
  isCreating: false,
  showSaveSuccess: false,
  errors: [],
  deletingErrors: [],
  savingErrors: [],
  creatingErrors: [],
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
    case SET_USER_PROJECTS_SHOW_SAVE_SUCCESS: {
      const newState = cloneDeep( state );
      newState.showSaveSuccess = action.payload;
      return newState;
    }
    case SET_USER_PROJECTS_CREATING: {
      const newState = cloneDeep( state );
      newState.isCreating = action.payload;
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
    case SET_USER_PROJECTS_CREATING_ERRORS: {
      const newState = cloneDeep( state );
      newState.creatingErrors = [...action.payload];
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

export function setUserProjectsShowSaveSuccess( showSaveSuccess ) {
  return {
    type: SET_USER_PROJECTS_SHOW_SAVE_SUCCESS,
    payload: showSaveSuccess,
  };
}

export function setUserProjectsCreating( isCreating ) {
  return {
    type: SET_USER_PROJECTS_CREATING,
    payload: isCreating,
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

export function setUserProjectsCreatingErrors( errors ) {
  return {
    type: SET_USER_PROJECTS_CREATING_ERRORS,
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

    if ( response.status === 401 ) {
      dispatch( logoutUser() );
    }

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
    dispatch( setUserProjectsShowSaveSuccess( false ) );

    const projectState = getState();
    const transferProject = createTransferProject( projectState );

    const response = await updateProject( projectState.user.currentProject.id, transferProject );

    if ( response.status === 401 ) {
      dispatch( logoutUser() );
    }

    if ( response.isError ) {
      dispatch( setUserProjectsSavingErrors( response.errors ) );
    }

    dispatch( setUserProjectsSaving( false ) );
    dispatch( setUserProjectsShowSaveSuccess( true ) );

    setTimeout( () => {
      dispatch( setUserProjectsShowSaveSuccess( false ) );
    }, 2000 );
  };
}

export function deleteUserProject( projectId ) {
  return async dispatch => {
    dispatch( setUserProjectsDeleting( true ) );
    dispatch( setUserProjectsDeletingErrors( [] ) );

    const response = await deleteProject( projectId );

    if ( response.status === 401 ) {
      dispatch( logoutUser() );
    }

    if ( response.isError ) {
      dispatch( setUserProjectsDeletingErrors( response.errors ) );
    }
    else {
      dispatch( removeUserProject( projectId ) );
    }

    dispatch( setUserProjectsDeleting( false ) );
  };
}

export function createNewProject( projectName ) {
  return async ( dispatch, getState ) => {
    dispatch( setUserProjectsCreating( true ) );
    dispatch( setUserProjectsCreatingErrors( [] ) );

    // reset the project data
    dispatch( resetProject() );
    dispatch( setProjectName( projectName ) );
    dispatch( setCurrentUserProjectId( '' ) );

    // create the project on the backend
    const projectData = getState();
    const transferProject = createTransferProject( projectData );

    const response = await createProject( transferProject );

    if ( response.status === 401 ) {
      dispatch( logoutUser() );
    }

    if ( response.isError ) {
      dispatch( setUserProjectsCreatingErrors( response.errors ) );
    }
    else {
      const id = get( response, 'data.id', '' );
      if ( id ) {
        dispatch( setCurrentUserProjectId( id ) );
      }
      else {
        // cant get the id for whatever reason, display an error
        dispatch( setUserProjectsCreatingErrors( [{ msg: 'Unkown Error' }] ) );
      }
    }

    dispatch( setUserProjectsCreating( false ) );
  };
}


export function createLoadedProjectCopy( projectName ) {
  return async ( dispatch, getState ) => {
    dispatch( setUserProjectsCreating( true ) );
    dispatch( setUserProjectsCreatingErrors( [] ) );

    if ( !projectName ) {
      const state = getState();
      // eslint-disable-next-line no-param-reassign
      projectName = state.project.name;
    }

    dispatch( setProjectName( projectName ) );
    dispatch( setCurrentUserProjectId( '' ) );

    const projectData = getState();
    const transferProject = createTransferProject( projectData );

    const response = await createProject( transferProject );

    if ( response.status === 401 ) {
      dispatch( logoutUser() );
    }

    if ( response.isError ) {
      dispatch( setUserProjectsCreatingErrors( response.errors ) );
    }
    else {
      const id = get( response, 'data.id', '' );
      if ( id ) {
        dispatch( setCurrentUserProjectId( id ) );
      }
      else {
        // cant get the id for whatever reason, display an error
        dispatch( setUserProjectsCreatingErrors( [{ msg: 'Unkown Error' }] ) );
      }
    }

    dispatch( setUserProjectsCreating( false ) );
  };
}
