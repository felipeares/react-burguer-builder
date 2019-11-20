import React, { Component } from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  /*
  componentDidUpdate() {
    console.log("[OrderSummary] did update");
  }
  */

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      ingKey => {
        return (
          <li key={ingKey}>
            <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
            {this.props.ingredients[ingKey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious order with all your ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button click={this.props.closeModal} btnType="Danger">
          CANCEL
        </Button>
        <Button btnType="Success" click={this.props.continue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
