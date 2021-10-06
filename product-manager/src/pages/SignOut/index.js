import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
import Swal from 'sweetalert2';

class SignOut extends Component {

  /**
   * Remove session auth from app
   */
  handleSignOut(e) {
    e.preventDefault();
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false
    });
    Swal.showLoading();
    logout();
    Swal.close();
    this.props.history.push("/");
  }

  render() {
    return (
      <a className="nav-link" href="/logout" onClick={(e) => this.handleSignOut(e)}>Log Out</a>
    );
  }
}

export default withRouter(SignOut);
