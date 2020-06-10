import React, { Component } from "react";
import CheckoutSummary from "../../components/order/checkoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
  //   state = {
  //     ingredients: null,
  //     totalPrice: 0,
  //   };
  //    componentWillMount(){
  //     const query = new URLSearchParams(this.props.location.search);
  //     const ingredients = {};
  //     let price = 0;

  //     for (let param of query.entries()) {
  //         // ['salad', '1']
  //         if (param[0] === 'price') {
  //             price = param[1];
  //         } else {
  //             ingredients[param[0]] = +param[1];
  //         }

  //     }
  //     this.setState({ingredients: ingredients, totalPrice: price});
  //    }

  checkoutCancelHandeler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandeler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ing}
            checkoutCancel={this.checkoutCancelHandeler}
            checkoutContinue={this.checkoutContinueHandeler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return (
      <div>
        {summary}
        {/* // <Route
        //   path={this.props.match.path + "/contact-data"}
        //   //   render={(props) => (
        //   //     <ContactData
        //   //       ingredients={this.props.ing}
        //   //       price={this.props.price}
        //   //    {...props}
        //   component={ContactData}
        // />
        )} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
