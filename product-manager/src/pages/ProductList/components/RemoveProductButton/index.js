import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../../../services/auth";
import api from "../../../../services/api";

class RemoveProductButton extends Component {

  /**
   * remove product from App
   */
  removeProduct = async (id) =>{
    try {
      const response = await api.delete(`/product/${id}`, {});
      window.location.reload();
    } catch (err) {
      if([403].includes(err.response?.status)){
        logout();
        this.props.history.push("/");
      }
      if([404].includes(err.response?.status)){
        window.location.reload();
      }
      else{
        window.location.reload();
      }
    }
  }

  render() {
    return (
      <button type="button" className="btn btn-danger ml-1 mr-1" onClick={(e) => this.removeProduct(this.props.productId)}>Remove</button>
    );
  }
}
  
  export default withRouter(RemoveProductButton);
  