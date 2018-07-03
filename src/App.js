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
      wrfFlipped: false,
      wrfDaFlipped: false,
      showNwp: true,
      showWps: false,
      showWrf: false,
      showWrfDa: false,
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
      // syncMap: null
      coords: []
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

  // FLIPS WRF CAROUSEL CARD
  wrfFlipFunc = () => {
    let flipStatus = this.state.wrfFlipped ? false : true
    this.setState({
      wrfFlipped: flipStatus
    })
  }

  // FLIPS WRFDA CAROUSEL CARD
  wrfDaFlipFunc = () => {
    let flipStatus = this.state.wrfDaFlipped ? false : true
    this.setState({
      wrfDaFlipped: flipStatus
    })
  }

  // SWITCHES TO NWP CAROUSEL CARD
  nwpShowClick = () => {
    this.setState({
      showNwp: true,
      showWps: false,
      showWrf: false,
      showWrfDa: false,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      wrfDaFlipped: false
    })
  }

  // SWITCHES TO WPS CAROUSEL CARD
  wpsShowClick = () => {
    this.setState({
      showNwp: false,
      showWps: true,
      showWrf: false,
      showWrfDa: false,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      wrfDaFlipped: false
    })
  }

  // SWITCHES TO WRF CAROUSEL CARD
  wrfShowClick = () => {
    this.setState({
      showNwp: false,
      showWps: false,
      showWrf: true,
      showWrfDa: false,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      wrfDaFlipped: false
    })
  }

  // SWITCHES TO WRFDA CAROUSEL CARD
  wrfDaShowClick = () => {
    this.setState({
      showNwp: false,
      showWps: false,
      showWrf: false,
      showWrfDa: true,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      wrfDaFlipped: false
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

  continueToWpsOnChange = () => {
    let value = this.state.continueToWps ? false : true
    this.setState({
      continueToWps: value
    })
  }

  prevMonth = (date) => {
      this.setState({
        date:date.getTime()
      })
  }

  nextMonth = (date) => {
      this.setState({
        date:date.getTime()
      })
  }

  setRange = (selectionStart, selectionEnd) => {
      this.setState({
        selectionStart,
        selectionEnd
      })
  }

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

  // mainMap = (map) => {
  //   this.setState({
  //     map: map
  //   })
  // }

  // syncMapModal = (map) => {
  //   this.setState({
  //     syncMapModal: map
  //   })
  //   console.log(map)
  // }

  drawCoords = (coords) => {
    this.setState({
      coords: coords
    })
    // console.log(coords)
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
                wrfDaFlipped={this.state.wrfDaFlipped}
                nwpFlipFunc={this.nwpFlipFunc}
                wpsFlipFunc={this.wpsFlipFunc}
                wrfFlipFunc={this.wrfFlipFunc}
                wrfDaFlipFunc={this.wrfDaFlipFunc}
                currentJobName={this.state.currentJobName}
                showNwp={this.state.showNwp}
                showWps={this.state.showWps}
                showWrf={this.state.showWrf}
                showWrfDa={this.state.showWrfDa}
                threeDvar={this.state.threeDvar}
                threeDensvar={this.state.threeDensvar}
                fourDensvar={this.state.fourDensvar}
                threeDvarSelect={this.threeDvarSelect}
                threeDensvarSelect={this.threeDensvarSelect}
                fourDensvarSelect={this.fourDensvarSelect}
                nwpShowClick={this.nwpShowClick}
                wpsShowClick={this.wpsShowClick}
                wrfShowClick={this.wrfShowClick}
                wrfDaShowClick={this.wrfDaShowClick}
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
                // syncMap={this.state.syncMap}
                // mainMap={this.mainMap}
                // map={this.state.map}
                drawCoords={this.drawCoords}
                getCoords={this.state.coords}
              />
            </div>
          )}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
