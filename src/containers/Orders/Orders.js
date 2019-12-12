import React, { Component } from "react";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import axios from "../../axios-orders";

import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders;

    if (this.props.loading) {
      orders = <Spinner />;
    } else {
      orders = this.props.orders.map(order => {
        return (
          <Order
            key={order.key}
            price={order.price}
            ingredients={order.ingredients}
          />
        );
      });
    }

    if (this.props.error) {
      orders = <p>ups! problems loading your orders</p>;
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loadingOrders,
    error: state.order.ordersError,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));
