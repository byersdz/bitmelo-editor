
import axios from 'axios';

import { BASE_URL } from './endpoints';
import { updateProject } from './project';
import catchErrors from './catchErrors';

export async function publishGame(
  projectId,
  projectData,
  codeLicense,
  assetLicense,
  licenseAgree,
  coverImage,
) {
  const updateResponse = await updateProject( projectId, projectData );

  if ( updateResponse.isError ) {
    // return errors from update
    return updateResponse;
  }
  else {
    try {
      const publishResponse = await axios.post(
        `${ BASE_URL }/api/games`,
        {
          projectId,
          codeLicense,
          assetLicense,
          licenseAgree,
          coverImage,
        },
        { withCredentials: true },
      );
      return publishResponse;
    }
    catch ( err ) {
      return catchErrors( err );
    }
  }
}

export async function getGameByProjectId( projectId ) {
  try {
    const response = await axios.get(
      `${ BASE_URL }/api/games/project/${ projectId }`,
      { withCredentials: true },
    );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}
