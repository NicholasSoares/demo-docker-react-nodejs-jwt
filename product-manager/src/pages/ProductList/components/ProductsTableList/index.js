import React from "react";
import UpdateProductButton from "../UpdateProductButton";
import RemoveProductButton from "../RemoveProductButton";

const intlMonetary = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2
});

const formatPrice = (price) => {
  return intlMonetary.format(Number((price / 100).toFixed(2)))
}

const ProductsTableList = ({ products }) =>
  products.map((product, index) => (
    <tr key={index}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{formatPrice(product.price)}</td>
      <td>{product.is_perishable.toString()}</td>
      <td>{(product.void_at) ? product.void_at.toString() : "None"}</td>
      <td>{product.manufactured_at.toString()}</td>
      <td>
        <UpdateProductButton productId={product.id} />
        <RemoveProductButton productId={product.id} />
      </td>
    </tr>
  )
  );

export default ProductsTableList;