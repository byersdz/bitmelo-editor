import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

import './Publish.scss';

class Publish extends React.Component {
  render() {
    const { currentUser, currentProject } = this.props;

    let mainRender = (
      <div className="sign-up-content">
        <Button
          className="create-account-btn"
          title="Sign up"
        />
        { ' or ' }
        <Button
          className="log-in-btn"
          title="Log in"
        />
        { ' to publish your game.' }
      </div>
    );

    if ( currentUser.isLoggedIn ) {
      if ( currentProject.id ) {
        // can publish project
        mainRender = (
          <div className="publish-project-content">
            <Button
              title="Publish"
              standard
            />
          </div>
        );
      }
      else {
        // need to create project
        mainRender = (
          <div className="create-project-content">
            The current project is a local data only project. A cloud project must be created to publish this game.
            <Button
              title="Create Cloud Project"
              standard
            />
          </div>
        );
      }
    }

    return (
      <div className="publish">
        <Card>
          { mainRender }
        </Card>
      </div>
    );
  }
}

Publish.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentProject: PropTypes.object.isRequired,
};

function mapStateToProps( state ) {
  return {
    currentUser: state.user.currentUser,
    currentProject: state.user.currentProject,
  };
}

export default connect( mapStateToProps )( Publish );
