import React, { Component } from 'react'
import { Row, Card, Icon, Button } from 'react-materialize'
import './Summary.css'

class Summary extends Component {

  wpsShowClick = () => {
    this.props.wpsShowClick()
  }

  setMainJob = () => {
    this.props.setMainJob()
  }

  lineOfDots = () => {
    let icons = []
    for (var i = 0; i < 5; i++) {
      icons.push(<i className="material-icons dot">brightness_1</i>)
    }
    return icons
  }

  render() {
    return (
      <div>
        {/* SUMMARY CONTAINER */}
        <Card>
        <div className="row summary-container">
          <div className='col s11 m11 l11'>
            <Card id="nwp-box" className='col s2 m2 l2 summary-component'>
              <Row className="wps-text">NWP<Icon className="wps-job-icon icon-white">done</Icon></Row>
            </Card>
            <Card id="wps-box" className='col s3 m3 l3 summary-component blue' onClick={this.wpsShowClick}>
              <Row className="wps-text">WPS<Icon className="wps-job-icon icon-white">done</Icon></Row>
              <Row className="wps-three-boxes">
                <div id="domain-box" className='white'></div>
                <div id="calendar-box" className='white'></div>
                <div id="jobType-box" className='white'></div>
              </Row>
            </Card>
            <div className='col s1 m1 l1'>
            </div>
            <Card className='col s2 m2 l2 summary-component'>
              <Row className="wps-text">WRF<Icon className="wps-job-icon icon-white">done</Icon></Row>
            </Card>
            <div className='col s1 m1 l1'>
            </div>
            <Card className='col s2 m2 l2 summary-component'>
              <Row className="wps-text">WRF-DA<Icon className="wps-job-icon icon-white">done</Icon></Row>
            </Card>
          </div>
          <div className='col s1 m1 l1 play-container'>
            <Button className="main-play-button waves-effect" onClick={this.setMainJob}>
              {this.props.runMainJob ? <i className="cache-icon material-icons">close</i> :
              <i className="cache-icon material-icons">play_arrow</i>}
            </Button>
            {this.props.runMainJob ?
            <img src="https://icons8.com/preloaders/preloaders/744/Three%20arrows.gif" height="50px" width="50px"/> :
            <img src="https://icons8.com/preloaders/preloaders/744/Three%20arrows.jpg" height="50px" width="50px"/>}
          </div>
        </div>
        <div className="row">
          <div className='col s11 m11 l11 bottom-arrow-div'>
            <i className="material-icons bottom-left-corner-cycle-arrow">subdirectory_arrow_left</i>
              {this.lineOfDots()}
            <i className="material-icons bottom-cycle-arrow">keyboard_backspace</i>
              {this.lineOfDots()}
            <i className="material-icons bottom-cycle-arrow">keyboard_backspace</i>
              {this.lineOfDots()}
            <i className="material-icons bottom-cycle-arrow">keyboard_backspace</i>
              {this.lineOfDots()}
            <i className="material-icons bottom-cycle-arrow">keyboard_backspace</i>
              {this.lineOfDots()}
            <i className="material-icons bottom-right-corner-cycle-arrow">subdirectory_arrow_left</i>

          </div>
        </div>
      </Card>
     </div>
    )
  }
}

export default Summary
