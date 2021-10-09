import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../assets/product.svg";
import { login } from "../../services/authService";
import { Form, Container } from "./styles";
import { showFullScreenLoader, closeFullScreenLoader, showErrorMessage } from "../../services/swalService";
import { connect } from "react-redux";
import { getApiUserAuthorization } from "../../store/actions/users";

class SignIn extends Component {
  constructor(props) {
    super(props);

    /**
     * Component States
     */
    this.state = {
      email: "",
      password: "",
    };
  }

  /**
   * Make sign in request and set session auth on app
   */
  handleSignIn = async e => {
    try {
      e.preventDefault();
      showFullScreenLoader();
      const { email, password } = this.state;
      if (!email || !password) {
        showErrorMessage('Please check your input data');
      }
      else {
        await this.props.getApiUserAuthorization(email, password);
        login(this.props.userToken);
        closeFullScreenLoader();
        this.props.history.push("/products");
      }
    }
    catch (err) {
      showErrorMessage('Invalid email or password');
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="Login logo" />
          <input
            type="email"
            placeholder="E-mail address"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Sign In</button>
        </Form>
      </Container>
    );
  }
}

/**
 * Map current state to props retrieving an valid user token for login flux
 */
const mapStateToProps = (state) => {
  return {
    userToken: state.userReducer.token,
  };
};

export default withRouter(connect(mapStateToProps, { getApiUserAuthorization })(SignIn));