import React from "react";

import classes from "./Order.css";

const order = props => {
  const ingredients = Object.keys(props.ingredients)
    .filter(ing_key => {
      return props.ingredients[ing_key] > 0;
    })
    .map(ing_key => {
      return (
        <span
          style={{
            textTransform: "capitalize",
            display: "inline-box",
            margin: "0 8px",
            border: "1px solid gray",
            padding: "5px"
          }}
          key={ing_key}
        >
          {ing_key + " (" + props.ingredients[ing_key] + ")"}
        </span>
      );
    });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price</p> <strong>USD {props.price.toFixed(2)} </strong>
    </div>
  );
};

export default order;
