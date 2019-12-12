import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.css";

const navigationItems = props => {
  let navigation = [
    <NavigationItem key="home" link="/">
      Burger Builder
    </NavigationItem>,
    <NavigationItem key="orders" link="/orders">
      Orders
    </NavigationItem>,
    <NavigationItem key="logout" link="/logout">
      Logout
    </NavigationItem>
  ];
  if (!props.isAuth) {
    navigation = [
      <NavigationItem key="home" link="/">
        Burger Builder
      </NavigationItem>,
      <NavigationItem key="auth" link="/auth">
        Authenticate
      </NavigationItem>
    ];
  }

  return <ul className={classes.NavigationItems}>{navigation}</ul>;
};

export default navigationItems;
