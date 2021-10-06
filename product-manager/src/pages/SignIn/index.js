import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../assets/product.svg";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Form, Container } from "./styles";
import Swal from 'sweetalert2';

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

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
      try {
        Swal.fire({
          allowOutsideClick: false,
          showConfirmButton: false
        });
        Swal.showLoading();

        const response = await api.post("/user/token", { email, password });
        login(response.data.token);
        this.props.history.push("/products");
        
      } catch (err) {
        Swal.close();
        Swal.fire({
          text: 'Houve um problema com o login, verifique suas credenciais.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
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

export default withRouter(SignIn);
