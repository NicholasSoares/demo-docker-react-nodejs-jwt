import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/authService";
import { showFullScreenLoader, closeFullScreenLoader } from "../../services/swalService";

class SignOut extends Component {

  /**
   * Remove session auth from app
   */
  handleSignOut(e) {
    e.preventDefault();
    showFullScreenLoader();
    logout();
    closeFullScreenLoader();
    this.props.history.push("/");
  }

  render() {
    return (
      <a className="nav-link" href="/logout" onClick={(e) => this.handleSignOut(e)}>Log Out</a>
    );
  }
}

export default withRouter(SignOut);
