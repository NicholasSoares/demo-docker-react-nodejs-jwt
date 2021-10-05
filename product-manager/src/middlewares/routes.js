import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

/**
 * Check if user can access routes that require login
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
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

/**
 * Check if user can access routes that require a guess users, like user login or user register routes
 */
export const GuestOnlyRoute = ({ component: Component, ...rest }) => (
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