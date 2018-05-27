import React, { Component } from 'react';
import Header from './components/HeaderComponent/Header.js'
import JobType from './components/JobTypeComponent/JobType.js'
import Carousel from './components/CarouselComponent/Carousel.js'
import JobTypeCyclingNwp from './components/JobTypeCyclingNwpComponent/JobTypeCyclingNwp.js'
import JobTypeNewExisting from './components/JobTypeNewExistingComponent/JobTypeNewExisting.js'
import JobTypeHistory from './components/JobTypeHistoryComponent/JobTypeHistory.js'
import NewJob from './components/NewJobComponent/NewJob.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobType: '',
      cyclingNwpStandard: false,
      cyclingNwpEnsemble: false,
      cyclingNwpStandardNewJob: false,
      cyclingNwpStandardExistingJob: false,
      cyclingNwpEnsembleNewJob: false,
      cyclingNwpEnsembleExistingJob: false,
      forecastNewJob: false,
      forecastExistingJob: false,
      reanalysisNewJob: false,
      reanalysisExistingJob: false,
      jobNames: []
    }
  }

  jobTypeSelect = (jobType) => {
    this.setState({
      jobType: jobType
    })
  }

  jobTypeCyclingNwp = (cyclingNwpOption) => {
    cyclingNwpOption === 'standard' ?
    this.setState({
      cyclingNwpStandard: true
    }) :
    this.setState({
      cyclingNwpEnsemble: true
    })
  }

  newExisting = (newOrExisting) => {
    newOrExisting === 'new' ?
      this.state.jobType === 'cycling-nwp' ?
        this.state.cyclingNwpStandard === true ?
          this.setState({ cyclingNwpStandardNewJob: true }) :
          this.setState({ cyclingNwpEnsembleNewJob: true }) :
      this.state.jobType === 'forecast' ?
      this.setState({ forecastNewJob: true }) :
      this.setState({ reanalysisNewJob: true }) :
      this.state.jobType === 'cycling-nwp' ?
        this.state.cyclingNwpEnsemble === true ?
          this.setState({ cyclingNwpEnsembleExistingJob: true }) :
          this.setState({ cyclingNwpStandardExistingJob: true }) :
      this.state.jobType === 'forecast' ?
      this.setState({ forecastExistingJob: true }) :
      this.setState({ reanalysisExistingJob: true })
  }

  // BACK BUTTON STATE HANDLERS
  backButton = () => {
    this.state.cyclingNwpStandard === true ||
    this.state.cyclingNwpEnsemble === true ?
    this.setState({
      cyclingNwpStandard: false,
      cyclingNwpEnsemble: false
    }) :
    this.setState({
      jobType: ''
    })
  }

  standardEnsembleBackButton = () => {
    this.setState({
      jobType: ''
    })
  }

  // NEW JOB NAME STATE HANDLER
  newJobName = (newJobName) => {
    // console.log(newJobName)
  }

  render() {
    return (
      <div>
        <Header />
        <JobType
          jobType={this.state.jobType}
          jobTypeSelect={this.jobTypeSelect}
        />
        <JobTypeCyclingNwp
          jobType={this.state.jobType}
          jobTypeCyclingNwp={this.jobTypeCyclingNwp}
          cyclingNwpStandard= {this.state.cyclingNwpStandard}
          cyclingNwpEnsemble= {this.state.cyclingNwpEnsemble}
          backButton={this.standardEnsembleBackButton}
        />
        <JobTypeNewExisting
          jobType={this.state.jobType}
          jobTypeNewExisting={this.newExisting}
          cyclingNwpStandard={this.state.cyclingNwpStandard}
          cyclingNwpEnsemble={this.state.cyclingNwpEnsemble}
          cyclingNwpStandardNewJob={this.state.cyclingNwpStandardNewJob}
          cyclingNwpStandardExistingJob={this.state.cyclingNwpStandardExistingJob}
          cyclingNwpEnsembleNewJob={this.state.cyclingNwpEnsembleNewJob}
          cyclingNwpEnsembleExistingJob={this.state.cyclingNwpEnsembleExistingJob}
          forecastNewJob={this.state.forecastNewJob}
          forecastExistingJob={this.state.forecastExistingJob}
          reanalysisNewJob={this.state.reanalysisNewJob}
          reanalysisExistingJob={this.state.reanalysisExistingJob}
          backButton={this.backButton}
        />
        <JobTypeHistory
          cyclingNwpStandardNewJob={this.state.cyclingNwpStandardNewJob}
          cyclingNwpStandardExistingJob={this.state.cyclingNwpStandardExistingJob}
          cyclingNwpEnsembleNewJob={this.state.cyclingNwpEnsembleNewJob}
          cyclingNwpEnsembleExistingJob={this.state.cyclingNwpEnsembleExistingJob}
          forecastNewJob={this.state.forecastNewJob}
          forecastExistingJob={this.state.forecastExistingJob}
          reanalysisNewJob={this.state.reanalysisNewJob}
          reanalysisExistingJob={this.state.reanalysisExistingJob}
        />
        <NewJob
          cyclingNwpStandardNewJob={this.state.cyclingNwpStandardNewJob}
          cyclingNwpEnsembleNewJob={this.state.cyclingNwpEnsembleNewJob}
          forecastNewJob={this.state.forecastNewJob}
          reanalysisNewJob={this.state.reanalysisNewJob}
          newJobName={this.newJobName}
        />
        <Carousel />

      </div>
    )
  }
}

export default App;
