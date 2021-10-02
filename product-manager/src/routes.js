import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import SignIn from "./pages/SignIn";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import ProductCreate from "./pages/ProductCreate";
import NotFound from "./pages/NotFound";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const GuestOnlyRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/products", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand mx-auto" href="#">Product Manager System</a>
    </nav>
    <Switch>
      <GuestOnlyRoute exact path="/" component={SignIn} />
      <PrivateRoute path="/products" component={ProductList} />
      <PrivateRoute path="/product/edit/:id" component={ProductEdit} />
      <PrivateRoute path="/product/create" component={ProductCreate} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
