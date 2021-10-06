import React from "react";
import * as dayjs from 'dayjs';
import UpdateProductButton from "../UpdateProductButton";
import RemoveProductButton from "../RemoveProductButton";

/**
 * Setup BRL currency formatter
 */
const intlMonetary = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2
});

/**
 * Format price to BRL currency format
 */
const formatPrice = (price) => {
  return intlMonetary.format(Number((price / 100).toFixed(2)));
}

/**
 * Format timestamp to date
 */
const formatDate = (date) => {
    return dayjs(date)?.format('YYYY-MM-DD');
}

const ProductsTableList = ({ products }) =>
  products.map((product, index) => (
    <tr key={index}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{formatPrice(product.price)}</td>
      <td>{product.is_perishable.toString()}</td>
      <td>{(product.void_at) ? formatDate(product.void_at) : "None"}</td>
      <td>{formatDate(product.manufactured_at)}</td>
      <td className="text-center">
        <UpdateProductButton productId={product.id} />
        <RemoveProductButton productId={product.id} />
      </td>
    </tr>
  )
  );

export default ProductsTableList;