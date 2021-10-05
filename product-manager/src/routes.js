import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import ProductCreate from "./pages/ProductCreate";
import NotFound from "./pages/NotFound";
import { PrivateRoute, GuestOnlyRoute } from "./middlewares/routes";
import SignOut from "./pages/SignOut";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={GuessContainer}/>
      <Route component={PrivateContainer}/>
    </Switch>
  </BrowserRouter>
);


const GuessContainer = () => (
  <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Product Manager System</a>
    </nav>
    <Switch>
      <GuestOnlyRoute exact path="/" component={SignIn} />
    </Switch>
  </div>
 )

 const PrivateContainer = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="/">Product Manager System</a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/products">Product List</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/product/create">Create New Product</a>
          </li>
          <li className="nav-item">
            <SignOut></SignOut>
          </li>
        </ul>
      </div>
    </nav>
    <Switch>
      <PrivateRoute exact path="/products" component={ProductList} />
      <PrivateRoute exact path="/product/edit/:id" component={ProductEdit} />
      <PrivateRoute exact path="/product/create" component={ProductCreate} />
      <PrivateRoute path="*" component={NotFound} />
    </Switch>
  </div>
 );


export default Routes;