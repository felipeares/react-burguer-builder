import React, { Component } from "react";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    axios
      .get("orders.json")
      .then(response => {
        const orders = Object.keys(response.data).map(key => {
          return { ...response.data[key], key: key };
        });
        this.setState({
          orders: orders,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  render() {
    let orders;

    if (this.state.loading) {
      orders = <Spinner />;
    } else {
      orders = this.state.orders.map(order => {
        return (
          <Order
            key={order.key}
            price={order.price}
            ingredients={order.ingredients}
          />
        );
      });
    }

    if (this.state.error) {
      orders = <p>ups! problems loading your orders</p>;
    }

    return <div>{orders}</div>;
  }
}

export default WithErrorHandler(Orders, axios);
