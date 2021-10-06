import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "./styles";

class NotFound extends Component {

  render() {
    return (
      <Container>
        <div className='flex-column'>
          <div className='d-flex justify-content-center'>
            <h1>404 Not Found</h1>
          </div>
          <div className='d-flex justify-content-center mt-5'>
            <a href='/'>Go to Home Page</a>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(NotFound);
