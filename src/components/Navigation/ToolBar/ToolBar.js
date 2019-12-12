import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import Logo from "../../Logo/Logo";

import classes from "./ToolBar.css";

const toolBar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle toggle={props.toggleSideDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default toolBar;
