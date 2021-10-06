import React from "react";

const UpdateProductButton = ({ productId }) => (
  <a href={`/product/edit/${productId}`} className="btn btn-success ml-1 mr-1 mb-1 mb-lg-0" role="button">Update</a>
)

export default UpdateProductButton;
