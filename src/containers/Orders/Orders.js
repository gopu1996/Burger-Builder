import React, { Component } from "react";
import Order from "../../components/order/Order";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actionType from "../../store/action/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Orders extends Component {
  // state={
  //      orders:[],
  //      loading: true
  //  }

  componentDidMount() {
    // axios.get('/orders.json')
    // .then(res=>{
    //     const fetchOrders =[];
    //     for(let key in res.data){
    //      fetchOrders.push({
    //          ...res.data[key],
    //          id:key
    //         })
    //     }
    //     this.setState({
    //         loading:false,
    //         orders:fetchOrders
    //     })
    // })
    // .catch(err=>{
    //     this.setState({
    //         loading:false
    //     })
    // })
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }

  render() {
    let isRedirect = null;
    if (!this.props.token) {
      isRedirect = <Redirect to="/auth" />;
    }

    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return (
      <div>
        {isRedirect}
        {orders}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(actionType.fetchOrder(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));
