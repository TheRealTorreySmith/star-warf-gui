import React, { Component } from 'react'
import { Button, Modal, Card, Toast, Row } from 'react-materialize'
import './Carousel.css'
import './Slider.css'

class CarouselContainer extends Component {

  nwpFlipClick = () => {
    this.props.nwpFlipFunc()
  }

  wpsFlipClick = () => {
    this.props.wpsFlipFunc()
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

  render() {
    return (
      <div>
      <div className="row carousel-background">

        {/* SPACER */}
        <div className='col s1 m1 l1 arrow-btn-container'>
          <Button className="arrow-button-back waves-effect"><i className="material-icons">arrow_back</i></Button>
        </div>
        <div className='col s10 m10 l10'>

        {/* NWP CAROUSEL CARD */}
        <Card className={`main-card ${this.props.showNwp ? 'animated fadeIn' : 'hide'}`}>
          <div className={`time ${this.props.nwpFlipped ? 'flipper' : ''}`}>
            <div className="side nwp-front">
              <Button id='1' onClick={this.nwpFlipClick} className='flip-btn'><i className="material-icons">rotate_left</i></Button>
              <h4 className="nwp-main-component">NWP</h4>
              <div className="main-container">
                <div className="left-container">
                  <div className="row nwp-main-container">
                    <div className="data-assimilation-options-title">
                      Data Assimilation Options:
                    </div>
                  </div>
                  <div className="row">
                    <Button className={`${this.props.threeDvar ? 'three-dvar-btn-selected' : 'three-dvar-btn'}`} onClick={this.threeDvarSelect}>3DVAR</Button>
                  </div>
                  <Row>
                    <Button className={`${this.props.threeDensvar ? 'three-densvar-btn-selected' : 'three-densvar-btn'}`} onClick={this.threeDensvarSelect}>3DENSVAR</Button>
                  </Row>
                  <Row>
                    <Button className={`${this.props.fourDensvar ? 'four-densvar-btn-selected' : 'four-densvar-btn'}`} onClick={this.props.fourDensvarSelect}>4DENSVAR</Button>
                  </Row>
                </div>
                <div className="range-slider-container">
                  <Row>
                    <div className="col s10 m10 l10 cycling-frequency-options-title">
                      Cycling Frequency:
                    </div>
                    <div className="col s10 m10 l10">
                      <form action="#">
                        <p className="range-field">
                          <input type="range" id="hour-cycling-frequency" min="0" max="24" defaultValue="3"/>
                        </p>
                      </form>
                      <p>Hours:</p>
                    </div>
                    <div className="col s3 m3 l3"></div>
                  </Row>
                </div>
              </div>
            </div>
            <div className="side back">
              <Button onClick={this.nwpFlipClick} className='flip-back-btn'><i className="material-icons">rotate_left</i></Button>
              <h4 className="nwp-main-component">NWP</h4>
            </div>
          </div>
        </Card>

        {/* WPS CAROUSEL CARD */}
          <Card className={`main-card ${this.props.showWps ? 'animated fadeIn' : 'hide'}`}>
            <div className={`time ${this.props.wpsFlipped ? 'flipper' : ''}`}>
              <div className="side">
                <Button id='1' onClick={this.wpsFlipClick} className='flip-btn'><i className="material-icons">rotate_left</i></Button>
                <h4 className="wps-main-component">WPS</h4>
                <Row className="wps-main-container">
                  <div className="domain-main-box">
                    Domain
                  </div>
                  <div className="calendar-main-box">
                    Calendar
                  </div>
                  <div className="time-main-box">
                    Initial/Boundary Conditions
                  </div>
                </Row>
              </div>
              <div className="side back">
                <Button onClick={this.wpsFlipClick} className='flip-back-btn'><i className="material-icons">rotate_left</i></Button>
                <Button className="waves-effect btn play-component-btn align-right"><i className="material-icons">play_arrow</i></Button>
                <Modal
                  header='Physics:'
                  actions={
                    <div>
                      <Toast className="modal-save-btn" toast="Saved successfully!">Save</Toast>
                      <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                    </div>
                  }
                  trigger={<Button className="physics-btn">Physics</Button>}>
                  <div>
                    Subheaders
                  </div>
                </Modal>
            </div>
          </div>
        </Card>

        {/* WRFDA CAROUSEL CARD */}
        <Card className={`main-card ${this.props.showWrfDa ? 'animated fadeIn' : 'hide'}`}>
          <div className={`time ${this.props.wrfDaFlipped ? 'flipper' : ''}`}>
            <div className="side">
              <Button id='1' onClick={this.wrfDaFlipClick} className='flip-btn'><i className="material-icons">rotate_left</i></Button>
              <h4 className="wps-main-component">WRF-DA</h4>
            </div>
            <div className="side back">
              <Button onClick={this.wrfDaFlipClick} className='flip-back-btn'><i className="material-icons">rotate_left</i></Button>
              <Button className="waves-effect btn play-component-btn align-right"><i className="material-icons">play_arrow</i></Button>
              <Modal
                header='Slidebar Header'
                actions={
                  <div>
                    <Toast className="modal-save-btn" toast="Saved successfully!">Save</Toast>
                    <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                  </div>
                }
                trigger={<Button className="edit-btn">Edit</Button>}>
                {/* <SliderComponent/> */}
              </Modal>
            </div>
          </div>
        </Card>

        {/* WRF CAROUSEL CARD */}
        <Card className={`main-card ${this.props.showWrf ? 'animated fadeIn' : 'hide'}`}>
          <div className={`time ${this.props.wrfFlipped ? 'flipper' : ''}`}>
            <div className="side">
              <Button id='1' onClick={this.wrfFlipClick} className='flip-btn'><i className="material-icons">rotate_left</i></Button>
              <h4 className="wps-main-component">WRF</h4>
            </div>
            <div className="side back">
              <Button onClick={this.wrfFlipClick} className='flip-back-btn'><i className="material-icons">rotate_left</i></Button>
              <Button className="waves-effect btn play-component-btn align-right"><i className="material-icons">play_arrow</i></Button>
              <Modal
                header='Slidebar Header'
                actions={
                  <div>
                    <Toast className="modal-save-btn" toast="Saved successfully!">Save</Toast>
                    <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                  </div>
                }
                trigger={<Button className="edit-btn">Edit</Button>}>
                {/* <SliderComponent/> */}
              </Modal>
            </div>
          </div>
        </Card>

        {/* FORWARD/BACK ARROW CONTAINER */}
        </div>
        <div className='col s1 m1 l1 arrow-btn-container'>
          <Button className="arrow-button-forward waves-effect"><i className="material-icons">arrow_forward</i></Button>
        </div>
      </div>

    </div>
    )
  }
}

export default CarouselContainer
