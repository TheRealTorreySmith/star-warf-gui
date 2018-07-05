import React, { Component } from 'react'
import CarouselContainer from '../CarouselComponent/Carousel.js'
import Summary from '../SummaryComponent/Summary.js'
import NavBar from '../NavBarComponent/NavBar'
import MapModal from '../MapModalComponent/MapModal.js'
import './Dashboard.css'

class Dashboard extends Component {

  prevMonth = (date) => {
      this.props.prevMonth(date)
  }

  nextMonth = (date) => {
      this.props.nextMonth(date)
  }

  setRange = (selectionStart, selectionEnd) => {
      this.props.setRange(selectionStart, selectionEnd)
  }

  drawCoords = (coords) => {
    this.props.drawCoords(coords)
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
          nwpFlipFunc={this.props.nwpFlipFunc}
          wpsFlipFunc={this.props.wpsFlipFunc}
          wrfFlipFunc={this.props.wrfFlipFunc}
          wrfDaFlipFunc={this.props.wrfDaFlipFunc}
          showNwp={this.props.showNwp}
          showWps={this.props.showWps}
          showWrf={this.props.showWrf}
          showWrfDa={this.props.showWrfDa}
          nwpShowClick={this.props.nwpShowClick}
          wpsShowClick={this.props.wpsShowClick}
          wrfShowClick={this.props.wrfShowClick}
          wrfDaShowClick={this.props.wrfDaShowClick}
          threeDvar={this.props.threeDvar}
          threeDensvar={this.props.threeDensvar}
          fourDensvar={this.props.fourDensvar}
          threeDvarSelect={this.props.threeDvarSelect}
          threeDensvarSelect={this.props.threeDensvarSelect}
          fourDensvarSelect={this.props.fourDensvarSelect}
          hourFrequencyOnChange={this.props.hourFrequencyOnChange}
          hourFrequency={this.props.hourFrequency}
          yearFrequencyOnChange={this.props.yearFrequencyOnChange}
          yearFrequency={this.props.yearFrequency}
          dayFrequencyOnChange={this.props.dayFrequencyOnChange}
          dayFrequency={this.props.dayFrequency}
          minuteFrequencyOnChange={this.props.minuteFrequencyOnChange}
          minuteFrequency={this.props.minuteFrequency}
          secondFrequencyOnChange={this.props.secondFrequencyOnChange}
          secondFrequency={this.props.secondFrequency}
          continueToWps={this.props.continueToWps}
          continueToWpsOnChange={this.props.continueToWpsOnChange}
          date={this.props.date}
          selectionStart={this.props.selectionStart}
          selectionEnd={this.props.selectionEnd}
          prevMonth={this.prevMonth}
          nextMonth={this.nextMonth}
          setRange={this.setRange}
          lat={this.props.lat}
          lng={this.props.lng}
          zoom={this.props.zoom}
          mapModal={this.props.mapModal}
          gfsSelect={this.props.gfsSelect}
          gfs={this.props.gfs}
          hrrrSelect={this.props.hrrrSelect}
          hrrr={this.props.hrrr}
          namSelect={this.props.namSelect}
          nam={this.props.nam}
        />
        <Summary
          nwpShowClick={this.props.nwpShowClick}
          wpsShowClick={this.props.wpsShowClick}
          wrfShowClick={this.props.wrfShowClick}
          wrfDaShowClick={this.props.wrfDaShowClick}
          showNwp={this.props.showNwp}
          showWps={this.props.showWps}
          showWrf={this.props.showWrf}
          showWrfDa={this.props.showWrfDa}
          runMainJob={this.props.runMainJob}
          setMainJob={this.props.setMainJob}
          threeDvar={this.props.threeDvar}
          threeDensvar={this.props.threeDensvar}
          fourDensvar={this.props.fourDensvar}
          hourFrequency={this.props.hourFrequency}
          date={this.props.date}
          selectionStart={this.props.selectionStart}
          selectionEnd={this.props.selectionEnd}
          gfs={this.props.gfs}
          hrrr={this.props.hrrr}
          nam={this.props.nam}
          mapSaved={this.props.mapSaved}
          wpsTypeSaved={this.props.wpsTypeSaved}
          selectionStart={this.props.selectionStart}
          selectionEnd={this.props.selectionEnd}
        />
        {this.props.showMapModal ?
          <MapModal
            mapModal={this.props.mapModal}
            showMapModal={this.props.showMapModal}
            drawCoords={this.props.drawCoords}
            getCoords={this.props.getCoords}
            saveMap={this.props.saveMap}
          />
        :null}
     </div>
    )
  }
}

export default Dashboard
