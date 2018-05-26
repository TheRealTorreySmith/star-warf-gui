import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className='App'>
        <header className="App-header">
          <div className="globe-container">
              <div className="globe"></div>
          </div>
        </header>
     </div>
    )
  }
}

export default Header
