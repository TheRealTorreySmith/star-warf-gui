import React, { Component } from 'react'
import CarouselContainer from '../CarouselComponent/Carousel.js'
import Summary from '../SummaryComponent/Summary.js'
import NavBar from '../NavBarComponent/NavBar'
import './Dashboard.css'

class Dashboard extends Component {

  nwpFlipFunc = () => {
    this.props.nwpFlipFunc()
  }

  wpsFlipFunc = () => {
    this.props.wpsFlipFunc()
  }

  // wrfFlipFunc = () => {
  //   this.props.wrfFlipFunc()
  // }

  // wrfDaFlipFunc = () => {
  //   this.props.wrfDaFlipFunc()
  // }

  // searchModal = () => {
  //   console.log('searchModal')
  // }

  wpsShowClick = () => {
    this.props.wpsShowClick()
  }

  setMainJob = () => {
    this.props.setMainJob()
  }

  render() {
    return (
      <div>
        <NavBar
          currentJobName={this.props.currentJobName}
        />
        <CarouselContainer
          nwpFlipped={this.props.nwpFlipped}
          wpsFlipped={this.props.wpsFlipped}
          wrfFlipped={this.props.wrfFlipped}
          wrfDaFlipped={this.props.wrfDaFlipped}
          nwpFlipFunc={this.nwpFlipFunc}
          wpsFlipFunc={this.wpsFlipFunc}
          wrfFlipFunc={this.wrfFlipFunc}
          wrfDaFlipFunc={this.wrfDaFlipFunc}
          showNwp={this.props.showNwp}
          showWps={this.props.showWps}
        />
        <Summary
          wpsShowClick={this.props.wpsShowClick}
          runMainJob={this.props.runMainJob}
          setMainJob={this.props.setMainJob}
        />
     </div>
    )
  }
}

export default Dashboard
