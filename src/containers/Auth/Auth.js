import React, { Component } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Auth.css";

import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignedUp: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetRedirectPath();
    }
  }

  onChangeHandler = (event, name) => {
    const newValue = event.target.value;
    const updatedControls = {
      ...this.state.controls,
      [name]: {
        ...this.state.controls[name],
        value: newValue,
        touched: true,
        valid: this.checkValidity(
          newValue,
          this.state.controls[name].validation
        )
      }
    };

    // final form validation
    const formIsValid = Object.keys(updatedControls).reduce((valid, el) => {
      return (
        valid &&
        (updatedControls[el].valid ||
          updatedControls[el].validation === undefined)
      );
    }, true);

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
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

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignedUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignedUp: !prevState.isSignedUp
      };
    });
  };

  render() {
    let submit = (
      <div>
        {Object.keys(this.state.controls).map(name => {
          return (
            <Input
              key={name}
              elementType={this.state.controls[name].elementType}
              elementConfig={this.state.controls[name].elementConfig}
              value={this.state.controls[name].value}
              invalid={!this.state.controls[name].valid}
              shouldValidate={this.state.controls[name].validation}
              touched={this.state.controls[name].touched}
              onChangeHandler={event => this.onChangeHandler(event, name)}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Login
        </Button>
      </div>
    );
    if (this.props.loading) {
      submit = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {errorMessage}

          {submit}
        </form>
        <Button btnType="Danger" click={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignedUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onAuth: (email, password, isSignedUp) =>
      dispatch(actions.auth(email, password, isSignedUp)),
    onSetRedirectPath: () => dispatch(actions.setAuthRedirect("/"))
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Auth);
