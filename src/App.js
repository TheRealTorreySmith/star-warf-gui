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
      runMainJob: false
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

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/login'
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
              />
            </div>
          )}
          />
          {console.log(this.state)}
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
