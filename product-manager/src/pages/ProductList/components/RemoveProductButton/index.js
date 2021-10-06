import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../../../services/auth";
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { deleteProduct } from "../../../../store/actions/products";

class RemoveProductButton extends Component {

  /**
   * remove product from App
   */
  removeProduct = async (id) => {
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false
    });
    Swal.showLoading();

    this.props.deleteProduct(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        Swal.close();
        if ([403].includes(err.response?.status)) {
          logout();
          this.props.history.push("/");
        }
        else {
          Swal.close();
          window.location.reload();
        }
      });
  }

  render() {
    return (
      <button type="button" className="btn btn-danger ml-1 mr-1 mb-1 mb-lg-0" onClick={(e) => this.removeProduct(this.props.productId)}>Remove</button>
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
