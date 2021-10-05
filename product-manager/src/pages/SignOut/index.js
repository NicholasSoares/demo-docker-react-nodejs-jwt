import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";

class SignOut extends Component {

  /**
   * LogOut App
   */
  logoutApp(e) {
    e.preventDefault();
    logout();
    this.props.history.push("/");
  }

  render() {
    return (
      <a className="nav-link" href="/logout" onClick={(e) => this.logoutApp(e)}>Log Out</a>
    );
  }
}
  
  export default withRouter(SignOut);
  