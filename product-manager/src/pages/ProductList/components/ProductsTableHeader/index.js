import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { sortProducts } from "../../../../store/actions/productsList";
library.add(fab, fas);

class ProductsTableHeader extends Component {

    /**
    * Check if field is active in sorting and highligh it
    */
    setActive = (name) => {
        return (this.props.field === name) ? 'text-primary' : '';
    }

    /**
    * Set ordering icon for visual guidance
    */
    setIcon = (name) => {
        if (this.props.field === name) {
          const direction = (this.props.direction === 'ASC') ? 'up' : 'down';
          return <FontAwesomeIcon icon={["fas", `sort-alpha-${direction}`]} />
        }
    }

    /**
     * Sort products by its field name
     */
    sortProducts = (fieldName) => {
        let orderingDirection;
        const {index, offset, field, direction} = this.props;

        if (fieldName === field) {
            orderingDirection = (direction === 'DESC') ? 'ASC' : 'DESC';
        }
        else {
            orderingDirection = 'ASC'
        }

        this.props.sortProducts( index, offset, fieldName, orderingDirection )
        .then(() => {
            this.props.fetchProducts();
        });
    }

  render() {
    return (
      <tr>
        <th scope="col"
          className={this.setActive('id')}
          onClick={(e) => { this.sortProducts('id') }}>
          {this.setIcon('id')} ID
        </th>
        <th scope="col"
          className={this.setActive('name')}
          onClick={(e) => { this.sortProducts('name') }}>
          {this.setIcon('name')} Name
        </th>
        <th scope="col"
          className={this.setActive('price')}
          onClick={(e) => { this.sortProducts('price') }}>
          {this.setIcon('price')} Price
        </th>
        <th scope="col"
          className={this.setActive('is_perishable')}
          onClick={(e) => { this.sortProducts('is_perishable') }}>
          {this.setIcon('is_perishable')} Is Perishable
        </th>
        <th scope="col"
          className={this.setActive('void_at')}
          onClick={(e) => { this.sortProducts('void_at') }}>
          {this.setIcon('void_at')} Void At
        </th>
        <th scope="col"
          className={this.setActive('manufactured_at')}
          onClick={(e) => { this.sortProducts('manufactured_at') }}>
          {this.setIcon('manufactured_at')} Manufactured At
        </th>
        <th scope="col" >Actions</th>
      </tr>
    );
  }
}

/**
 * Map current state to props
 */
const mapStateToProps = (state) => {
    return {
        totalProducts: state.productListReducer.totalProducts,
        index: state.productListReducer.index,
        offset: state.productListReducer.offset,
        field: state.productListReducer.field,
        direction: state.productListReducer.direction
    };
};
export default withRouter(connect(mapStateToProps, { sortProducts })(ProductsTableHeader));
