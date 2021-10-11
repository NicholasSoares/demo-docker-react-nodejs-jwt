import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ProductsTableListField extends Component {
    render() {
        return (
            (this.props.field === this.props.colName)?
                <th scope="row">{this.props.colValue}</th>
                :
                <td>{this.props.colValue}</td>
        );
    }
}

/**
 * Map current state to props
 */
const mapStateToProps = (state) => {
    return {
        field: state.productListReducer.field,
    };
};

export default withRouter(connect(mapStateToProps, {})(ProductsTableListField));