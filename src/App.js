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
      // cyclingNwpStandard: false,
      // cyclingNwpEnsemble: false,
      // cyclingNwpStandardNewJob: false,
      // cyclingNwpStandardExistingJob: false,
      // cyclingNwpEnsembleNewJob: false,
      // cyclingNwpEnsembleExistingJob: false,
      // forecastNewJob: false,
      // forecastExistingJob: false,
      // reanalysisNewJob: false,
      // reanalysisExistingJob: false,
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
      runMainJob: false
    }
  }

  setCurrentUser = (username, password) => {
    // console.log(username)
    // console.log(password)
    this.setState({
      currentUser: username
    })
  }

  jobTypeSelect = (jobType) => {
    this.setState({
      jobType: jobType
    })
  }

  // BACK BUTTON STATE HANDLERS
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

  // newExisting = (newOrExisting) => {
  //
  // }


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
    console.log(this.state)
    console.log(newJobName)
  }

  nwpFlipFunc = () => {
    let flipStatus = this.state.nwpFlipped ? false : true
    this.setState({
      nwpFlipped: flipStatus
    })
  }

  wpsFlipFunc = () => {
    let flipStatus = this.state.wpsFlipped ? false : true
    this.setState({
      wpsFlipped: flipStatus
    })
  }

  wrfFlipFunc = () => {
    let flipStatus = this.state.wrfFlipped ? false : true
    this.setState({
      wrfFlipped: flipStatus
    })
  }

  wrfDaFlipFunc = () => {
    let flipStatus = this.state.wrfDaFlipped ? false : true
    this.setState({
      wrfDaFlipped: flipStatus
    })
  }

  wpsShowClick = () => {
    this.setState({
      showNwp: false,
      showWps: true,
      showWrf: false,
      showWrfDa: false
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
                wpsShowClick={this.wpsShowClick}
                runMainJob={this.state.runMainJob}
                setMainJob={this.setMainJob}
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

export default App;
