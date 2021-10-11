import React, { Component } from "react";
import * as dayjs from 'dayjs';
import ProductsTableListField from "../ProductsTableListField";
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
        return dayjs(date)?.format('DD/MM/YYYY');
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
                    <ProductsTableListField colName={'id'} colValue={product.id}/>
                    <ProductsTableListField colName={'name'} colValue={product.name}/>
                    <ProductsTableListField colName={'price'} colValue={this.formatValue(product.price)}/>
                    <ProductsTableListField colName={'is_perishable'} colValue={product.is_perishable.toString()}/>
                    <ProductsTableListField colName={'void_at'} colValue={(product.void_at) ? this.formatDate(product.void_at) : "None"}/>
                    <ProductsTableListField colName={'manufactured_at'} colValue={this.formatDate(product.manufactured_at)}/>
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