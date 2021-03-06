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
      // LOGIN STATE
      jobType: '',
      currentUser: undefined,
      jobs: [
        {id: 1, name: 'Jan17,2018'},
        {id: 2, name: 'Feb3,2018'},
        {id: 3, name: 'Mar7,2018'},
        {id: 4, name: 'AFTAC test job'},
        {id: 5, name: 'Apr12,2018'},
        {id: 6, name: 'Jun21,2018'},
        {id: 7, name: 'Galvanize Presentation'}
        ],
      currentJob: undefined,
      isLoggedIn: true,
      // DASHBOARD STATE
      inputFields: null,
      defaultValues: null,
      // NWP STATE
      showNwp: true,
      nwpFlipped: false,
      // WPS STATE
      showWps: false,
      wpsFlipped: false,
      boundaryConditionsFlipped: false,
      threeDvar: false,
      threeDensvar: false,
      fourDensvar: false,
      coldStartWrf: false,
      hourFrequency: 3,
      yearFrequency: 0,
      dayFrequency: 0,
      minuteFrequency: 0,
      secondFrequency: 0,
      continueToWps: false,
      hourSelected: 1,
      hourTranslation: 0,
      // SUMMARY STATE
      mapSaved: false,
      wpsTypeSaved: false,
      gsi: false,
      wrfda: false,
      gfsSelect: false,
      hrrrSelect: false,
      namSelect: false,
      runMainJob: false,
      // CALENDAR STATE
      date:Date.now(),
      selectionStart: 0,
      selectionEnd: 0,
      // MAP STATE
      lat: 20.9635945,
      lng: -105.14556859999999,
      zoom: 0,
      showMapModal: false,
      coords: [],
      latCoords: [],
      lngCoords: [],
      mapColors: ['black','red', 'green', 'purple', 'orange', 'blue', 'cyanne', 'turqoise', 'grey', 'pink', 'yellow'],
      northWest: {},
      northEast: {},
      southEast: {},
      southWest: {},
      // WRF STATE
      showWrf: false,
      wrfFlipped: false,
      allHeadings: null,
      headers: [],
      headingsArray: [],
      subHeaders: [],
      subHeadersArray: [],
      tertHeaders: [],
      tertHeadingsArray: [],
      namelistInputField: {},
      // DA STATE
      showDa: false,
      daFlipped: false,
    }
  }

  // HOLDS THE SESSION IN STORAGE
  componentWillMount = () => {
    let id = this.state.jobs.length + 1
    if(sessionStorage.getItem('username') && sessionStorage.getItem('currentJob')) {
      let username = sessionStorage.getItem('username')
      let currentJob = sessionStorage.getItem('currentJob')
      this.setState({
        ...this.state,
        currentUser: username,
        jobs: [
        {
          id: id,
          name: currentJob
        },
        ...this.state.jobs],
        currentJob: {id: id, name: currentJob}
      })
      document.title = currentJob
    } else if (sessionStorage.getItem('username')){
      let username = sessionStorage.getItem('username')
      this.setState({
        currentUser: username
      })
    }
  }

  // USERNAME STATE HANDLER
  setCurrentUser = (username, password) => {
    sessionStorage.setItem('username', username)
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
    sessionStorage.setItem('currentJob', newJobName)
    let id = this.state.jobs.length + 1
    this.setState({
      ...this.state,
      jobs: [
      {
        id: id,
        name: newJobName
      },
      ...this.state.jobs],
      currentJob: {id: id, name: newJobName}
    })
  }

  // EXISTING JOB STATE HANDLER
  existingJobName = (existingJobName) => {
    document.title = existingJobName
    sessionStorage.setItem('currentJob', existingJobName)
    let job = this.state.jobs.filter(x => x.name === existingJobName)
    this.setState({
      currentJob: job[0]
    })
  }

  getAllHeadings = async () => {
    try {
      const res = await fetch('http://localhost:8080/inputFields/headings')
        const allHeadings = await res.json()
        const headingsArray = []
        const subHeadingsArray = []
        const tertHeadingsArray = []
        allHeadings.map(x => headingsArray.includes(x.heading) || x.heading === '' ? x : headingsArray.push(x.heading))
        const headers = Object.assign(headingsArray.map(d => ({[d]: false})))
        allHeadings.map(x => x.subheading === subHeadingsArray[subHeadingsArray.length-1] || x.subheading === '' ? x : subHeadingsArray.push(x.subheading))
        const subHeaders = Object.assign(subHeadingsArray.map(d => ({[d]: false})))
        allHeadings.map(x => x.tertiary_heading === tertHeadingsArray[tertHeadingsArray.length-1] || x.tertiary_heading === '' ? x : tertHeadingsArray.push(x.tertiary_heading))
        const tertHeaders = Object.assign(tertHeadingsArray.map(d => ({[d]: false})))
        this.setState({
          headers: headers,
          headingsArray: headingsArray,
          subHeaders: subHeaders,
          subHeadingsArray: subHeadingsArray,
          tertHeaders: tertHeaders,
          tertHeadingsArray: tertHeadingsArray,
          allHeadings: allHeadings
        })
      }
      catch (err) {
        console.log(`AWWWW SHUCKS! ${err}`)
      }
    }

  // PULLS ALL INPUT FIELDS FROM THE DB
  getInputFields = async () => {
    try {
      const res = await fetch('http://localhost:8080/inputFields')
        const inputFields = await res.json()
        this.setState({
          inputFields: inputFields
        })
      }
      catch (err) {
        console.log(`AWWWW SHUCKS! ${err}`)
      }
    }

  // PULLS ALL DEFAULT VALUES FROM THE DB
  getDefaultValues = async () => {
    try {
      const res = await fetch('http://localhost:8080/defaultValues')
        const defaultValues = await res.json()
        this.setState({
          defaultValues: defaultValues
        })
      }
      catch (err) {
        console.log(`AWWWW SHUCKS! ${err}`)
      }
    }

    // SHOWS ALL SUBHEADERS ON CLICK OF HEADER
  wrfBtnClick = (headBtnId) => {
    let headers = Object.assign(this.state.headingsArray.map(d =>
      d === this.state.headingsArray[headBtnId] &&
      this.state.headers[headBtnId][this.state.headingsArray[headBtnId]] === false ?
      ({[d]: true})
      : ({[d]: false})))
    this.setState({
      headers: headers
    })
    // DESELECTS SUBHEADINGS WHEN HEADINGS ARE CLOSED
    this.wrfSubBtnClick()
    // DESELECTS TERTIARY_HEADINGS WHEN HEADINGS ARE CLOSED
    this.wrfTertBtnClick()
  }

  // SHOWS ALL TERTIARY_HEADERS ON CLICK OF SUBHEADER
  wrfSubBtnClick = (subBtnId) => {
    let subHeaders = Object.assign(this.state.subHeadingsArray.map(d =>
      d === this.state.subHeadingsArray[subBtnId] &&
      this.state.subHeaders[subBtnId][this.state.subHeadingsArray[subBtnId]] === false ?
      ({[d]: true})
      : ({[d]: false})))
    this.setState({
      subHeaders: subHeaders
    })
    this.wrfTertBtnClick()
  }

  // SHOWS ALL RELATIVE NAMES ON CLICK OF TERTIARY_HEADER
  wrfTertBtnClick = (tertBtnId) => {
    let tertHeaders = Object.assign(this.state.tertHeadingsArray.map(d =>
      d === this.state.tertHeadingsArray[tertBtnId] &&
      this.state.tertHeaders[tertBtnId][this.state.tertHeadingsArray[tertBtnId]] === false ?
      ({[d]: true})
      : ({[d]: false})))
    this.setState({
      tertHeaders: tertHeaders
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

  // FLIPS THE BOUNDARY CONDITIONS CARD ON THE WPS CARD
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
    if(this.state.showWrf) {
      this.setState({
        showWrf: false
      })
    } else {
      this.setState({
        showNwp: false,
        showWps: false,
        showWrf: true,
        showDa: true,
        nwpFlipped: false,
        wpsFlipped: false,
        wrfFlipped: false,
        daFlipped: false
      })
    }
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

  // RUNS THE MAIN JOB
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
      threeDensvar: false,
      coldStartWrf: false
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
      fourDensvar: false,
      coldStartWrf: false
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
      threeDensvar: false,
      coldStartWrf: false
    })
  }

  // SETS COLD-START WRF AS SELECTED IN STATE
  coldStartWrfSelect = () => {
    this.state.coldStartWrf ?
    this.setState({
      coldStartWrf: false
    }) :
    this.setState({
      coldStartWrf: true,
      fourDensvar: false,
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

  // CHANGES CALENDAR MONTH BACK
  prevYear = (date) => {
      this.setState({
        date:date.getTime()
      })
  }

  // CHANGES CALENDAR MONTH FORWARD
  nextYear = (date) => {
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

  namelistInputField = (x) => {
    this.setState({
      namelistInputField: x
    })
  }

  hoursChange = (hour) => {
    this.setState({
      hourSelected: hour
    })
  }

  hourTranslation = (hourTranslation) => {
    this.setState({
      hourTranslation: hourTranslation
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/'
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
            this.state.currentJob &&
            this.state.currentUser ? (
              <Redirect to={`/${this.state.currentUser}/${this.state.currentJob.name}`}/>
            ) : (
            <div>
              <Header />
              <JobType jobType={this.state.jobType}
                jobTypeSelect={this.jobTypeSelect}/>
              <JobTypeNewExisting
                jobs={this.state.jobs}
                jobType={this.state.jobType}
                newJobName={this.newJobName}
                existingJobName={this.newJobName}
                jobTypeNewExisting={this.existingJobName}
                backButton={this.backButton}
                getInputFields={this.getInputFields}
                getDefaultValues={this.getDefaultValues}
              />
            </div>))}
            />
          <Route
            // exact path={`/${this.state.currentJob ? this.state.currentJob.name : null}`}
            path={`/${this.state.currentJob ? this.state.currentUser+'/'+this.state.currentJob.name : null}`}
            render={()=> (
            <div>
              <Dashboard
                getInputFields={this.getInputFields}
                getAllHeadings={this.getAllHeadings}
                allHeadings={this.state.allHeadings}
                getDefaultValues={this.getDefaultValues}
                inputFields={this.state.inputFields}
                defaultValues={this.state.defaultValues}
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
                currentJob={this.state.currentJob}
                showNwp={this.state.showNwp}
                showWps={this.state.showWps}
                showWrf={this.state.showWrf}
                showDa={this.state.showDa}
                threeDvar={this.state.threeDvar}
                threeDensvar={this.state.threeDensvar}
                fourDensvar={this.state.fourDensvar}
                coldStartWrf={this.state.coldStartWrf}
                threeDvarSelect={this.threeDvarSelect}
                threeDensvarSelect={this.threeDensvarSelect}
                fourDensvarSelect={this.fourDensvarSelect}
                coldStartWrfSelect={this.coldStartWrfSelect}
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
                prevYear={this.prevYear}
                nextYear={this.nextYear}
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
                wrfModal={this.wrfShowClick}
                wrfBtnClick={this.wrfBtnClick}
                headers={this.state.headers}
                wrfSubBtnClick={this.wrfSubBtnClick}
                subHeaders={this.state.subHeaders}
                wrfTertBtnClick={this.wrfTertBtnClick}
                tertHeaders={this.state.tertHeaders}
                namelistInputField={this.namelistInputField}
                showNamelistInputField={this.state.namelistInputField}
                hourSelected={this.state.hourSelected}
                hoursChange={this.hoursChange}
                hourTranslation={this.state.hourTranslation}
                hourTranslationChange={this.hourTranslation}
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
