import React, { Component } from 'react'
import { Row, Card, Icon, Button } from 'react-materialize'
import CalendarRange from '../CalendarComponent/CalendarRange'
import globeBackground from '../CarouselComponent/wrf-gfs-darkblue-wordless.png'
import globeImage from '../CarouselComponent/globe.png'
import './Summary.css'

class Summary extends Component {

  nwpShowClick = () => {
    this.props.nwpShowClick()
  }

  wpsShowClick = () => {
    this.props.wpsShowClick()
  }

  daShowClick = () => {
    this.props.daShowClick()
  }

  wrfShowClick = () => {
    this.props.wrfShowClick()
  }

  setMainJob = () => {
    this.props.setMainJob()
  }

  lineOfDots = () => {
    let icons = []
    for (var i = 0; i < 8; i++) {
      icons.push(<i key={i} className={`material-icons dot`}>brightness_1</i>)
    }
    return icons
  }

  lineOfSmallDots = () => {
    let icons = []
    for (var i = 0; i < 15; i++) {
      icons.push(<i key={i} className={`material-icons small-dot`}>brightness_1</i>)
    }
    return icons
  }

  lineOfSmallDotsTop = () => {
    let icons = []
    for (var i = 0; i < 10; i++) {
      icons.push(<i key={i} className={`material-icons small-dot`}>brightness_1</i>)
    }
    return icons
  }

  lineOfSmallDotsMiddle = () => {
    let icons = []
    for (var i = 0; i < 13; i++) {
      icons.push(<i key={i} className={`material-icons small-dot`}>brightness_1</i>)
    }
    return icons
  }

  render() {
    return (
      <div>
        {/* SUMMARY CONTAINER */}
        <Card className="main-summary-container">
        <div className="row summary-container">
          <div className='col s11 m11 l11'>
            {/* NWP CARD */}
            <Card id="nwp-box" className={`col s2 m2 l2 ${this.props.showNwp ? 'summary-component-highlight' : 'summary-component'}`} onClick={this.nwpShowClick}>
              <Row className={`${this.props.threeDvar || this.props.threeDensvar || this.props.fourDensvar ? 'wps-text-white' : 'wps-text-black'}`}>NWP
                <Icon className={`wps-job-icon ${this.props.threeDvar || this.props.threeDensvar || this.props.fourDensvar ? 'icon-white' : ''}`}>
                {this.props.threeDvar ||
                  this.props.threeDensvar ||
                  this.props.fourDensvar ?
                  'done': ''}
                </Icon>
              </Row>
              <Row className="nwp-summary-container-row">
                {this.props.threeDvar ? <div className='nwp-three-dvar animated fadeIn'>3DVAR</div> : ''}
                {this.props.threeDensvar ? <div className='nwp-three-densvar animated fadeIn'>3DENSVAR</div> : ''}
                {this.props.fourDensvar ? <div className='nwp-four-densvar animated fadeIn'>4DENSVAR</div> : ''}
              </Row>
              <Row className="nwp-hours-container">
                {this.props.threeDvar || this.props.threeDensvar || this.props.fourDensvar ?
                   <div className="nwp-hours-title animated fadeIn">Hours: {this.props.hourFrequency}</div>
                   : ''}
              </Row>
              {/* <Row className="cycling-arrows-container">
                {this.props.runMainJob ?
                <img className="three-static-arrows" alt="preloader arrows symbolizing a cycle" src="https://icons8.com/preloaders/preloaders/744/Three%20arrows.gif" height="30px" width="30px"/> :
                <img className="three-spinning-arrows" alt="preloader arrows symbolizing a cycle currently running" src="https://icons8.com/preloaders/preloaders/744/Three%20arrows.jpg" height="30px" width="30px"/>}
                <p className="cycle-count">20</p>
              </Row> */}
            </Card>
            {this.props.threeDvar ?
            <div className='col s.5 m.5 l.5 top-left-arrow-div'>
              <i className="material-icons top-left-corner-cycle-arrow">subdirectory_arrow_left</i>
              <i className={`material-icons dot top-left-dot`}>brightness_1</i>
              <i className={`material-icons dot bottom-left-dot`}>brightness_1</i>
              <i className={`material-icons dot bottom-left-dot`}>brightness_1</i>
            </div>
            :
            <div className='col s.5 m.5 l.5 top-left-arrow-div-placeholder'>
            </div>}
            {/* WPS CARD */}
            <Card id="wps-box" className={`col s3 m3 l3 ${this.props.showWps ? 'summary-component-highlight' : 'summary-component'}`} onClick={this.wpsShowClick}>
              <Row className={`${this.props.wpsTypeSaved && this.props.selectionStart && this.props.selectionEnd && this.props.mapSaved ? 'wps-text-white' : 'wps-text-black'}`}>WPS
                <Icon className={`wps-job-icon ${this.props.wpsTypeSaved && this.props.selectionStart && this.props.selectionEnd && this.props.mapSaved ? 'icon-white' : ''}`}>
                  {this.props.wpsTypeSaved && this.props.selectionStart && this.props.selectionEnd && this.props.mapSaved ? 'done':''}
                </Icon>
              </Row>
              <Row className="wps-three-boxes">
                <div id="domain-box">
                </div>
                <div id="calendar-box">
                   <CalendarRange
                     dateFrom={this.props.selectionStart}
                     dateTo={this.props.selectionEnd}
                   />
                </div>
                <div id="jobType-box">
                  {this.props.gfs ?
                    <div className="initial-boundary-container">
                      <img className="gfs-image animated fadeIn" src={globeBackground} alt="blue globe background logo"></img>
                      <div className="gfs-summary-acronym-lettering animated fadeIn">GFS</div>
                    </div>
                    : null}
                  {this.props.hrrr ?
                    <div className="initial-boundary-container">
                      <img className="hrrr-image animated fadeIn" src={globeBackground} alt="blue globe background logo"></img>
                      <div className="hrrr-summary-acronym-lettering animated fadeIn">HRRR</div>
                    </div>
                    : null}
                  {this.props.nam ?
                    <div className="initial-boundary-container">
                      <img className="nam-image animated fadeIn" src={globeBackground} alt="blue globe background logo"></img>
                      <div className="nam-summary-acronym-lettering animated fadeIn">NAM</div>
                    </div>
                    : null}
                </div>
              </Row>
            </Card>
            {this.props.threeDvar || this.props.threeDensvar || this.props.fourDensvar ?
            <div className='col s.5 m.5 l.5'>
              <i className="material-icons top-cycle-arrow">keyboard_backspace</i>
            </div>
            :
            <div className='col s.5 m.5 l.5 top-cycle-arrow-placeholder'>
            </div>}
            <Card className={`col s2 m2 l2 ${this.props.showDa ? 'summary-component-highlight' : 'summary-component'}`} onClick={this.daShowClick}>
              <Row className={this.props.gsi || this.props.wrfda ? 'wps-text-white' : 'wps-text-black'}>
                {this.props.gsi ? 'GSI': null}
                {this.props.wrfda ? 'WRFDA': null}
                {!this.props.wrfda && !this.props.gsi ? 'DA': null}
                <Icon className={`wps-job-icon ${this.props.gsi || this.props.wrfda ? 'icon-white' : ''}`}>
                  {this.props.gsi || this.props.wrfda ? 'done' : ''}</Icon>
              </Row>
              <Row className="image-summary-container">
                {this.props.gsi ?
                  <div className="gsi-summary-image-container animated fadeIn">
                    <img src={globeImage} className="gsi-summary-image" alt="National Centers for Environmental Prediction logo"></img>
                    <div className="ncep-summary-text">NCEP</div>
                  </div>
                  : null}
                {this.props.wrfda ?
                  <div className="wrfda-summary-image-container animated fadeIn">
                    <img src={globeImage} className="wrfda-summary-image" alt="WRF logo"></img>
                    <div className="wrfda-summary-text">WRFDA</div>
                  </div>
                  : null}
              </Row>
            </Card>
            {this.props.threeDvar || this.props.threeDensvar || this.props.fourDensvar ?
            <div className='col s.5 m.5 l.5'>
              <i className="material-icons top-cycle-arrow">keyboard_backspace</i>
            </div>
            :
            <div className='col s.5 m.5 l.5 top-cycle-arrow-placeholder'>
            </div>}
            <Card className={`col s2 m2 l2 ${this.props.showWrf ? 'summary-component-highlight' : 'summary-component'}`} onClick={this.wrfShowClick}>
              <Row className={`wps-text-black`}>WRF
                <Icon className={`wps-job-icon ${this.props.gsi || this.props.wrfda ? 'icon-white' : ''}`}>
                {this.props.gsi || this.props.wrfda ? 'done' : ''}</Icon>
              </Row>
            </Card>
            {this.props.threeDvar ?
            <div className='col s.5 m.5 l.5'>
              <i className="material-icons top-cycle-arrow">keyboard_backspace</i>
            </div>
            :null}
            {this.props.threeDensvar || this.props.fourDensvar ?
            <div className='col s.5 m.5 l.5 three-wrf-arrows-container'>
              <Row className="three-arrows-from-wrf">
              <i className="material-icons three-wrf-arrows-top">keyboard_backspace</i>
              </Row>
              <Row className="three-arrows-from-wrf">
              <i className="material-icons three-wrf-arrows">keyboard_backspace</i>
              </Row>
              <Row className="three-arrows-from-wrf">
              <i className="material-icons three-wrf-arrows">keyboard_backspace</i>
              </Row>
            </div>
            :null}
            {this.props.threeDvar ?
            <div className='col s.5 m.5 l.5 top-right-arrow-div'>
              <i className="material-icons top-right-corner-cycle-arrow">subdirectory_arrow_left</i>
              <i className={`material-icons dot top-right-dot`}>brightness_1</i>
              <i className={`material-icons dot bottom-right-dot`}>brightness_1</i>
              <i className={`material-icons dot bottom-right-dot`}>brightness_1</i>
            </div>
            :null}
            {this.props.threeDensvar || this.props.fourDensvar ?
              <div className='col s.5 m.5 l.5 top-right-arrow-div'>
                <i className="material-icons top-right-corner-cycle-arrow-small">subdirectory_arrow_left</i>
              </div>
            :null}
          </div>
          <div className='col s.5 m.5 l.5 play-container'>
            <Button className="main-play-button waves-effect" onClick={this.setMainJob}>
              {this.props.runMainJob ? <i className="cache-icon material-icons">close</i> :
              <i className="cache-icon material-icons">play_arrow</i>}
            </Button>
          </div>
        </div>
        {this.props.threeDvar ?
          <div className="row small-arrow-container-one">
            <div className='col s2 m2 l2 bottom-arrow-div'></div>
            <div className='col s9 m9 l9 bottom-arrow-div'>
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
            <div className='col s1 m1 l1 bottom-arrow-div'></div>
            <div className="row bottom-arrow-spacer-threedens">
              <div className='col s2 m2 l2 bottom-arrow-div'></div>
              <div className='col s9 m9 l9 bottom-arrow-div'>
              </div>
              <div className='col s1 m1 l1 bottom-arrow-div'></div>
            </div>
          </div>
          : null}
          {this.props.threeDensvar || this.props.fourDensvar ?
          <div>
            <div className="row top-small-arrow-container small-arrow-container-two">
              <div className='col s2 m2 l2 bottom-arrow-div'></div>
              <div className='col s9 m9 l9 bottom-arrow-div'>
                {/* <i className={`material-icons small-dot`}>brightness_1</i> */}
                <i className="material-icons bottom-left-corner-cycle-arrow-small">subdirectory_arrow_left</i>
                  {this.lineOfSmallDotsTop()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-right-corner-cycle-arrow-small">subdirectory_arrow_left</i>
              </div>
              <div className='col s1 m1 l1 bottom-arrow-div'></div>
            </div>
            <div className="row top-small-arrow-container small-arrow-container-three">
              <div className='col s2 m2 l2 bottom-arrow-div'></div>
              <div className='col s9 m9 l9 bottom-arrow-div'>
                <i className="material-icons bottom-left-corner-cycle-arrow-small">subdirectory_arrow_left</i>
                  {this.lineOfSmallDotsMiddle()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-right-corner-cycle-arrow-small">subdirectory_arrow_left</i>
              </div>
              <div className='col s1 m1 l1 bottom-arrow-div'></div>
            </div>
            <div className="row">
              <div className='col s2 m2 l2 bottom-arrow-div'></div>
              <div className='col s9 m9 l9 bottom-arrow-div'>
                <i className="material-icons bottom-left-corner-cycle-arrow-small">subdirectory_arrow_left</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-cycle-arrow-small">keyboard_backspace</i>
                  {this.lineOfSmallDots()}
                <i className="material-icons bottom-right-corner-cycle-arrow-small">subdirectory_arrow_left</i>
              </div>
              <div className='col s1 m1 l1 bottom-arrow-div'></div>
            </div>
            <div className="row bottom-arrow-spacer-threedensvar">
              <div className='col s2 m2 l2 bottom-arrow-div'></div>
              <div className='col s9 m9 l9 bottom-arrow-div'>
              </div>
              <div className='col s1 m1 l1 bottom-arrow-div'></div>
            </div>
          </div>
          :null}
          {!this.props.threeDensvar && !this.props.fourDensvar && !this.props.threeDvar ?
          <div>
            <div className="row">
              <div className='col s2 m2 l2 arrow-placeholder'></div>
              <div className='col s9 m9 l9 arrow-placeholder'></div>
            </div>
            <div className="row bottom-arrow-spacer">
            </div>
          </div>
          :null}
      </Card>
     </div>
    )
  }
}

export default Summary
