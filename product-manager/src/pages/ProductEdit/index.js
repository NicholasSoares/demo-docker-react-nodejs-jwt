import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dinero from "dinero.js";
import * as dayjs from 'dayjs';
import api from "../../services/api";
import { logout } from "../../services/auth";
import { Container } from "./styles";
import Swal from 'sweetalert2';

class ProductEdit extends Component {
  constructor(props) {
    super(props);

    /**
     * Component States
     */
    this.state = {
      id: '',
      name: '',
      price: 0,
      manufactured_at: '',
      void_at: '',
      is_perishable: false,
      formLoading: true
    }
  }

  /**
   * Format if needed and set name field state
   */
  handleChangeProductName = (event) => {
    this.setState({ name: event.target.value });
  };

  /**
   * Format if needed and set value field state
   */
  handleChangeProductPrice = (event) => {
    const value = event.target.value;
    const number = value.replace(/\$|,|\./g, "");
    this.setState({ price: parseInt(number, 10) });
  };

  /**
   * Format if needed and set manufactured_at field state
   */
  handleChangeProductManufacturedAt = (event) => {
    this.setState({ manufactured_at: event.target.value });
  };

  /**
   * Format if needed and set void_at field state
   */
  handleChangeProductVoidAt = (event) => {
    this.setState({ void_at: event.target.value });
  };

  /**
   * Format if needed and set is_perishable field state
   */
  handleChangeProductIsPerishable = (event) => {
    this.setState({
      is_perishable: event.target.checked,
      void_at: (event.target.checked) ? this.state.void_at : ''
    });
  };

  /**
   * Check form fields for invalid data
   */
  validateCreateFormRequest() {
    const { name, price, manufactured_at, void_at, is_perishable } = this.state;
    if (!name?.length) return false;
    if (price <= 0) return false;
    if (is_perishable && !void_at) return false;
    if (is_perishable) {
      if (dayjs(void_at).diff(dayjs(manufactured_at), 'day', true) <= 0) return false;
    }
    return true;
  }

  /**
   * Populate list when loading page
   */
  componentDidMount() {
    this.fetchProduct();
  }

  /**
   * Fetch products from api with given filters
   */
  fetchProduct = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();
      const id = this.props.match.params.id;
      const response = await api.get(`/product/${id}`, {});
      Swal.close();
      if (!response.data.product?.id) return this.props.history.push("/products");

      this.setState({
        id: response.data.product.id,
        name: response.data.product.name,
        price: response.data.product.price,
        manufactured_at: dayjs(response.data.product.manufactured_at)?.format('YYYY-MM-DD'),
        void_at: dayjs(response.data.product.void_at)?.format('YYYY-MM-DD'),
        is_perishable: response.data.product.is_perishable,
        formLoading: false
      });

    } catch (err) {
      if ([403].includes(err.response?.status)) {
        logout();
        Swal.close();
        this.props.history.push("/");
      }
      if ([404].includes(err.response?.status)) {
        Swal.close();
        this.props.history.push("/products");
      }
      else {
        Swal.close();
        Swal.fire({
          text: 'Erro interno do servidor, tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  }

  /**
   * Get request body data for product creation with given form data
   */
  getRequestBodyData() {
    const { id, name, price, manufactured_at, void_at, is_perishable } = this.state;
    const requestData = {
      id,
      name,
      price,
      manufactured_at,
      void_at,
      is_perishable
    };

    if (!is_perishable) {
      const { void_at, ...requestDataCleaned } = requestData;
      return requestDataCleaned;
    }

    return requestData;
  }

  /**
   * Check fields and send request for product details update
   */
  handleProductUpdate = async (e) => {
    e.preventDefault();
    if (!this.validateCreateFormRequest()) {
      Swal.fire({
        text: 'Verifique os dados informados e tente novamente.',
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
        await api.patch(`/product/${this.state.id}`, this.getRequestBodyData());
        Swal.close();
        Swal.fire({
          text: 'Produto alterado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      } catch (err) {
        if ([403].includes(err.response?.status)) {
          logout();
          Swal.close();
          this.props.history.push("/");
        }
        if ([404].includes(err.response?.status)) {
          Swal.close();
          this.props.history.push("/products");
        }
        else {
          Swal.close();
          Swal.fire({
            text: 'Erro interno do servidor, tente novamente mais tarde.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      }
    }
  };

  render() {
    return (
      <Container>
        <div className="container">
          <h4 className="mb-3">Product Editing</h4>
          <form onSubmit={this.handleProductUpdate}>
            <input type="hidden" id="id" name="id" value={this.state.id}></input>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name"
                  value={this.state.name}
                  onChange={this.handleChangeProductName}
                  disabled={this.state.formLoading}>
                </input>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="price">Price</label>
                <input type="text" className="form-control" id="price" name="price"
                  value={Dinero({ amount: this.state.price }).toFormat('0.00')}
                  onChange={this.handleChangeProductPrice}
                  disabled={this.state.formLoading}>
                </input>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="manufactured_at">Manufactured At</label>
                <input type="date" className="form-control" id="manufactured_at" name="manufactured_at"
                  value={this.state.manufactured_at}
                  onChange={this.handleChangeProductManufacturedAt}
                  disabled={this.state.formLoading}>
                </input>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="void_at">Void At</label>
                <input type="date" className="form-control" id="void_at" name="void_at" placeholder=""
                  value={this.state.void_at}
                  onChange={this.handleChangeProductVoidAt}
                  disabled={this.state.formLoading}>
                </input>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="is_perishable" name="is_perishable"
                  checked={this.state.is_perishable}
                  onChange={this.handleChangeProductIsPerishable}
                  disabled={this.state.formLoading}>
                </input>
                <label className="form-check-label" htmlFor="is_perishable">
                  Is Perishable?
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={this.state.formLoading}>Save Changes</button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(ProductEdit);
