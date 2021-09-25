import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AddProduct } from "./AddProduct";
import { EditProduct } from "./EditProduct";
import Product from "./Product";
import "./styles.css";
export default function App() {
  return (
    <Router>
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/">Home</Link>
          <Link to="/addProduct">Add product</Link>
        </Toolbar>
      </AppBar>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/addProduct">
            <AddProduct />
          </Route>
          <Route path="/editProduct/:id">
            <EditProduct />
          </Route>
          <Route exact path="/">
            <Product />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
