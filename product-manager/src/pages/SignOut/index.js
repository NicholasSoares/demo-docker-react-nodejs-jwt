import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { showFullScreenLoader, closeFullScreenLoader } from "../../services/swalService";
import { connect } from "react-redux";
import { removeApiUserAuthorization } from "../../store/actions/users";

class SignOut extends Component {

  /**
   * Remove session auth from app
   */
  handleSignOut = async (e) => {
    try {
      e.preventDefault();
      showFullScreenLoader();
      await this.props.removeApiUserAuthorization();
      closeFullScreenLoader();
      this.props.history.push("/");
    }
    catch (err) {
      window.location.reload();
    }
  }

  render() {
    return (
      <a className="nav-link" href="/logout" onClick={(e) => this.handleSignOut(e)}>Log Out</a>
    );
  }
}

/**
 * Map current state to props
 */
const mapStateToProps = (state) => {
  return {
    isUserAuth: state.authUserReducer.auth,
    userToken: state.authUserReducer.token
  };
};

export default withRouter(connect(mapStateToProps, { removeApiUserAuthorization })(SignOut));
