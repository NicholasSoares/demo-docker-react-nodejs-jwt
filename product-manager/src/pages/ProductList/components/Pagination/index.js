import React, { Component } from "react";

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
  canGoForward = (index, offset, productCount) => {
    return index + offset < productCount;
  }

  /**
   * check if can navigate in the list and toggle navigation event of the table
   */
  navigateBack = () => {
    if (this.canGoBack(this.props.index)) {
      this.props.changePage(this.props.index - this.props.offset);
    }
  }

  /**
   * check if can navigate in the list and toggle navigation event of the table
   */
  navigateForward = () => {
    if (this.canGoForward(this.props.index, this.props.offset, this.props.productCount)) {
      this.props.changePage(this.props.index + this.props.offset);
    }
  }

  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Previous" onClick={(e => { this.navigateBack() })}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Next" onClick={(e => { this.navigateForward() })}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
