import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "./styles";
import { logout } from "../../services/authService";
import ProductsTableList from "./components/ProductsTableList";
import Pagination from "./components/Pagination";
import ProductsTableHeader from "./components/ProductsTableHeader";
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { listProducts } from "../../store/actions/productsList";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.fetchProducts.bind(this);
  }

  /**
   * Populate list when loading page
   */
  componentDidMount() {
    this.fetchProducts();
  }

  /**
   * Fetch products from api with given filters
   */
  fetchProducts = async () => {
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false
    });
    Swal.showLoading();
    const { index, offset, field, direction } = this.props;

    this.props.listProducts(index, offset, field, direction)
      .then((response) => {
        Swal.close();
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

  render() {
    return (
      <Container>
        <div className="container">
          <h4 className="mb-3">Product Listing</h4>
          <table className="table table-striped table-bordered table-responsive w-100 d-block d-md-table">
            <thead>
              <ProductsTableHeader fetchProducts={this.fetchProducts} />
            </thead>
            <tbody>
              <ProductsTableList />
            </tbody>
          </table>
          <p>Total Products: {this.props.totalProducts}</p>
          <Pagination fetchProducts={this.fetchProducts} />
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
    products: state.productListReducer.products,
    totalProducts: state.productListReducer.totalProducts,
    index: state.productListReducer.index,
    offset: state.productListReducer.offset,
    field: state.productListReducer.field,
    direction: state.productListReducer.direction
  };
};

export default withRouter(connect(mapStateToProps, { listProducts })(ProductList));
