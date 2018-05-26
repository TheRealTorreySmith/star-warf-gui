import React, { Component } from 'react'
import { Button } from 'react-materialize'
import './JobTypeNewExisting.css'

class JobTypeNewExisting extends Component {
  jobTypeNewExistingClick = (event) => {
    let newOrExisting = event.target.name
    this.props.jobTypeNewExisting(newOrExisting)
  }

  backButtonClick = () => {
    this.props.backButton()
  }

  render() {
    return (
      <div className={`container ${this.props.jobType === 'forecast' ||
           this.props.jobType === 'reanalysis' ||
           this.props.cyclingNwpStandard !== false ||
           this.props.cyclingNwpEnsemble !== false ? '' : 'hide'}`}>
        <div className="row">
          <div className="col s2 m2 l2">
          </div>
          <div className="col s8 m8 l8 card job-type-container">
            <a className="btn-floating waves-effect waves-light left back-button" onClick={this.backButtonClick}><i className="material-icons">arrow_back</i></a>
            <h5 className="center-align">Job Type</h5>
            <div className="center-align">
              <Button className="new-job-btn" onClick={this.jobTypeNewExistingClick} name='new' waves='light'>New Job</Button>
            </div>
            <div className="center-align existing-job-btn">
              <Button onClick={this.jobTypeNewExistingClick} name='existing' waves='light'>Existing Job</Button>
            </div>
          </div>
          <div className="col s2 m2 l2">
          </div>
        </div>
      </div>
    )
  }
}

export default JobTypeNewExisting
