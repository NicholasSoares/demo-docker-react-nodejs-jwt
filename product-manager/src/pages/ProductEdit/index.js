import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dinero from "dinero.js";
import * as dayjs from 'dayjs';
import { Container } from "./styles";
import { showFullScreenLoader, closeFullScreenLoader, showErrorMessage, showSuccessMessage } from "../../services/swalService";
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
      /**
       * Get request id and fetch product data with screen blocked during request
       */
      showFullScreenLoader();
      const { id } = this.props.match.params;
      await this.props.getProduct(id);
      closeFullScreenLoader();

      /**
       * Check if product was found, and if not redirect to listing page
       */
      if (!this.props.product?.id) return this.props.history.push("/products");

      /**
       * Set form state with fetched product data
       */
      this.setState({
        id: this.props.product.id,
        name: this.props.product.name,
        price: this.props.product.price,
        manufactured_at: dayjs(this.props.product.manufactured_at)?.format('YYYY-MM-DD'),
        void_at: dayjs(this.props.product.void_at)?.format('YYYY-MM-DD'),
        is_perishable: this.props.product.is_perishable,
        formLoading: false
      });
    }
    catch (err) {
      closeFullScreenLoader();
      this.props.history.push("/products");
    }
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
    try {
      e.preventDefault();
      showFullScreenLoader();
      if (!this.validateCreateFormRequest()) {
        showErrorMessage('Check the input data and try again.')
      }
      else {
        await this.props.updateProduct(this.state.id, this.getRequestBodyData());
        showSuccessMessage('Product updated successfully!');
      }
    }
    catch (err) {
      closeFullScreenLoader();
      this.props.history.push("/products");
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
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">R$</div>
                  </div>
                  <input type="text" className="form-control" id="price" name="price"
                    value={Dinero({ amount: this.state.price, currency: 'BRL' }).setLocale('pt-BR').toFormat().replace('R$', '')}
                    onChange={this.handleChangeProductPrice}
                    disabled={this.state.formLoading}>
                  </input>
                </div>
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
