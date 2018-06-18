import React, { Component } from 'react'
import { Row, Icon, Dropdown, NavItem } from 'react-materialize'
import './NavBar.css'

class NavBar extends Component {

  render() {
    return (
      <div>
        <Row className="navbar">
          <div>
            <div className="dash-title">
              {this.props.currentJobName ? this.props.currentJobName : 'STAR'}
            </div>
            <div>
              <Dropdown trigger={
                  <a className="dropdown"><Icon className="menu-icon">reorder</Icon></a>
                }>
                <NavItem className="dropdown-item">Job Status</NavItem>
                <NavItem className="dropdown-item">Settings</NavItem>
                <NavItem className="dropdown-item">Logout</NavItem>
              </Dropdown>
            </div>
          </div>
        </Row>
     </div>
    )
  }
}

export default NavBar
