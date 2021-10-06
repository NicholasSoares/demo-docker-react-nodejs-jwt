import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dinero from "dinero.js";
import * as dayjs from 'dayjs';
import { logout } from "../../services/authService";
import { Container } from "./styles";
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { getProduct, updateProduct } from "../../store/actions/products";

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
    if (is_perishable && !dayjs(void_at).isValid()) return false;
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
    const id = this.props.match.params.id;
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false
    });
    Swal.showLoading();

    this.props.getProduct(id)
      .then((response) => {
        Swal.close();
        if (!this.props.product?.id) return this.props.history.push("/products");

        this.setState({
          id: this.props.product.id,
          name: this.props.product.name,
          price: this.props.product.price,
          manufactured_at: dayjs(this.props.product.manufactured_at)?.format('YYYY-MM-DD'),
          void_at: dayjs(this.props.product.void_at)?.format('YYYY-MM-DD'),
          is_perishable: this.props.product.is_perishable,
          formLoading: false
        });

      })
      .catch((err) => {
        Swal.close();
        if ([403].includes(err.response?.status)) {
          logout();
          this.props.history.push("/");
        }
        else if ([404].includes(err.response?.status)) {
          this.props.history.push("/products");
        }
        else {
          Swal.fire({
            text: 'Internal server error, try again later.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
  };

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
        text: 'Check the input data and try again.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } else {
      this.props.updateProduct(this.state.id, this.getRequestBodyData())
        .then((response) => {
          Swal.close();
          Swal.fire({
            text: 'Product updated successfully!',
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
          else if ([404].includes(err.response?.status)) {
            this.props.history.push("/products");
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
          <h4 className="mb-3">Product Editing</h4>
          <form onSubmit={this.handleProductUpdate}>
            <input type="hidden" id="id" name="id" value={this.state.id} />
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

/**
 * Map current state to props
 */
const mapStateToProps = (state) => {
  return {
    product: state.productReducer.product,
  };
};

export default withRouter(connect(mapStateToProps, { getProduct, updateProduct })(ProductEdit));
