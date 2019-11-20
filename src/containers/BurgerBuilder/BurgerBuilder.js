import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  addIngredientHandler = type => {
    // update ingredient (innmutability)
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    // update price (innmutability)
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    // set state
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    // safeguard
    if (this.state.ingredients[type] === 0) return;

    // update ingredients
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount
    };

    // update price
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    // set state
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingKey => ingredients[ingKey])
      .reduce((added, num) => added + num, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaselHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    console.log("continue with purchase");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.cancelPurchaselHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            closeModal={this.cancelPurchaselHandler}
            continue={this.continuePurchaseHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          purchase={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
