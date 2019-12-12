import React from "react";

import classes from "./SideDrawer.css";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const sideDrawer = props => {
  const attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) attachedClasses[1] = classes.Open;

  return (
    <Aux>
      <BackDrop show={props.show} clicked={props.closeSideDrawer} />
      <div
        className={attachedClasses.join(" ")}
        onClick={props.closeSideDrawer}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
