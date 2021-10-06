import React, { Component } from "react";
import * as dayjs from 'dayjs';
import UpdateProductButton from "../UpdateProductButton";
import RemoveProductButton from "../RemoveProductButton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ProductsTableList extends Component {
    /**
     * Setup BRL currency formatter
     */
    intlMonetary = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
    });

    /**
     * Format price to BRL currency format
     */
    formatPrice = (price) => {
        return this.intlMonetary.format(Number((price / 100).toFixed(2)));
    }

    /**
     * Format timestamp to date
     */
    formatDate = (date) => {
        return dayjs(date)?.format('YYYY-MM-DD');
    }

    render() {
        return (
            this.props.products.map((product, index) => (
                <tr key={index}>
                    <th scope="row">{product.id}</th>
                    <td>{product.name}</td>
                    <td>{this.formatPrice(product.price)}</td>
                    <td>{product.is_perishable.toString()}</td>
                    <td>{(product.void_at) ? this.formatDate(product.void_at) : "None"}</td>
                    <td>{this.formatDate(product.manufactured_at)}</td>
                    <td className="text-center">
                        <UpdateProductButton productId={product.id} />
                        <RemoveProductButton productId={product.id} />
                    </td>
                </tr>
            )
            )
        );
    }
}

/**
 * Map current state to props
 */
const mapStateToProps = (state) => {
    return {
        products: state.productListReducer.products,
    };
};

export default withRouter(connect(mapStateToProps, {})(ProductsTableList));