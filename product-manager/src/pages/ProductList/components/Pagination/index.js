import React, { Component } from "react";
import { connect } from "react-redux";
import { sortProducts } from "../../../../store/actions/productsList";

class Pagination extends Component {

  /**
   * Check if can navigate back in the product list
   */
  canGoBack = (index) => {
    return index > 0;
  }

  /**
   * Check if can navigate forward in the product list
   */
  canGoForward = (index, limit, productCount) => {
    return index + limit < productCount;
  }

  /**
   * check if can navigate in the list and toggle navigation event of the table
   */
  navigateBack = (e) => {
    e.preventDefault();
    if (this.canGoBack(this.props.index)) {
      this.changePage(this.props.index - this.props.limit);
    }
  }

  /**
   * check if can navigate in the list and toggle navigation event of the table
   */
  navigateForward = (e) => {
    e.preventDefault();
    if (this.canGoForward(this.props.index, this.props.limit, this.props.totalProducts)) {
      this.changePage(this.props.index + this.props.limit);
    }
  }

  /**
   * Navigate in the product list
   */
  changePage = (indexCount) => {
    const { limit, field, direction } = this.props;
    this.props.sortProducts(indexCount, limit, field, direction)
      .then(() => {
        this.props.fetchProducts();
      });
  }

  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Previous" onClick={(e => { this.navigateBack(e) })}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Next" onClick={(e => { this.navigateForward(e) })}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

/**
 * Map current state to props
 */
const mapStateToProps = (state) => {
  return {
    totalProducts: state.productListReducer.totalProducts,
    index: state.productListReducer.index,
    limit: state.productListReducer.limit,
    field: state.productListReducer.field,
    direction: state.productListReducer.direction
  };
};

export default connect(mapStateToProps, { sortProducts })(Pagination);
