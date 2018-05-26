import React, { Component } from 'react'
import { Button, Carousel, Modal } from 'react-materialize'
import './Carousel.css'

class CarouselContainer extends Component {
  render() {
    return (
      <div className={`row ${this.props.jobType ? 'none' : 'hide'}`}>
        <div className='col s1 m1 l1'>
        </div>
        <div className='col s10 m10 l10'>
          <Carousel>
            <div id='1' className='red center-align'>
              <h2>First Panel</h2>
              <Modal
                header='Modal Header'
                actions={
                  <div>
                    <Button className="modal-save-btn">Save</Button>
                    <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                  </div>
                }
                trigger={<Button>Edit</Button>}>
              </Modal>
            </div>
            <div id='2' className='amber center-align'>
              <h2>Second Panel</h2>
              <Modal
                header='Modal Header'
                actions={
                  <div>
                    <Button className="modal-save-btn">Save</Button>
                    <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                  </div>
                }
                trigger={<Button>Edit</Button>}>
              </Modal>
            </div>
            <div id='3' className='green center-align'>
              <h2>Third Panel</h2>
              <Modal
                header='Modal Header'
                actions={
                  <div>
                    <Button className="modal-save-btn">Save</Button>
                    <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                  </div>
                }
                trigger={<Button>Edit</Button>}>
              </Modal>
            </div>
            <div id='4' className='blue center-align'>
              <h2>Fourth Panel</h2>
              <Modal
                header='Modal Header'
                actions={
                  <div>
                    <Button className="modal-save-btn">Save</Button>
                    <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                  </div>
                }
                trigger={<Button>Edit</Button>}>
              </Modal>
            </div>
            <div id='5' className='purple center-align'>
              <h2>Fifth Panel</h2>
              <Modal
                header='Modal Header'
                actions={
                  <div>
                    <Button className="modal-save-btn">Save</Button>
                    <Button modal="close" className="modal-save-btn red darken-2">Close</Button>
                  </div>
                }
                trigger={<Button>Edit</Button>}>
              </Modal>
            </div>
          </Carousel>
        </div>
        <div className='col s1 m1 l1'>
        </div>
      </div>
    )
  }
}

export default CarouselContainer
