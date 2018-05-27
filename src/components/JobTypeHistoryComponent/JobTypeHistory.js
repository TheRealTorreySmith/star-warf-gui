import React, { Component } from 'react'
import { Button, Input } from 'react-materialize'
import './JobTypeHistory.css'

class JobTypeHistory extends Component {
  // jobTypeHistoryClick = (event) => {
  //   let selectedJob = event.target.name
  // }

  // backButtonClick = () => {
  //   this.props.backButton()
  // }

  render() {
    return (
      <div className={`container ${
          this.props.cyclingNwpStandardExistingJob ||
          this.props.cyclingNwpEnsembleExistingJob ||
          this.props.forecastExistingJob ||
          this.props.reanalysisExistingJob ? '' : 'hide'}`}>
        <div className="row">
          <div className="col s2 m2 l2">
          </div>
          <div className="col s8 m8 l8 card job-type-container">
            <a className="btn-floating waves-effect waves-light left back-button" onClick={this.backButtonClick}><i className="material-icons">arrow_back</i></a>
            <h5 className="center-align">Job Type</h5>
            <div className="row">
              <div className="col s3 m3 l3">
              </div>
                <Input className="center-align" s={6} type='select' label="Previous Jobs" defaultValue='2'>
                  <option value='1'>Job #1</option>
                  <option value='2'>Job #2</option>
                  <option value='3'>Job #3</option>
                </Input>
              <div className="center-align">
                <Button id="continue-to-job-btn" onClick={this.editExistingJob} name='new' waves='light'>CONTINUE</Button>
              </div>
              <div className="col s3 m3 l3">
              </div>
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
