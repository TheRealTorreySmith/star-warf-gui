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
              {this.props.currentJob ? this.props.currentJob.name : 'STAR'}
            </div>
            <div>
              <Dropdown trigger={
                  <a className="dropdown"><Icon className="menu-icon">reorder</Icon></a>
                }>
                <NavItem className="dropdown-item" onClick={this.jobStatus}>Job Status</NavItem>
                <NavItem className="dropdown-item" onClick={this.jobSelect}>Job Select</NavItem>
                <NavItem className="dropdown-item" onClick={this.settings}>Settings</NavItem>
                <NavItem className="dropdown-item" onClick={this.logout}>Logout</NavItem>
              </Dropdown>
            </div>
          </div>
        </Row>
     </div>
    )
  }
}

export default NavBar
