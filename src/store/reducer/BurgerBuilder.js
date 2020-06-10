import * as actionTypes from "../action/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 50.5,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 10.9,
  cheese: 15.2,
  meat: 20.4,
  bacon: 10.5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDENT:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 50.5,
      };
    case actionTypes.FETCH_INGREDENT_FAIELD:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
export default reducer;
