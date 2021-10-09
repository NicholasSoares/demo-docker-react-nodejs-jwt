import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../../../services/authService";
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { deleteProduct } from "../../../../store/actions/products";
import { showFullScreenLoader, closeFullScreenLoader } from "../../../../services/swalService";

class RemoveProductButton extends Component {

  /**
   * remove product from App
   */
  removeProduct = async (id) => {
    try {
      showFullScreenLoader();
      await this.props.deleteProduct(id);
      closeFullScreenLoader();
      this.props.fetchProducts();
    }
    catch (err) {
      closeFullScreenLoader();
      if ([403].includes(err.response?.status)) {
        logout();
        this.props.history.push("/");
      }
      else {
        window.location.reload();
      }
    }
  }

  render() {
    return (
      <button type="button"
        className="btn btn-danger ml-1 mr-1 mb-1 mb-lg-0"
        onClick={(e) => this.removeProduct(this.props.productId)}>
        Remove
      </button>
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

export default withRouter(connect(mapStateToProps, { deleteProduct })(RemoveProductButton));
