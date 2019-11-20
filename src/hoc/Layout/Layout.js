import React, { Component } from "react";
import Aux from "../Aux/Aux";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.css";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  sideToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <ToolBar toggleSideDrawer={this.sideToggleHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          closeSideDrawer={this.sideDrawerCloseHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
