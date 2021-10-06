import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../assets/product.svg";
import { login } from "../../services/authService";
import { Form, Container } from "./styles";
import Swal from 'sweetalert2';
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
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      Swal.fire({
        text: 'Preencha e-mail e senha para continuar!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } else {
      this.props.getApiUserAuthorization(email, password)
        .then((response) => {
          Swal.fire({
            allowOutsideClick: false,
            showConfirmButton: false
          });
          Swal.showLoading();
          login(this.props.userToken);
          this.props.history.push("/products");
        })
        .catch((e) => {
          Swal.close();
          Swal.fire({
            text: 'Houve um problema com o login, verifique suas credenciais.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        });
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="Login logo" />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
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