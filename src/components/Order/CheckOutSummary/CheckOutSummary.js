import React from "react";

import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";

import classes from "./CheckOutSummary.css";

const checkOutSummary = props => {
  return (
    <div className={classes.CheckOutSummary}>
      <h1>We hope it taste well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" click={props.checkOutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" click={props.checkOutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkOutSummary;
