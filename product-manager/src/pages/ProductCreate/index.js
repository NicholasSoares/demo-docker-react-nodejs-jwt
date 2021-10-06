import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dinero from "dinero.js";
import * as dayjs from 'dayjs';
import { logout } from "../../services/authService";
import { Container } from "./styles";
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { createProduct } from "../../store/actions/products";

class ProductCreate extends Component {
  constructor(props) {
    super(props);

    /**
     * Component States
     */
    this.state = {
      name: '',
      price: 0,
      manufactured_at: dayjs().format('YYYY-MM-DD'),
      void_at: '',
      is_perishable: false,
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
    const number = value.replace(/[^0-9]/g, '');
    this.setState({ price: parseInt(number) });
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
    if (is_perishable && !dayjs(void_at).isValid()) return false;
    if (is_perishable) {
      if (dayjs(void_at).diff(dayjs(manufactured_at), 'day', true) <= 0) return false;
    }
    return true;
  }

  /**
   * Get request body data for product creation with given form data
   */
  getRequestBodyData() {
    const { name, price, manufactured_at, void_at, is_perishable } = this.state;
    const requestData = {
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
   * Check fields and send request for product creation
   */
  handleProductCreate = async (e) => {
    e.preventDefault();
    if (!this.validateCreateFormRequest()) {
      Swal.fire({
        text: 'Check the input data and try again.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    else {
      this.props.createProduct(this.getRequestBodyData())
        .then((response) => {
          Swal.close();
          Swal.fire({
            text: 'Product created successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        })
        .catch((err) => {
          Swal.close();
          if ([403].includes(err.response?.status)) {
            logout();
            this.props.history.push("/");
          }
          else {
            Swal.fire({
              text: 'Internal server error, try again later.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
    }
  };

  render() {
    return (
      <Container>
        <div className="container">
          <h4 className="mb-3">Product Creation</h4>
          <form onSubmit={this.handleProductCreate}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name"
                  value={this.state.name}
                  onChange={this.handleChangeProductName}>
                </input>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="price">Price</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">R$</div>
                  </div>
                  <input type="text" className="form-control" id="price" name="price"
                         value={Dinero({ amount: this.state.price ,currency: 'BRL' }).setLocale('pt-BR').toFormat().replace('R$','')}
                         onChange={this.handleChangeProductPrice}>
                  </input>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="manufactured_at">Manufactured At</label>
                <input type="date" className="form-control" id="manufactured_at" name="manufactured_at"
                  value={this.state.manufactured_at}
                  onChange={this.handleChangeProductManufacturedAt}>
                </input>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="void_at">Void At</label>
                <input type="date" className="form-control" id="void_at" name="void_at" placeholder=""
                  value={this.state.void_at}
                  onChange={this.handleChangeProductVoidAt}>
                </input>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="is_perishable" name="is_perishable"
                  checked={this.state.is_perishable}
                  onChange={this.handleChangeProductIsPerishable}>
                </input>
                <label className="form-check-label" htmlFor="is_perishable">
                  Is Perishable?
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      </Container>
    );
  }
}

/**
 * Map current state to props
 */
const mapStateToProps = (state) => {
  return {
    product: state.productReducer,
  };
};

export default withRouter(connect(mapStateToProps, { createProduct })(ProductCreate));