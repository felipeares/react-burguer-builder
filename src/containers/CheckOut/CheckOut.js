import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "../../containers/CheckOut/ContactData/ContactData";

class CheckOut extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  // DEPRECATED
  UNSAFE_componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let params of query.entries()) {
      if (params[0] === "price") totalPrice = +params[1];
      else ingredients[params[0]] = +params[1];
    }
    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

  checkOutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkOutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          checkOutCancelled={this.checkOutCancelledHandler}
          checkOutContinue={this.checkOutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default CheckOut;
