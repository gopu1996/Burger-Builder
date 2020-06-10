import React, { Component } from "react";
import Aux from "../../hoc/AuxHoc/Auxs";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actionType from "../../store/action/index";
import { Redirect } from "react-router-dom";

// const INGREDIENT_PRICES = {
//   salad: 10.9,
//   cheese: 15.2,
//   meat: 20.4,
//   bacon: 10.5,
// };

export class BurgerBuider extends Component {
  state = {
    purchasing: false,
    //  loading: false,
    //error: false,
  };

  componentDidMount() {
    //  axios.get('https://react-my-buger-a5993.firebaseio.com/ingredients%20.json')
    //  .then(response =>{
    //  this.setState({ingredients:response.data})
    //  }).catch(error=>{
    //      this.setState({error:true})
    //  })
    this.props.onInitIngredient(this.props.token);
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  //   addIngredientHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     const updatedCount = oldCount + 1;
  //     const updatedIngredient = {
  //       ...this.state.ingredients,
  //     };
  //     updatedIngredient[type] = updatedCount;
  //     const priceAddition = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice + priceAddition;
  //     this.setState({
  //       totalPrice: newPrice,
  //       ingredients: updatedIngredient,
  //     });
  //     this.updatePurchaseState(updatedIngredient);
  //   };

  //   removeIngresiebtHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     if (oldCount <= 0) {
  //       return;
  //     }
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredient = {
  //       ...this.state.ingredients,
  //     };
  //     updatedIngredient[type] = updatedCount;
  //     const priceDeduction = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceDeduction;
  //     this.setState({
  //       totalPrice: newPrice,
  //       ingredients: updatedIngredient,
  //     });
  //     this.updatePurchaseState(updatedIngredient);
  //   };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    // alert('you continue')

    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    this.props.history.push(
      //      {  pathname: "/checkout",  search: "?" + queryString, }
      "/checkout"
    );
  };

  render() {
    const disableInfo = {
      ...this.props.ing,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burgerHandler = this.props.error ? (
      <p>ingredients cant't be loaded</p>
    ) : (
      <Spinner />
    );
    let authRedirect = null;
    if (!this.props.token) {
      authRedirect = <Redirect to="/auth" />;
    }
    if (this.props.ing) {
      burgerHandler = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemove}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        {authRedirect}
        <Model
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Model>
        {burgerHandler}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actionType.addIngredient(ingName)),
    onIngredientRemove: (ingName) =>
      dispatch(actionType.removeIngredient(ingName)),
    onInitIngredient: (token) => dispatch(actionType.initIngredient(token)),
    onInitPurchase: () => dispatch(actionType.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuider, axios));
