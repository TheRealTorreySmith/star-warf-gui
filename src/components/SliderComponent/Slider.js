import React, { Component } from 'react'
import './Slider.css'

class Slider extends Component {

  render() {
    return (
      <div>
        <form action="#">
          <p className="range-field">
            <input type="range" id="test5" min="0" max="100" />
          </p>
        </form>
      </div>
    )
  }
}

export default Slider
