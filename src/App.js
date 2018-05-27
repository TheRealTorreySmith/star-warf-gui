import React, { Component } from 'react';
import Header from './components/HeaderComponent/Header.js'
import JobType from './components/JobTypeComponent/JobType.js'
import Carousel from './components/CarouselComponent/Carousel.js'
import JobTypeCyclingNwp from './components/JobTypeCyclingNwpComponent/JobTypeCyclingNwp.js'
import JobTypeNewExisting from './components/JobTypeNewExistingComponent/JobTypeNewExisting.js'
import JobTypeHistory from './components/JobTypeHistoryComponent/JobTypeHistory.js'

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
      reanalysisExistingJob: false
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
          // console.log('new standard cycling-nwp')
          this.setState({ cyclingNwpStandardNewJob: true }) :
          // console.log('new ensemble cycling-nwp')
          this.setState({ cyclingNwpEnsembleNewJob: true }) :
      this.state.jobType === 'forecast' ?
      // console.log('new forecast')
      this.setState({ forecastNewJob: true }) :
      // console.log('new reanalysis')
      this.setState({ reanalysisNewJob: true }) :
      this.state.jobType === 'cycling-nwp' ?
        this.state.cyclingNwpEnsemble === true ?
          // console.log('existing ensemble cycling-nwp')
          this.setState({ cyclingNwpEnsembleExistingJob: true }) :
          // console.log('existing standard cycling-nwp')
          this.setState({ cyclingNwpStandardExistingJob: true }) :
      this.state.jobType === 'forecast' ?
      // console.log('existing forecast')
      this.setState({ forecastExistingJob: true }) :
      // console.log('existing reanalysis')
      this.setState({ reanalysisExistingJob: true })
  }

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
        <Carousel />
      </div>
    )
  }
}

export default App;
