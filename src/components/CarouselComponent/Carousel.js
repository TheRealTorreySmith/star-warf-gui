import React, { Component } from 'react'
import { Button, Modal, Card, Toast, Row, Icon } from 'react-materialize'
import './Carousel.css'
import SliderComponent from '../SliderComponent/Slider'

class CarouselContainer extends Component {

  nwpFlipClick = () => {
    this.props.nwpFlipFunc()
  }

  wpsFlipClick = () => {
    this.props.wpsFlipFunc()
  }

  // wrfFlipClick = () => {
  //   this.props.wrfFlipFunc()
  // }

  // wrfDaFlipClick = () => {
  //   this.props.wrfDaFlipFunc()
  // }

  
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
            <div className="side">
              <Button id='1' onClick={this.nwpFlipClick} className='flip-btn'><i className="material-icons">rotate_left</i></Button>
              <h4 className="wps-main-component">NWP</h4>
            </div>
            <div className="side back">
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
              <SliderComponent/>
            </Modal>
            <Button onClick={this.nwpFlipClick} className='flip-back-btn'>Flip</Button>
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
                <SliderComponent/>
              </Modal>
              <Button onClick={this.wpsFlipClick} className='flip-back-btn'>Flip</Button>
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
