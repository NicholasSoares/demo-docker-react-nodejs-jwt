import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fab, fas);

class ProductsTableHeader extends Component {

/**
 * Check if field is active in sorting and highligh it
 */
  setActive = (name) => {
    return (this.props.field == name)? 'text-primary' : '';
  }

/**
 * Set ordering icon for visual guidance
 */
  setIcon = (name) => {
    if (this.props.field == name ){
        return (this.props.direction == 'ASC')?
        <FontAwesomeIcon icon={["fas", "sort-alpha-up"]} />:
        <FontAwesomeIcon icon={["fas", "sort-alpha-down"]} />;
    }
  }

/**
 * Sort products by its field name
 */
  orderBy = (fieldName) =>{
    this.props.sortProducts(fieldName);
  }

  render() {
    return (
      <tr>
        <th scope="col" className={this.setActive('id')} onClick={ (e) => {this.orderBy('id')} }>{this.setIcon('id')} ID</th>
        <th scope="col" className={this.setActive('name')} onClick={ (e) => {this.orderBy('name')} }>{this.setIcon('name')} Name</th>
        <th scope="col" className={this.setActive('price')} onClick={ (e) => {this.orderBy('price')} }>{this.setIcon('price')} Price</th>
        <th scope="col" className={this.setActive('is_perishable')} onClick={ (e) => {this.orderBy('is_perishable')} }>{this.setIcon('is_perishable')} Is Perishable</th>
        <th scope="col" className={this.setActive('void_at')} onClick={ (e) => {this.orderBy('void_at')} }>{this.setIcon('void_at')} Void At</th>
        <th scope="col" className={this.setActive('manufactured_at')} onClick={ (e) => {this.orderBy('manufactured_at')} }>{this.setIcon('manufactured_at')} Manufactured At</th>
        <th scope="col" >Actions</th>
      </tr>
    );
  }

}

export default ProductsTableHeader;
