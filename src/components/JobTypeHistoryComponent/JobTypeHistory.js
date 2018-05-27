import React, { Component } from 'react'
import { Button } from 'react-materialize'
import './JobTypeHistory.css'

class JobTypeHistory extends Component {
  // jobTypeHistoryClick = (event) => {
  //   let selectedJob = event.target.name
  // }

  backButtonClick = () => {
    this.props.backButton()
  }

  render() {
    return (
      <div className={`container ${!this.props.cyclingNwpStandardNewJob &&
          !this.props.cyclingNwpStandardExistingJob &&
          !this.props.cyclingNwpEnsembleNewJob &&
          !this.props.cyclingNwpEnsembleExistingJob &&
          !this.props.forecastNewJob &&
          !this.props.forecastExistingJob &&
          !this.props.reanalysisNewJob &&
          !this.props.reanalysisExistingJob ? 'hide' : ''}`}>
        <div className="row">
          <div className="col s2 m2 l2">
          </div>
          <div className="col s8 m8 l8 card job-type-container">
            <a className="btn-floating waves-effect waves-light left back-button" onClick={this.backButtonClick}><i className="material-icons">arrow_back</i></a>
            <h5 className="center-align">Job Type</h5>
            <div className="center-align">
              <Button className="new-job-btn" onClick={this.jobTypeNewExistingClick} name='new' waves='light'>Job History</Button>
            </div>
          </div>
          <div className="col s2 m2 l2">
          </div>
        </div>
      </div>
    )
  }
}

export default JobTypeHistory
