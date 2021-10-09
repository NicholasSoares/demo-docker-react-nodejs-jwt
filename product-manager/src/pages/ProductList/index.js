import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "./styles";
import { showFullScreenLoader, closeFullScreenLoader, showErrorMessage } from "../../services/swalService";
import ProductsTableList from "./components/ProductsTableList";
import Pagination from "./components/Pagination";
import ProductsTableHeader from "./components/ProductsTableHeader";
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
    try {
      const { index, offset, field, direction } = this.props;
      showFullScreenLoader();
      await this.props.listProducts(index, offset, field, direction);
      closeFullScreenLoader();
    }
    catch (err) {
      showErrorMessage('Internal server error, try again later.');
    }
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
              <ProductsTableList fetchProducts={this.fetchProducts} />
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
