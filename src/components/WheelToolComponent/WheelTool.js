import React, { Component } from 'react'
import './WheelTool.css'

class WheelTool extends Component {

  inputOptionBack = () => {
    let hour = this.props.hourSelected - 1
    let hourTranslation = this.props.hourTranslation + 32
    if (this.props.hourSelected !== 0) {
      this.props.hoursChange(hour)
      this.props.hourTranslationChange(hourTranslation)
    }
  }

  inputOptionForward = () => {
    let number = this.props.optionSelected + 1
    let optionTranslation = this.props.hourTranslation - 32
    if (this.props.optionSelected !== 23) {
      this.props.optionChange(number)
      this.props.optionTranslationChange(optionTranslation)
    }
  }

  wheelToolOptions = (number) => {
    let numbers = []
    const numberStyles = {
      transform: `translateX(${this.props.optionTranslation}px)`
    }
    let numbersToShow = [this.props.optionSelected-1, this.props.optionSelected, this.props.optionSelected+1]
    for (var i = 0; i < 24; i++) {
      numbers.push(i)
    }
    return numbers.map(x =>
      <div key={x} ref={x} style={numberStyles}
        className={`numbers wheel-tool-numbers-container ${!numbersToShow.includes(x) ? '' : x === this.props.optionSelected ? 'active' : ''}`}>
        <div className="wheel-tool-numbers">
          {x}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="wheel-tool-container">
        <div className="wheel-tool">
          <div>
            <button className="wheel-tool-button wheel-tool-backward waves-effect" onClick={() => { this.inputOptionBack() }}>
              <i className="material-icons name-input-arrow">chevron_left</i>
            </button>
          </div>
          <div className="wheel-tool-options">
            {this.wheelToolOptions()}
          </div>
          <div>
            <button className="wheel-tool-button wheel-tool-forward waves-effect" onClick={() => { this.inputOptionForward() }}>
              <i className="material-icons name-input-arrow">chevron_right</i>
            </button>
          </div>
          <div>
            <button className="wheel-tool-revert waves-effect" onClick={() => { this.inputOptionRevert() }}>
              <i className="material-icons wheel-tool-revert-arrow">reply</i>
            </button>
          </div>
          <div>
            <button className="wheel-tool-default-revert waves-effect" onClick={() => { this.inputOptionDefaultRevert() }}>
              <i className="material-icons wheel-tool-default-revert-arrow">reply_all</i>
            </button>
          </div>
          <div>
            <button className="wheel-tool-save waves-effect" onClick={() => { this.inputOptionSave() }}>
              <i className="material-icons wheel-tool-save-icon">save</i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default WheelTool
