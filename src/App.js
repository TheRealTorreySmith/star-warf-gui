import React, { Component } from 'react';
import Header from './components/HeaderComponent/Header.js'
import JobType from './components/JobTypeComponent/JobType.js'
import Carousel from './components/CarouselComponent/Carousel.js'
import JobTypeCyclingNwp from './components/JobTypeCyclingNwpComponent/JobTypeCyclingNwp.js'
import JobTypeNewExisting from './components/JobTypeNewExistingComponent/JobTypeNewExisting.js'

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
    console.log(newOrExisting)
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
        />
        <JobTypeNewExisting
          jobType={this.state.jobType}
          jobTypeNewExisting={this.newExisting}
          cyclingNwpStandard= {this.state.cyclingNwpStandard}
          cyclingNwpEnsemble= {this.state.cyclingNwpEnsemble}
        />
        <Carousel />
      </div>
    )
  }
}

export default App;
