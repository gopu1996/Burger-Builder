import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, withRouter } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/logout/Logout";
import { connect } from "react-redux";
import * as action from "./store/action/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncBurgerBuilder = asyncComponent(() => {
  return import("./containers/BurgerBuilder/BurgerBuider");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={asyncBurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(action.authCheckState()),
  };
};
export default connect(null, mapDispatchToprops)(App);
