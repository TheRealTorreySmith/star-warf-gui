import React, { Component } from 'react'
import { Row, Card, Icon, Button } from 'react-materialize'
import './Summary.css'

class Summary extends Component {

  nwpShowClick = () => {
    this.props.nwpShowClick()
  }

  wpsShowClick = () => {
    this.props.wpsShowClick()
  }

  wrfDaShowClick = () => {
    this.props.wrfDaShowClick()
  }

  wrfShowClick = () => {
    this.props.wrfShowClick()
  }

  setMainJob = () => {
    this.props.setMainJob()
  }

  lineOfDots = () => {
    let icons = []
    for (var i = 0; i < 5; i++) {
      icons.push(<i className={`material-icons dot`}>brightness_1</i>)
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
            <div className='col s.5 m.5 l.5 top-left-arrow-div'>
              <i className="material-icons top-left-corner-cycle-arrow">subdirectory_arrow_left</i>
              <i className={`material-icons dot top-left-dot`}>brightness_1</i>
              <i className={`material-icons dot bottom-left-dot`}>brightness_1</i>
            </div>
            <Card id="nwp-box" className='col s2 m2 l2 summary-component' onClick={this.nwpShowClick}>
              <Row className="wps-text">NWP
                <Icon className="wps-job-icon icon-white">
                {this.props.threeDvar || this.props.fourDvar ?
                  this.props.ensemble || this.props.standard ?
                    this.props.fullRes || this.props.gfs ?
                    'done'
                    :'close'
                  :'close'
                :'close'}
                </Icon>
              </Row>
              <Row className="nwp-summary-container-row">
                {this.props.threeDvar ? <div className='nwp-three-dvar animated fadeIn'>3DVAR</div> : ''}
                {this.props.threeDensvar ? <div className='nwp-three-densvar animated fadeIn'>3DENSVAR</div> : ''}
                {this.props.fourDensvar ? <div className='nwp-four-densvar animated fadeIn'>4DENSVAR</div> : ''}
              </Row>
            </Card>
            <div className='col s.5 m.5 l.5'>
              <i className="material-icons top-cycle-arrow">keyboard_backspace</i>
            </div>
            <Card id="wps-box" className='col s3 m3 l3 summary-component' onClick={this.wpsShowClick}>
              <Row className="wps-text">WPS<Icon className="wps-job-icon icon-white">done</Icon></Row>
              <Row className="wps-three-boxes">
                <div id="domain-box" className='white'></div>
                <div id="calendar-box" className='white'></div>
                <div id="jobType-box" className='white'></div>
              </Row>
            </Card>
            <div className='col s.5 m.5 l.5'>
              <i className="material-icons top-cycle-arrow">keyboard_backspace</i>
            </div>
            <Card className='col s2 m2 l2 summary-component' onClick={this.wrfDaShowClick}>
              <Row className="wps-text">WRF-DA<Icon className="wps-job-icon icon-white">done</Icon></Row>
            </Card>
            <div className='col s.5 m.5 l.5'>
              <i className="material-icons top-cycle-arrow">keyboard_backspace</i>
            </div>
            <Card className='col s2 m2 l2 summary-component' onClick={this.wrfShowClick}>
              <Row className="wps-text">WRF<Icon className="wps-job-icon icon-white">done</Icon></Row>
            </Card>
            <div className='col s.5 m.5 l.5 top-right-arrow-div'>
              <i className="material-icons top-right-corner-cycle-arrow">subdirectory_arrow_left</i>
              <i className={`material-icons dot top-right-dot`}>brightness_1</i>
              <i className={`material-icons dot bottom-right-dot`}>brightness_1</i>
            </div>
          </div>
          <div className='col s1 m1 l1 play-container'>
            <Button className="main-play-button waves-effect" onClick={this.setMainJob}>
              {this.props.runMainJob ? <i className="cache-icon material-icons">close</i> :
              <i className="cache-icon material-icons">play_arrow</i>}
            </Button>
            <div>
              {this.props.runMainJob ?
              <img src="https://icons8.com/preloaders/preloaders/744/Three%20arrows.gif" height="50px" width="50px"/> :
              <img className="three-spinning-arrows" src="https://icons8.com/preloaders/preloaders/744/Three%20arrows.jpg" height="50px" width="50px"/>}
              <p className="cycle-count">20</p>
            </div>
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
