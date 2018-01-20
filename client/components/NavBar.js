import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { TiThMenu } from "react-icons/lib/ti";
import { Input, Icon, Modal, Header, Dropdown, Label } from "semantic-ui-react";
import { Login } from "./index";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false
    };
  }
  render() {
    return (
      <div style={navContainer}>
        <TiThMenu size={30} style={menu} />
      </div>
    )
  }
}
export default withRouter(NavBar);

const styles = {
  navContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  menu: {
    padding: '1em',
    fontColor: 'white'
  }
}

const { navContainer, menu } = styles
