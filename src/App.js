import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Header from './components/HeaderComponent/Header.js'
import Login from './components/LoginComponent/Login.js'
import JobType from './components/JobTypeComponent/JobType.js'
import JobTypeNewExisting from './components/JobTypeNewExistingComponent/JobTypeNewExisting.js'
import Dashboard from './components/DashboardComponent/Dashboard.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobType: '',
      currentJobName: undefined,
      currentUser: undefined,
      isLoggedIn: true,
      jobs: [],
      nwpFlipped: false,
      wpsFlipped: false,
      boundaryConditionsFlipped: false,
      wrfFlipped: false,
      daFlipped: false,
      showNwp: true,
      showWps: false,
      showWrf: false,
      showDa: false,
      threeDvar: false,
      threeDensvar: false,
      fourDensvar: false,
      runMainJob: false,
      hourFrequency: 3,
      yearFrequency: 0,
      dayFrequency: 0,
      minuteFrequency: 0,
      secondFrequency: 0,
      continueToWps: false,
      date:Date.now(),
      selectionStart: 0,
      selectionEnd: 0,
      lat: 20.9635945,
      lng: -105.14556859999999,
      zoom: 0,
      showMapModal: false,
      coords: [],
      latCoords: [],
      lngCoords: [],
      gfsSelect: false,
      hrrrSelect: false,
      namSelect: false,
      mapSaved: false,
      wpsTypeSaved: false,
      gsi: false,
      wrfda: false,
      mapColors: ['black','red', 'green', 'purple', 'orange', 'blue', 'cyanne', 'turqoise', 'grey', 'pink', 'yellow'],
      northWest: {},
      northEast: {},
      southEast: {},
      southWest: {}
    }
  }

  setCurrentUser = (username, password) => {
    this.setState({
      currentUser: username
    })
  }

  jobTypeSelect = (jobType) => {
    this.setState({
      jobType: jobType
    })
  }

  // BACK BUTTON STATE HANDLER
  backButton = () => {
    this.state.cyclingNwpStandard ||
    this.state.cyclingNwpEnsemble ?
    this.setState({
      cyclingNwpStandard: false,
      cyclingNwpEnsemble: false
    }) :
    this.setState({
      jobType: '',
      jobs: []
    })
  }

  // NEW JOB NAME STATE HANDLER
  newJobName = (newJobName) => {
    document.title = newJobName
    this.setState({
      ...this.state,
      jobs: [
      ...this.state.jobs,
      {
        key: this.state.jobs.length,
        name: newJobName,
        jobType: this.state.jobType
      }],
      currentJobName: newJobName
    })
  }

  // FLIPS NWP CAROUSEL CARD
  nwpFlipFunc = () => {
    let flipStatus = this.state.nwpFlipped ? false : true
    this.setState({
      nwpFlipped: flipStatus
    })
  }

  // FLIPS WPS CAROUSEL CARD
  wpsFlipFunc = () => {
    let flipStatus = this.state.wpsFlipped ? false : true
    this.setState({
      wpsFlipped: flipStatus
    })
  }

  boundaryConditionsFlipFunc = () => {
    let flipStatus = this.state.boundaryConditionsFlipped ? false : true
    this.setState({
      boundaryConditionsFlipped: flipStatus
    })
  }

  // FLIPS WRF CAROUSEL CARD
  wrfFlipFunc = () => {
    let flipStatus = this.state.wrfFlipped ? false : true
    this.setState({
      wrfFlipped: flipStatus
    })
  }

  // FLIPS DA CAROUSEL CARD
  daFlipFunc = () => {
    let flipStatus = this.state.daFlipped ? false : true
    this.setState({
      daFlipped: flipStatus
    })
  }

  // SWITCHES TO NWP CAROUSEL CARD
  nwpShowClick = () => {
    this.setState({
      showNwp: true,
      showWps: false,
      showWrf: false,
      showDa: false,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      daFlipped: false
    })
  }

  // SWITCHES TO WPS CAROUSEL CARD
  wpsShowClick = () => {
    this.setState({
      showNwp: false,
      showWps: true,
      showWrf: false,
      showDa: false,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      daFlipped: false
    })
  }

  // SWITCHES TO WRF CAROUSEL CARD
  wrfShowClick = () => {
    this.setState({
      showNwp: false,
      showWps: false,
      showWrf: true,
      showDa: false,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      daFlipped: false
    })
  }

  // SWITCHES TO DA CAROUSEL CARD
  daShowClick = () => {
    this.setState({
      showNwp: false,
      showWps: false,
      showWrf: false,
      showDa: true,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      daFlipped: false
    })
  }

  setMainJob = () => {
    this.state.runMainJob ?
    this.setState({
      runMainJob: false
    }) :
    this.setState({
      runMainJob: true
    })
  }

  // SETS 3DVAR AS SELECTED IN STATE
  threeDvarSelect = () => {
    this.state.threeDvar ?
    this.setState({
      threeDvar: false
    }) :
    this.setState({
      threeDvar: true,
      fourDensvar: false,
      threeDensvar: false
    })
  }

  // SETS 3DENSVAR AS SELECTED IN STATE
  threeDensvarSelect = () => {
    this.state.threeDensvar ?
    this.setState({
      threeDensvar: false
    }) :
    this.setState({
      threeDensvar: true,
      threeDvar: false,
      fourDensvar: false
    })
  }


  // SETS 4DENSVAR AS SELECTED IN STATE
  fourDensvarSelect = () => {
    this.state.fourDensvar ?
    this.setState({
      fourDensvar: false
    }) :
    this.setState({
      fourDensvar: true,
      threeDvar: false,
      threeDensvar: false
    })
  }

  // HOUR FREQUENCY RANGE-SLIDER
  hourFrequencyOnChange = (value) => {
    this.setState({
      hourFrequency: value
    })
  }

  // YEAR FREQUENCY RANGE-SLIDER
  yearFrequencyOnChange = (value) => {
    this.setState({
      yearFrequency: value
    })
  }

  // DAY FREQUENCY RANGE-SLIDER
  dayFrequencyOnChange = (value) => {
    this.setState({
      dayFrequency: value
    })
  }

  // MINUTE FREQUENCY RANGE-SLIDER
  minuteFrequencyOnChange = (value) => {
    this.setState({
      minuteFrequency: value
    })
  }

  // SECOND FREQUENCY RANGE-SLIDER
  secondFrequencyOnChange = (value) => {
    this.setState({
      secondFrequency: value
    })
  }

  // BUTTONS ARE ENABLED TO CONTINUE TO THE WPS CAROUSEL CARD
  continueToWpsOnChange = () => {
    let value = this.state.continueToWps ? false : true
    this.setState({
      continueToWps: value
    })
  }

  // CHANGES CALENDAR MONTH BACK
  prevMonth = (date) => {
      this.setState({
        date:date.getTime()
      })
  }

  // CHANGES CALENDAR MONTH FORWARD
  nextMonth = (date) => {
      this.setState({
        date:date.getTime()
      })
  }

 // SET CALENDAR DATE RANGE
  setRange = (selectionStart, selectionEnd) => {
      this.setState({
        selectionStart,
        selectionEnd
      })
  }

  // OPEN AND CLOSE THE MAP MODAL
  mapModal = () => {
    if(this.state.showMapModal) {
      this.setState({
        showMapModal: false
      })
    } else {
      this.setState({
        showMapModal: true
      })
    }
  }

  // SET DRAWN COORDINATES ON MAP
  drawCoords = (northWest, northEast, southEast, southWest) => {
    this.setState({
      northWest,
      northEast,
      southEast,
      southWest
    })
  }

  // SELECTS GFS TYPE
  gfsSelect = () => {
    if(this.state.gfsSelect) {
      this.setState({
        gfsSelect: false,
        wpsTypeSaved: false
      })
    } else {
      this.setState({
        gfsSelect: true,
        hrrrSelect: false,
        namSelect: false,
        wpsTypeSaved: true
      })
    }
  }

  // SELECTS HRRR TYPE
  hrrrSelect = () => {
    if(this.state.hrrrSelect) {
      this.setState({
        hrrrSelect: false,
        wpsTypeSaved: false
      })
    } else {
      this.setState({
        hrrrSelect: true,
        gfsSelect: false,
        namSelect: false,
        wpsTypeSaved: true
      })
    }
  }

  // SELECTS NAM TYPE
  namSelect = () => {
    if(this.state.namSelect) {
      this.setState({
        namSelect: false,
        wpsTypeSaved: false
      })
    } else {
      this.setState({
        hrrrSelect: false,
        gfsSelect: false,
        namSelect: true,
        wpsTypeSaved: true
      })
    }
  }

  // SAVES THE MAP TO THE SUMMARY
  saveMap = () => {
      this.setState({
        mapSaved: true
      })
  }

  // SELECTS WRFDA TYPE
  wrfdaSelect = () => {
    if(this.state.wrfda) {
      this.setState({
        wrfda: false
      })
    } else {
      this.setState({
        wrfda: true,
        gsi: false
      })
    }
  }

  // SELECTS GSI TYPE
  gsiSelect = () => {
    if(this.state.gsi) {
      this.setState({
        gsi: false
      })
    } else {
      this.setState({
        gsi: true,
        wrfda: false
      })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/local'
            render={()=> (
            this.state.currentUser !== undefined ?
            (<Redirect to={`/${this.state.currentUser}`} />)
              :
            <div>
              <Login
              setCurrentUser={this.setCurrentUser}/>
            </div>)}
          />
          <Route exact path={`/${this.state.currentUser}`}
            render={()=> (
            this.state.currentJobName &&
            this.state.currentUser ? (
              <Redirect to={`/${this.state.currentUser}/${this.state.currentJobName}`}/>
            ) : (
            <div>
              <Header />
              <JobType jobType={this.state.jobType}
                jobTypeSelect={this.jobTypeSelect}/>
              <JobTypeNewExisting
                jobs={this.state.jobs}
                jobType={this.state.jobType}
                newJobName={this.newJobName}
                jobTypeNewExisting={this.newExisting}
                backButton={this.backButton}
              />
            </div>))}
            />
          <Route
            path='/'
            // path={`/${this.state.currentUser}/${this.state.currentJobName}`}
            render={()=> (
            <div>
              <Dashboard
                nwpFlipped={this.state.nwpFlipped}
                wpsFlipped={this.state.wpsFlipped}
                wrfFlipped={this.state.wrfFlipped}
                daFlipped={this.state.daFlipped}
                nwpFlipFunc={this.nwpFlipFunc}
                wpsFlipFunc={this.wpsFlipFunc}
                boundaryConditionsFlipFunc={this.boundaryConditionsFlipFunc}
                boundaryConditionsFlipped={this.state.boundaryConditionsFlipped}
                wrfFlipFunc={this.wrfFlipFunc}
                daFlipFunc={this.daFlipFunc}
                currentJobName={this.state.currentJobName}
                showNwp={this.state.showNwp}
                showWps={this.state.showWps}
                showWrf={this.state.showWrf}
                showDa={this.state.showDa}
                threeDvar={this.state.threeDvar}
                threeDensvar={this.state.threeDensvar}
                fourDensvar={this.state.fourDensvar}
                threeDvarSelect={this.threeDvarSelect}
                threeDensvarSelect={this.threeDensvarSelect}
                fourDensvarSelect={this.fourDensvarSelect}
                nwpShowClick={this.nwpShowClick}
                wpsShowClick={this.wpsShowClick}
                wrfShowClick={this.wrfShowClick}
                daShowClick={this.daShowClick}
                runMainJob={this.state.runMainJob}
                setMainJob={this.setMainJob}
                hourFrequencyOnChange={this.hourFrequencyOnChange}
                hourFrequency={this.state.hourFrequency}
                yearFrequencyOnChange={this.yearFrequencyOnChange}
                yearFrequency={this.state.yearFrequency}
                dayFrequencyOnChange={this.dayFrequencyOnChange}
                dayFrequency={this.state.dayFrequency}
                minuteFrequencyOnChange={this.minuteFrequencyOnChange}
                minuteFrequency={this.state.minuteFrequency}
                secondFrequencyOnChange={this.secondFrequencyOnChange}
                secondFrequency={this.state.secondFrequency}
                continueToWps={this.state.continueToWps}
                continueToWpsOnChange={this.continueToWpsOnChange}
                date={this.state.date}
                selectionStart={this.state.selectionStart}
                selectionEnd={this.state.selectionEnd}
                prevMonth={this.prevMonth}
                nextMonth={this.nextMonth}
                setRange={this.setRange}
                lat={this.state.lat}
                lng={this.state.lng}
                zoom={this.state.zoom}
                mapModal={this.mapModal}
                showMapModal={this.state.showMapModal}
                syncMapModal={this.syncMapModal}
                drawCoords={this.drawCoords}
                northWest={this.state.northWest}
                northEast={this.state.northEast}
                southEast={this.state.southEast}
                southWest={this.state.southWest}
                gfsSelect={this.gfsSelect}
                gfs={this.state.gfsSelect}
                hrrrSelect={this.hrrrSelect}
                hrrr={this.state.hrrrSelect}
                namSelect={this.namSelect}
                nam={this.state.namSelect}
                mapSaved={this.state.mapSaved}
                saveMap={this.saveMap}
                wpsTypeSaved={this.state.wpsTypeSaved}
                wrfdaSelect={this.wrfdaSelect}
                gsiSelect={this.gsiSelect}
                wrfda={this.state.wrfda}
                gsi={this.state.gsi}
                mapColors={this.state.mapColors}
              />
            </div>
          )}
          />
          {/* {console.log(this.state)} */}
        </div>

      </BrowserRouter>
    )
  }
}

export default App
