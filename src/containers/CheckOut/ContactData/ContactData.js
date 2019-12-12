import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import classes from "./ContactData.css";

import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest"
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let name in this.state.orderForm) {
      formData[name] = this.state.orderForm[name].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      form_data: formData
    };
    this.props.onOrderBurger(order, this.props.token, this.props.userId);
  };

  onChangeHandler = (event, input) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormelement = {
      ...updatedOrderForm[input]
    };
    updatedFormelement.value = event.target.value;
    updatedFormelement.touched = true;
    updatedFormelement.valid = this.checkValidity(
      updatedFormelement.value,
      updatedFormelement.validation
    );
    updatedOrderForm[input] = updatedFormelement;

    // final form validation
    const formIsValid = Object.keys(updatedOrderForm).reduce((valid, el) => {
      return (
        valid &&
        (updatedOrderForm[el].valid ||
          updatedOrderForm[el].validation === undefined)
      );
    }, true);

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  checkValidity(value, rules) {
    if (rules === undefined) return true;

    let isValid = true;

    if (rules.required && isValid) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
    }

    if (rules.maxLength && isValid) {
      isValid = value.length <= rules.maxLength;
    }

    if (rules.isEmail && isValid) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value);
    }

    if (rules.isNumeric && isValid) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value);
    }

    return isValid;
  }

  render() {
    let form = (
      <form onSubmit={this.orderHandler}>
        {Object.keys(this.state.orderForm).map(name => {
          return (
            <Input
              key={name}
              elementType={this.state.orderForm[name].elementType}
              elementConfig={this.state.orderForm[name].elementConfig}
              value={this.state.orderForm[name].value}
              invalid={!this.state.orderForm[name].valid}
              shouldValidate={this.state.orderForm[name].validation}
              touched={this.state.orderForm[name].touched}
              onChangeHandler={event => this.onChangeHandler(event, name)}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Entry your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token, userId) =>
      dispatch(actions.purchaseBurger(orderData, token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
