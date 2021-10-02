import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import { Container } from "./styles";
import { logout } from "../../services/auth";
import ProductsTableList from "./components/ProductsTableList";
import Pagination from "./components/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fab, fas);

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.changePage.bind(this);
  }

  /**
   * Component States
   */
  state = {
    index: 0,
    offset: 10,
    field: 'id',
    direction: 'ASC',
    products: [],
    productCount: 0,
  }

  /**
   * Populate list when loading page
   */
  componentDidMount() {
    this.fetchProducts();
  }

  /**
   * Fetch products from api with given filters
   */
  fetchProducts = async () =>{
    try {
      const response = await api.get("/product", {
        params: { 
          index: this.state.index,
          offset: this.state.offset,
          field: this.state.field,
          direction: this.state.direction,
        }
      });

      this.setState({ 
        products: response.data.products,
        productCount: response.data.totalProducts
      });

    } catch (err) {
      logout();
      this.props.history.push("/");
    }
  }

  /**
   * Sort products by its field name
   */
  sortProducts = (fieldName) =>{
    let orderingDirection = this.state.direction;

    if(fieldName === this.state.field){
      orderingDirection = (this.state.direction == 'DESC')? 'ASC' : 'DESC';
    }
    else{
      orderingDirection = 'ASC'
    }

    this.setState({field: fieldName, direction: orderingDirection}, () => {
      this.fetchProducts();
    });
  }

  /**
   * Check if field is active in sorting and highligh it
   */
  checkAndSetActiveField = (name) => {
    return (this.state.field == name)? 'text-primary' : '';
  }

  /**
   * Navigate in the product list
   */
  changePage = (indexCount) => {
    this.setState({index: indexCount}, () => {
      this.fetchProducts();
    });
  }

  /**
   * Set ordering icon for visual guidance
   */
  setOrderingDirectionIcon = (name) => {
    if (this.state.field == name ){
        return (this.state.direction == 'ASC')?
        <FontAwesomeIcon icon={["fas", "sort-alpha-up"]} />:
        <FontAwesomeIcon icon={["fas", "sort-alpha-down"]} />;
    }
  }

  render() {
    return (
      <Container>
        <div className="container">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col" className={this.checkAndSetActiveField('id')} onClick={ (e) => {this.sortProducts('id')} }>{this.setOrderingDirectionIcon('id')} ID</th>
                <th scope="col" className={this.checkAndSetActiveField('name')} onClick={ (e) => {this.sortProducts('name')} }>{this.setOrderingDirectionIcon('name')} Name</th>
                <th scope="col" className={this.checkAndSetActiveField('price')} onClick={ (e) => {this.sortProducts('price')} }>{this.setOrderingDirectionIcon('price')} Price</th>
                <th scope="col" className={this.checkAndSetActiveField('is_perishable')} onClick={ (e) => {this.sortProducts('is_perishable')} }>{this.setOrderingDirectionIcon('is_perishable')} Is Perishable</th>
                <th scope="col" className={this.checkAndSetActiveField('void_at')} onClick={ (e) => {this.sortProducts('void_at')} }>{this.setOrderingDirectionIcon('void_at')} Void At</th>
                <th scope="col" className={this.checkAndSetActiveField('manufactured_at')} onClick={ (e) => {this.sortProducts('manufactured_at')} }>{this.setOrderingDirectionIcon('manufactured_at')} Manufactured At</th>
              </tr>
            </thead>
            <tbody>
              <ProductsTableList products={this.state.products} />
            </tbody>
          </table>
          <p>Total Products: {this.state.productCount}</p>
          <Pagination index={this.state.index} offset={this.state.offset} productCount={this.state.productCount} changePage={this.changePage}/>
        </div>
      </Container>
    );
  }
}

export default withRouter(ProductList);
