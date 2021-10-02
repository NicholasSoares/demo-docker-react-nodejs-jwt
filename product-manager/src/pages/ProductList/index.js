import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import { Container } from "./styles";
import { logout } from "../../services/auth";
import ProductsTableList from "./components/ProductsTableList";
import Pagination from "./components/Pagination";
import ProductsTableHeader from "./components/ProductsTableHeader";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.changePage.bind(this);
    this.sortProducts.bind(this);
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
   * Navigate in the product list
   */
  changePage = (indexCount) => {
    this.setState({index: indexCount}, () => {
      this.fetchProducts();
    });
  }

  render() {
    return (
      <Container>
        <div className="container">
          <table className="table table-striped table-bordered">
            <thead>
              <ProductsTableHeader field={this.state.field} direction={this.state.direction} sortProducts={this.sortProducts} />
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
