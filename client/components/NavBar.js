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
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ dropdown: !this.state.dropdown}, () => {
      const dropdown = document.getElementById('dropdown')
      dropdown.className = this.state.dropdown ? 'show dropdown-content' : 'dropdown-content'
    })
  }

  render() {
    return (
      <div>
        <div style={navContainer}>
          <TiThMenu onClick={this.handleClick} size={30} style={menu} />
        </div>
        <div id="dropdown" className="dropdown-content">
          <div style={record}>
            <Link to="/">record</Link>
          </div>
          <div style={history}>
            <Link to="/dream-history">history</Link>
          </div>
          <div style={settings}>
            <Link to="#">settings</Link>
          </div>
        </div>
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
    color: 'lightgray'
  },
  record: {
    background: '#2A1D7D',
    borderRadius: '10px 10px 0 0'
  },
  history: {
    background: '#5C57A5'
  },
  settings: {
    background: '#12314B',
    borderRadius: '0 0 10px 10px'
  },
}

const { navContainer, menu, record, history, settings } = styles
