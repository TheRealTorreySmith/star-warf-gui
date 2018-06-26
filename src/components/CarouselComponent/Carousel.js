import React, {Component} from 'react'
import {Button, Modal, Card, Toast, Row} from 'react-materialize'
import Calendar from '../CalendarComponent/CalendarMain'
import Map from '../MainMapComponent/MainMap'
import './Carousel.css'
import './Slider.css'

class CarouselContainer extends Component {

  nwpFlipClick = () => {
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

  wpsFlipClick = () => {
    this.props.wpsFlipFunc()
    let calendar = document.getElementsByClassName('calendar')
    let map = document.getElementsByClassName('main-map')
    if (!this.props.wpsFlipped) {
      setTimeout(function() {
        calendar[0].classList = 'calendar hide'
      }, 500)
      setTimeout(function() {
        map[0].classList = 'main-map hide'
      }, 500)
    } else {
      setTimeout(function() {
        calendar[0].classList = 'calendar'
      }, 500)
      setTimeout(function() {
        map[0].classList = 'main-map'
      }, 500)
     }
  }

  wrfDaFlipClick = () => {
    this.props.wrfDaFlipFunc()
  }

  wrfFlipClick = () => {
    this.props.wrfFlipFunc()
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

  wrfDaShowClick = () => {
    this.props.wrfDaShowClick()
  }

  wrfShowClick = () => {
    this.props.wrfShowClick()
  }

  prevMonth = (date) => {
      this.props.prevMonth(date)
  }

  nextMonth = (date) => {
      this.props.nextMonth(date)
  }

  setRange = (selectionStart, selectionEnd) => {
      this.props.setRange(selectionStart, selectionEnd)
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
                <h4 className="nwp-main-component">NWP</h4>
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
                        <Row>
                          <Button className={`${this.props.fourDensvar
                              ? 'four-densvar-btn-selected'
                              : 'four-densvar-btn'}`} onClick={this.props.fourDensvarSelect}>4DEnsVar</Button>
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
                              <div className="col s8 m8 l8 hours-title">Hours:</div>
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
                <h4 className="nwp-main-component">NWP</h4>
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
                <h4 className="wps-main-component">WPS</h4>
                <Row>
                  <div className="col s1 m1 l1">
                    <Button className="wps-back-arrow" onClick={this.nwpShowClick}>
                      <i className="material-icons">arrow_back</i>
                    </Button>
                  </div>
                  <div className="col s10 m10 l10 wps-main-container">
                    <div className="domain-main-box">
                      {this.props.showWps ? <Map /> : null}
                    </div>
                    <div className="calendar-main-box">
                      <Calendar
                        date={this.props.date}
                        selectionStart = {this.props.selectionStart}
                        selectionEnd = {this.props.selectionEnd}
                        prevMonth={this.prevMonth}
                        nextMonth={this.nextMonth}
                        setRange={this.setRange}
                      />
                    </div>
                    <div className="time-main-box">
                      Initial/Boundary Conditions
                    </div>
                  </div>
                  <div className="col s1 m1 l1">
                    <Button id='1' onClick={this.wpsFlipClick} className='wps-advanced-btn flip-btn'>
                      <i className="material-icons">more_horiz</i>
                    </Button>
                    <Button className={"wps-forward-arrow"} onClick={this.wrfDaShowClick}>
                      <i className="material-icons">arrow_forward</i>
                    </Button>
                  </div>
                </Row>
              </div>
              <div className="side back">
                <h4 className="wps-main-component">WPS</h4>
                <Row>
                  <div className="col s1 m1 l1">
                    <Button className="wps-back-arrow" onClick={this.nwpShowClick}>
                      <i className="material-icons">arrow_back</i>
                    </Button>
                  </div>
                  <div className="col s5 m5 l5">
                    <Modal header='Physics:' actions={<div > <Toast className="modal-save-btn" toast="Saved successfully!">Save</Toast>
                      <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                    </div>} trigger={<Button className = "physics-btn" > Physics</Button>}>
                      <div>
                        Subheaders
                      </div>
                    </Modal>
                  </div>
                  <div className="col s5 m5 l5"></div>
                  <div className="col s1 m1 l1">
                    <Button onClick={this.wpsFlipClick} className='flip-back-btn'>
                      <i className="material-icons">rotate_left</i>
                    </Button>
                    <Button className={"wps-forward-arrow"} onClick={this.wrfDaShowClick}>
                      <i className="material-icons">arrow_forward</i>
                    </Button>
                  </div>
                </Row>
              </div>
            </div>
          </Card>

          {/* WRFDA CAROUSEL CARD */}
          <Card className={`main-card ${this.props.showWrfDa
              ? 'animated fadeIn'
              : 'hide'}`}>
            <div className={`time ${this.props.wrfDaFlipped
                ? 'flipper'
                : ''}`}>
              <div className="side">
                <h4 className="wps-main-component">WRF-DA</h4>
                <Row>
                  <div className="col s1 m1 l1">
                    <Button className="wrfda-back-arrow" onClick={this.wpsShowClick}>
                      <i className="material-icons">arrow_back</i>
                    </Button>
                  </div>
                  <div className="col s10 m10 l10">
                  </div>
                  <div className="col s1 m1 l1">
                    <Button id='1' onClick={this.wrfDaFlipClick} className='flip-btn'>
                      <i className="material-icons">more_horiz</i>
                    </Button>
                    <Button className={"wrfda-forward-arrow"} onClick={this.wrfShowClick}>
                      <i className="material-icons">arrow_forward</i>
                    </Button>
                  </div>
                </Row>
              </div>
              <div className="side back">
                <Button onClick={this.wrfDaFlipClick} className='flip-back-btn'>
                  <i className="material-icons">rotate_left</i>
                </Button>
                <Button className="waves-effect btn play-component-btn align-right">
                  <i className="material-icons">play_arrow</i>
                </Button>
                <Modal header='Slidebar Header' actions={<div > <Toast className="modal-save-btn" toast="Saved successfully!">Save</Toast>
                  <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                </div>} trigger={<Button className = "edit-btn" > Edit</Button>}></Modal>
              </div>
            </div>
          </Card>

          {/* WRF CAROUSEL CARD */}
          <Card className={`main-card ${this.props.showWrf
              ? 'animated fadeIn'
              : 'hide'}`}>
            <div className={`time ${this.props.wrfFlipped
                ? 'flipper'
                : ''}`}>
              <div className="side">
                <h4 className="wps-main-component">WRF</h4>
                <Row>
                  <div className="col s1 m1 l1">
                    <Button className="wrfda-back-arrow" onClick={this.wrfDaShowClick}>
                      <i className="material-icons">arrow_back</i>
                    </Button>
                  </div>
                  <div className="col s10 m10 l10"></div>
                  <div className="col s1 m1 l1">
                    <Button id='1' onClick={this.wrfFlipClick} className='flip-btn'>
                      <i className="material-icons">more_horiz</i>
                    </Button>
                  </div>
                </Row>
              </div>
              <div className="side back">
                <h4 className="wps-main-component">WRF</h4>
                <Row>
                  <div className="col s1 m1 l1">
                    <Button className="wrfda-back-arrow" onClick={this.wrfDaShowClick}>
                      <i className="material-icons">arrow_back</i>
                    </Button>
                  </div>
                  <div className="col s10 m10 l10">
                  </div>
                  <div className="col s1 m1 l1">
                    <Button onClick={this.wrfFlipClick} className='flip-back-btn'>
                      <i className="material-icons">rotate_left</i>
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
