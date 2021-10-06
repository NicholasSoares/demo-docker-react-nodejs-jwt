import React from "react";
import {BrowserRouter, Route, Switch, NavLink} from "react-router-dom";
import SignIn from "./pages/SignIn";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import ProductCreate from "./pages/ProductCreate";
import NotFound from "./pages/NotFound";
import {PrivateRoute, GuestOnlyRoute} from "./middlewares/routes";
import SignOut from "./pages/SignOut";

/**
 * Main app router module
 */
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={GuessContainer}/>
            <Route path="*" component={PrivateContainer}/>
        </Switch>
    </BrowserRouter>
);

/**
 * Public routes menu and internal router
 */
const GuessContainer = () => (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Product Manager System</a>
        </nav>
        <Switch>
            <GuestOnlyRoute exact path="/" component={SignIn}/>
        </Switch>
    </div>
)

/**
 * Private routes menu and internal router
 */
const PrivateContainer = () => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <a className="navbar-brand" href="/">Product Manager System</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact={true} activeClassName='active' to='/products'>
                            Product List
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact={true} activeClassName='active' to='/product/create'>
                            Create New Product
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <SignOut/>
                    </li>
                </ul>
            </div>
        </nav>
        <Switch>
            <PrivateRoute exact path="/products" component={ProductList}/>
            <PrivateRoute exact path="/product/edit/:id" component={ProductEdit}/>
            <PrivateRoute exact path="/product/create" component={ProductCreate}/>
            <PrivateRoute path="*" component={NotFound}/>
        </Switch>
    </div>
);

export default Routes;