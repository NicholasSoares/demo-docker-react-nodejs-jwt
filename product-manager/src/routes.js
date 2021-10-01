import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import SignIn from "./pages/SignIn";
import ProductList from "./pages/ProductList";
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
        <Redirect to={{ pathname: "/app", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <GuestOnlyRoute exact path="/" component={SignIn} />
      <PrivateRoute path="/app" component={ProductList} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
