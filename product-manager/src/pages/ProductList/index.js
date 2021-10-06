import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { Container } from "./styles";
import { logout } from "../../services/auth";
import ProductsTableList from "./components/ProductsTableList";
import Pagination from "./components/Pagination";
import ProductsTableHeader from "./components/ProductsTableHeader";
import Swal from 'sweetalert2';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.changePage.bind(this);
    this.sortProducts.bind(this);

    /**
     * Component States
     */
    this.state = {
      index: 0,
      offset: 10,
      field: 'id',
      direction: 'ASC',
      products: [],
      productCount: 0,
    }
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
  fetchProducts = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();

      const response = await api.get("/product", {
        params: {
          index: this.state.index,
          offset: this.state.offset,
          field: this.state.field,
          direction: this.state.direction,
          error: null,
        }
      });

      this.setState({
        products: response.data.products,
        productCount: response.data.totalProducts,
        error: null
      });

      Swal.close();
    } catch (err) {
      if ([403].includes(err.response?.status)) {
        logout();
        Swal.close();
        this.props.history.push("/");
      }
      else {
        Swal.close();
        Swal.fire({
          text: 'Erro interno do servidor, tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  }

  /**
   * Sort products by its field name
   */
  sortProducts = (fieldName) => {
    let orderingDirection;

    if (fieldName === this.state.field) {
      orderingDirection = (this.state.direction === 'DESC') ? 'ASC' : 'DESC';
    }
    else {
      orderingDirection = 'ASC'
    }

    this.setState({ field: fieldName, direction: orderingDirection }, () => {
      this.fetchProducts();
    });
  }

  /**
   * Navigate in the product list
   */
  changePage = (indexCount) => {
    this.setState({ index: indexCount }, () => {
      this.fetchProducts();
    });
  }

  render() {
    return (
      <Container>
        <div className="container">
          <h4 className="mb-3">Product Listing</h4>
          <table className="table table-striped table-bordered table-responsive w-100 d-block d-md-table">
            <thead>
              <ProductsTableHeader field={this.state.field} direction={this.state.direction} sortProducts={this.sortProducts} />
            </thead>
            <tbody>
              <ProductsTableList products={this.state.products} />
            </tbody>
          </table>
          <p>Total Products: {this.state.productCount}</p>
          <Pagination index={this.state.index} offset={this.state.offset} productCount={this.state.productCount} changePage={this.changePage} />
        </div>
      </Container>
    );
  }
}

export default withRouter(ProductList);
