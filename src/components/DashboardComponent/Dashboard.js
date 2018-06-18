import React, { Component } from 'react'
import CarouselContainer from '../CarouselComponent/Carousel.js'
import Summary from '../SummaryComponent/Summary.js'
import NavBar from '../NavBarComponent/NavBar'
import './Dashboard.css'

class Dashboard extends Component {

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
          nwpFlipFunc={this.props.nwpFlipFunc}
          wpsFlipFunc={this.props.wpsFlipFunc}
          wrfFlipFunc={this.props.wrfFlipFunc}
          wrfDaFlipFunc={this.props.wrfDaFlipFunc}
          showNwp={this.props.showNwp}
          showWps={this.props.showWps}
          showWrf={this.props.showWrf}
          showWrfDa={this.props.showWrfDa}
          threeDvar={this.props.threeDvar}
          threeDensvar={this.props.threeDensvar}
          fourDensvar={this.props.fourDensvar}
          threeDvarSelect={this.props.threeDvarSelect}
          threeDensvarSelect={this.props.threeDensvarSelect}
          fourDensvarSelect={this.props.fourDensvarSelect}
        />
        <Summary
          nwpShowClick={this.props.nwpShowClick}
          wpsShowClick={this.props.wpsShowClick}
          wrfShowClick={this.props.wrfShowClick}
          wrfDaShowClick={this.props.wrfDaShowClick}
          runMainJob={this.props.runMainJob}
          setMainJob={this.props.setMainJob}
          threeDvar={this.props.threeDvar}
          threeDensvar={this.props.threeDensvar}
          fourDensvar={this.props.fourDensvar}
        />
     </div>
    )
  }
}

export default Dashboard
