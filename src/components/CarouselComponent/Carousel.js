import React, {Component} from 'react'
import {Button, Card, Row} from 'react-materialize'
import Calendar from '../CalendarComponent/CalendarMain'
import Map from '../MainMapComponent/MainMap'
import globeBackground from './wrf-gfs-darkblue-wordless.png'
import globeImage from './globe.png'
import './Carousel.css'
import './Slider.css'

class CarouselContainer extends Component {

  nwpFlipClick = () => {
    if (this.props.threeDvar || this.props.threeDensvar || this.props.fourDensvar) {
      this.props.nwpFlipFunc()
      let slider = document.getElementById('nwp-hour-range-slider')
      if (!this.props.nwpFlipped) {
        setTimeout(function() {
          slider.classList = 'hide'
        }, 500)
      } else {
        setTimeout(function() {
          slider.classList = 'range-field'
        }, 500)
      }
    }
  }

  wpsFlipClick = () => {
    this.props.wpsFlipFunc()
    let calendar = document.getElementsByClassName('calendar')
    let map = document.getElementsByClassName('leaflet-container')
    let globes = document.getElementsByClassName('time-main-box')
    if (!this.props.wpsFlipped) {
      setTimeout(function() {
        calendar[0].classList = 'calendar hide'
        globes[0].classList = 'time-main-box hide'
        map[0].classList = 'domain-main-box leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom hide'
      }, 500)
    } else {
      setTimeout(function() {
        calendar[0].classList = 'calendar'
        globes[0].classList = 'time-main-box'
        map[0].classList = 'domain-main-box leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom'
      }, 500)
     }
  }

  daFlipClick = () => {
    this.props.daFlipFunc()
    let gsiImage = document.getElementsByClassName('gsi-container')
    let wrfdaImage = document.getElementsByClassName('wrfda-container')
    if (!this.props.daFlipped) {
      setTimeout(function() {
        gsiImage[0].classList = 'gsi-container hide'
        wrfdaImage[0].classList = 'wrfda-container hide'
      }, 500)
    } else {
      if(this.props.gsi) {
        setTimeout(function() {
          gsiImage[0].classList = 'gsi-container wrfda-gsi-container-selected'
        }, 500)
      } else {
        setTimeout(function() {
          gsiImage[0].classList = 'gsi-container'
        }, 500)
      }
      if (this.props.wrfda) {
        setTimeout(function() {
          wrfdaImage[0].classList = 'wrfda-container wrfda-gsi-container-selected'
        }, 500)
      } else {
        setTimeout(function() {
          wrfdaImage[0].classList = 'wrfda-container'
        }, 500)
      }
    }
  }

  boundaryConditionsFlipClick = () => {
    this.props.boundaryConditionsFlipFunc()
    let gfsGlobe = document.getElementsByClassName('gfs-container')
    let hrrrGlobe = document.getElementsByClassName('hrrr-container')
    let namGlobe = document.getElementsByClassName('nam-container')
    if (!this.props.boundaryConditionsFlipped) {
      setTimeout(function() {
        gfsGlobe[0].classList = 'gfs-container hide'
        hrrrGlobe[0].classList = 'hrrr-container hide'
        namGlobe[0].classList = 'nam-container hide'
      }, 500)
    } else {
      setTimeout(function() {
        gfsGlobe[0].classList = 'gfs-container'
        hrrrGlobe[0].classList = 'hrrr-container'
        namGlobe[0].classList = 'nam-container'
      }, 500)
     }
  }

  threeDvarSelect = () => {
    this.props.threeDvarSelect()
  }

  threeDensvarSelect = () => {
    this.props.threeDensvarSelect()
  }

  fourDvarSelect = () => {
    this.props.fourDvarSelect()
  }

  coldStartWrfSelect = () => {
    this.props.coldStartWrfSelect()
  }

  hourFrequencyOnChange = (e) => {
    let value = e.currentTarget.value
    this.props.hourFrequencyOnChange(value)
  }

  dayFrequencyOnChange = (e) => {
    let value = e.currentTarget.value
    this.props.dayFrequencyOnChange(value)
  }

  yearFrequencyOnChange = (e) => {
    let value = e.currentTarget.value
    this.props.yearFrequencyOnChange(value)
  }

  minuteFrequencyOnChange = (e) => {
    let value = e.currentTarget.value
    this.props.minuteFrequencyOnChange(value)
  }

  secondFrequencyOnChange = (e) => {
    let value = e.currentTarget.value
    this.props.secondFrequencyOnChange(value)
  }

  wpsShowClick = () => {
    if (this.props.threeDvar || this.props.threeDensvar || this.props.fourDensvar) {
      this.props.wpsShowClick()
    }
  }

  nwpShowClick = () => {
    this.props.nwpShowClick()
  }

  daShowClick = () => {
    this.props.daShowClick()
  }

  prevMonth = (date) => {
      this.props.prevMonth(date)
  }

  nextMonth = (date) => {
      this.props.nextMonth(date)
  }

  prevYear = (date) => {
      this.props.prevYear(date)
  }

  nextYear = (date) => {
      this.props.nextYear(date)
  }

  setRange = (selectionStart, selectionEnd) => {
      this.props.setRange(selectionStart, selectionEnd)
  }

  gfsSelect = () => {
    this.props.gfsSelect()
  }

  hrrrSelect = () => {
    this.props.hrrrSelect()
  }

  namSelect = () => {
    this.props.namSelect()
  }

  gsiSelect = () => {
    this.props.gsiSelect()
  }

  wrfdaSelect = () => {
    this.props.wrfdaSelect()
  }

  wrfShowClick = () => {
    this.props.wrfShowClick()
  }

  render() {
    return (<div>
      <div className="row carousel-background">

        {/* SPACER */}
        <div className='col s1 m1 l1 arrow-btn-container'></div>
        <div className='col s10 m10 l10'>

          {/* NWP CAROUSEL CARD */}
          <Card className={`main-card ${this.props.showNwp
              ? 'animated fadeIn'
              : 'hide'}`}>
            <div className={`time ${this.props.nwpFlipped
                ? 'flipper'
                : ''}`}>
              <div className="side nwp-front">
                <h4 className={`${this.props.threeDvar || this.props.threeDensvar || this.props.fourDensvar ? 'nwp-main-component-white' : 'nwp-main-component'}`}>NWP</h4>
                <Row>
                  <div className="col s11 m11 l11">
                    <Row>
                      <div className="col s6 m6 l6">
                        <div className="row nwp-main-container">
                          <div className="data-assimilation-options-title">
                            Data Assimilation Options:
                          </div>
                        </div>
                        <div className="row three-dvar-btn-container">
                          <Button className={`${this.props.threeDvar
                              ? 'three-dvar-btn-selected'
                              : 'three-dvar-btn'}`} onClick={this.threeDvarSelect}>3DVar</Button>
                        </div>
                        <Row className="row three-densvar-btn-container">
                          <Button className={`${this.props.threeDensvar
                              ? 'three-densvar-btn-selected'
                              : 'three-densvar-btn'}`} onClick={this.threeDensvarSelect}>3DEnsVar</Button>
                        </Row>
                        <Row  className="row four-densvar-btn-container">
                          <Button className={`${this.props.fourDensvar
                              ? 'four-densvar-btn-selected'
                              : 'four-densvar-btn'}`} onClick={this.props.fourDensvarSelect}>4DEnsVar</Button>
                        </Row>
                        <Row>
                          <Button className={`${this.props.coldStartWrf
                              ? 'cold-start-wrf-btn-selected'
                              : 'cold-start-wrf-btn'}`} onClick={this.props.coldStartWrfSelect}>Cold-Start Wrf</Button>
                        </Row>
                      </div>
                      <div className="col s6 m6 l6">
                        <Row>
                          <div className="col s12 m12 l12 cycling-frequency-options-title">
                            Cycling Frequency:
                          </div>
                          <div className="col s12 m12 l12">
                            <div id="nwp-hour-range-slider" className="range-field">
                              <input type="range" id="hour-cycling-frequency" min="0" max="24" onChange={this.hourFrequencyOnChange} onInput={this.hourFrequencyOnChange} value={this.props.hourFrequency}/>
                            </div>
                            <div className="show-hours-container">
                              <div className="col s8 m8 l8 hours-title">Hours =</div>
                              <div className="col s4 m4 l4 hours-number">{this.props.hourFrequency}</div>
                            </div>
                          </div>
                        </Row>
                      </div>
                    </Row>
                  </div>
                  <div className="col s1 m1 l1">
                    <Button id='1' className={!this.props.threeDvar && !this.props.threeDensvar && !this.props.fourDensvar
                        ? "nwp-advanced-btn-disabled"
                        : "nwp-advanced-btn-enabled"} onClick={this.nwpFlipClick}>
                      <i className="material-icons">more_horiz</i>
                    </Button>
                    <Button className={!this.props.threeDvar && !this.props.threeDensvar && !this.props.fourDensvar
                        ? "nwp-next-btn-disabled"
                        : "nwp-next-btn-enabled"} onClick={this.wpsShowClick}>
                      <i className="material-icons">arrow_forward</i>
                    </Button>
                  </div>
                </Row>
              </div>
              <div className="side back">
                <h4 className={`${this.props.threeDvar || this.props.threeDensvar || this.props.fourDensvar ? 'nwp-main-component-white' : 'nwp-main-component'}`}>NWP</h4>
                <Row>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10">
                    <Row>
                      <div className="col s6 m6 l6">
                        <div>Days Frequency:  {this.props.dayFrequency}</div>
                        <div id="nwp-day-range-slider" className="range-field">
                          <input type="range" id="day-cycling-frequency" min="0" max="356" onChange={this.dayFrequencyOnChange} onInput={this.dayFrequencyOnChange} value={this.props.dayFrequency}/>
                        </div>
                        <div>Years Frequency:  {this.props.yearFrequency}</div>
                        <div id="nwp-year-range-slider" className="range-field">
                          <input type="range" id="year-cycling-frequency" min="0" max="100" onChange={this.yearFrequencyOnChange} onInput={this.yearFrequencyOnChange} value={this.props.yearFrequency}/>
                        </div>
                      </div>
                      <div className="col s6 m6 l6">
                        <div>Minutes Frequency:  {this.props.minuteFrequency}</div>
                        <div id="nwp-minute-range-slider" className="range-field">
                          <input type="range" id="minute-cycling-frequency" min="0" max="60" onChange={this.minuteFrequencyOnChange} onInput={this.minuteFrequencyOnChange} value={this.props.minuteFrequency}/>
                        </div>
                        <div>Seconds Frequency:  {this.props.secondFrequency}</div>
                        <div id="nwp-second-range-slider" className="range-field">
                          <input type="range" id="second-cycling-frequency" min="0" max="60" onChange={this.secondFrequencyOnChange} onInput={this.secondFrequencyOnChange} value={this.props.secondFrequency}/>
                        </div>
                      </div>
                    </Row>
                  </div>
                  <div className="col s1 m1 l1">
                    <Button onClick={this.nwpFlipClick} className='flip-back-btn'>
                      <i className="material-icons">rotate_left</i>
                    </Button>
                    <Button className={!this.props.threeDvar && !this.props.threeDensvar && !this.props.fourDensvar
                        ? "nwp-next-btn-disabled"
                        : "nwp-next-btn-enabled"} onClick={this.wpsShowClick}>
                      <i className="material-icons">arrow_forward</i>
                    </Button>
                  </div>
                </Row>
              </div>
            </div>
          </Card>

          {/* WPS CAROUSEL CARD */}
          <Card className={`main-card ${this.props.showWps
              ? 'animated fadeIn'
              : 'hide'}`}>
            <div className={`time ${this.props.wpsFlipped
                ? 'flipper'
                : ''}`}>
              <div className="side">
                <h4 className={`${this.props.wpsTypeSaved && this.props.selectionStart && this.props.selectionEnd && this.props.mapSaved ? 'wps-main-component-white' : 'wps-main-component'}`}>WPS</h4>
                <Row>
                  <div className="col s1 m1 l1">
                    <Button className="wps-back-arrow" onClick={this.nwpShowClick}>
                      <i className="material-icons">arrow_back</i>
                    </Button>
                  </div>
                  <div className="col s10 m10 l10 wps-main-container">
                    {this.props.showWps ?
                      <div id="map" className="domain-main-box">
                        <Map
                          lat={this.props.lat}
                          lng={this.props.lng}
                          zoom={this.props.zoom}
                          mapModal={this.props.mapModal}
                          saveMap={this.props.saveMap}
                        />
                      </div>
                    : null}
                    <div className="calendar-main-box">
                      <Calendar
                        date={this.props.date}
                        selectionStart = {this.props.selectionStart}
                        selectionEnd = {this.props.selectionEnd}
                        prevMonth={this.prevMonth}
                        nextMonth={this.nextMonth}
                        prevYear={this.prevYear}
                        nextYear={this.nextYear}
                        setRange={this.setRange}
                        hourSelected={this.props.hourSelected}
                        hoursChange={this.props.hoursChange}
                        hourTranslation={this.props.hourTranslation}
                        hourTranslationChange={this.props.hourTranslationChange}
                      />
                    </div>
                    <div className="time-main-box">
                      <div className={`time time-main-box ${this.props.boundaryConditionsFlipped
                          ? 'flipper'
                          : ''}`}>
                        <div className="side box">
                          <div className="time-main-box-flip-row">
                            <Button className="time-main-box-flip-btn" onClick={this.boundaryConditionsFlipClick}>
                              <i className="material-icons boundary-conditions-flip">rotate_left</i>
                            </Button>
                          </div>
                          <div className="time-main-box-title-row">
                            Initial Boundary Conditions
                          </div>
                          <div className={`gfs-row row ${this.props.gfs ? 'gfs-row-selected' : ''}`} onClick={this.gfsSelect}>
                            <div className={`gfs-container ${this.props.gfs ? 'gfs-container-selected' : ''}`}>
                              <img className="gfs" src={globeBackground} height="52" width="52" alt="blue globe background logo"></img>
                              <div className="gfs-acronym-lettering">GFS</div>
                            </div>
                            <div className="gfs-title-container">Global Forecast System</div>
                            <div className="gfs-text-container">GFS details placeholder text</div>
                          </div>
                          <div className={`hrrr-row row ${this.props.hrrr ? 'hrrr-row-selected' : ''}`} onClick={this.hrrrSelect}>
                            <div className={`hrrr-container ${this.props.hrrr ? 'hrrr-container-selected' : ''}`}>
                              <img className="hrrr" src={globeBackground} height="52" width="52" alt="blue globe background logo"></img>
                              <div className="hrrr-acronym-lettering">HRRR</div>
                            </div>
                            <div className="hrrr-title-container">High-Resolution Rapid Refresh</div>
                            <div className="hrrr-text-container">HRRR details placeholder text
                            </div>
                          </div>
                          <div className={`nam-row row ${this.props.nam ? 'nam-row-selected' : ''}`} onClick={this.namSelect}>
                            <div className={`nam-container ${this.props.nam ? 'nam-container-selected' : ''}`}>
                              <img className="nam" src={globeBackground} height="52" width="52" alt="blue globe background logo"></img>
                              <div className="nam-acronym-lettering">NAM</div>
                            </div>
                            <div className="nam-title-container">North American Mesoscale Model</div>
                            <div className="nam-text-container">NAM details placeholder text
                            </div>
                          </div>
                        </div>
                        <div className="side back box">
                          <div className="time-main-box-flip-row">
                            <Button className="time-main-box-flip-btn" onClick={this.boundaryConditionsFlipClick}>
                              <i className="material-icons boundary-conditions-flip">rotate_left</i>
                            </Button>
                          </div>
                          <div className="auxiliary-boundary-conditions-title-row">
                            Auxiliary Boundary Conditions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col s1 m1 l1">
                    <Button id='1' onClick={this.wpsFlipClick} className='wps-advanced-btn flip-btn'>
                      <i className="material-icons">more_horiz</i>
                    </Button>
                    <Button className={"wps-forward-arrow"} onClick={this.daShowClick}>
                      <i className="material-icons">arrow_forward</i>
                    </Button>
                  </div>
                </Row>
              </div>
              <div className="side back">
                <h4 className={`${this.props.wpsTypeSaved && this.props.selectionStart && this.props.selectionEnd && this.props.mapSaved ? 'wps-main-component-white' : 'wps-main-component'}`}>WPS</h4>
                <Row>
                  <div className="col s1 m1 l1">
                    <Button className="wps-back-arrow" onClick={this.nwpShowClick}>
                      <i className="material-icons">arrow_back</i>
                    </Button>
                  </div>
                  <div className="col s5 m5 l5">
                  </div>
                  <div className="col s5 m5 l5"></div>
                  <div className="col s1 m1 l1">
                    <Button onClick={this.wpsFlipClick} className='flip-back-btn'>
                      <i className="material-icons">rotate_left</i>
                    </Button>
                    <Button className={"wps-forward-arrow"} onClick={this.daShowClick}>
                      <i className="material-icons">arrow_forward</i>
                    </Button>
                  </div>
                </Row>
              </div>
            </div>
          </Card>

          {/* DA CAROUSEL CARD */}
          <Card className={`main-card ${this.props.showDa
              ? 'animated fadeIn'
              : 'hide'}`}>
            <div className={`time ${this.props.daFlipped
                ? 'flipper'
                : ''}`}>
              <div className="side">
                <h4 className={this.props.gsi || this.props.wrfda ? 'da-main-component-white' : 'da-main-component'}>
                  {this.props.gsi ? 'GSI': null}
                  {this.props.wrfda ? 'WRFDA': null}
                  {!this.props.wrfda && !this.props.gsi ? 'Data Assimilation': null}</h4>
                <Row>
                  <div className="col s1 m1 l1">
                    <Button className="da-back-arrow" onClick={this.wpsShowClick}>
                      <i className="material-icons">arrow_back</i>
                    </Button>
                  </div>
                  <div className="col s10 m10 l10 da-container-front">
                    <div className={`wrfda-container ${this.props.wrfda ? 'wrfda-gsi-container-selected': ''}`} onClick={this.wrfdaSelect}>
                      <div className="da-image-container">
                        <img className="wrfda-image" src={globeImage} alt="WRF logo"></img>
                        <div className="wrfda-text">WRFDA</div>
                      </div>
                      <div className="NCAR-title">National Centers for Atmospheric Research</div>
                    </div>
                    <div className={`gsi-container ${this.props.gsi ? 'wrfda-gsi-container-selected': ''}`} onClick={this.gsiSelect}>
                      <div className="row">
                        <div className="da-image-container">
                          <img className="ncep-image" src={globeImage} alt="National Centers for Environmental Prediction logo"></img>
                          <div className="ncep-text">NCEP</div>
                        </div>
                        <div className="NCEP-title">National Centers for Environmental Prediction</div>
                      </div>
                    </div>
                  </div>
                  <div className="col s1 m1 l1">
                    <Button id='1' onClick={this.daFlipClick} className='flip-btn'>
                      <i className="material-icons">more_horiz</i>
                    </Button>
                    <Button className={"da-forward-arrow"} onClick={this.wrfShowClick}>
                      <i className="material-icons">arrow_forward</i>
                    </Button>
                  </div>
                </Row>
              </div>
              <div className="side back">
                <h4 className={this.props.gsi || this.props.wrfda ? 'da-main-component-white' : 'da-main-component'}>
                {this.props.gsi ? 'GSI': null}
                {this.props.wrfda ? 'WRFDA': null}
                {!this.props.wrfda && !this.props.gsi ? 'DA': null}</h4>
                <Row>
                  <div className="col s1 m1 l1">
                    <Button className="da-back-arrow" onClick={this.wpsShowClick}>
                      <i className="material-icons">arrow_back</i>
                    </Button>
                  </div>
                  <div className="col s10 m10 l10 da-back-container">
                    <Card className="da-observations-container">
                      <p className="observations-title">Observations:</p>
                    </Card>
                    <Card className="da-background-error-covariance-container">
                      <p className="background-error-covariance-title">Background Error Covariance:</p>
                    </Card>
                  </div>
                  <div className="col s1 m1 l1">
                    <Button onClick={this.daFlipClick} className='flip-back-btn'>
                      <i className="material-icons">rotate_left</i>
                    </Button>
                    <Button className={"da-forward-arrow"} onClick={this.wrfShowClick}>
                      <i className="material-icons">arrow_forward</i>
                    </Button>
                  </div>
                </Row>
              </div>
            </div>
          </Card>

          {/* FORWARD/BACK ARROW CONTAINER */}
        </div>
        <div className='col s1 m1 l1 arrow-btn-container'></div>
      </div>
    </div>)
  }
}

export default CarouselContainer
