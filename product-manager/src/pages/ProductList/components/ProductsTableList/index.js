import React, { Component } from "react";
import * as dayjs from 'dayjs';
import UpdateProductButton from "../UpdateProductButton";
import RemoveProductButton from "../RemoveProductButton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dinero from "dinero.js";

class ProductsTableList extends Component {
    /**
     * Format timestamp to date
     */
    formatDate = (date) => {
        return dayjs(date)?.format('DD-MM-YYYY');
    }

    /**
     * Format int value to BRL format
     */
    formatValue = (value) => {
        return Dinero({ amount: value ,currency: 'BRL' }).setLocale('pt-BR').toFormat();
    }

    render() {
        return (
            this.props.products.map((product, index) => (
                <tr key={index}>
                    <th scope="row">{product.id}</th>
                    <td>{product.name}</td>
                    <td>{this.formatValue(product.price)}</td>
                    <td>{product.is_perishable.toString()}</td>
                    <td>{(product.void_at) ? this.formatDate(product.void_at) : "None"}</td>
                    <td>{this.formatDate(product.manufactured_at)}</td>
                    <td className="text-center">
                        <UpdateProductButton productId={product.id} />
                        <RemoveProductButton fetchProducts={this.props.fetchProducts} productId={product.id} />
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