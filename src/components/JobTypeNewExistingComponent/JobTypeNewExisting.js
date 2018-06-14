import React, { Component } from 'react'
import { Button, Row, Input } from 'react-materialize'
import './JobTypeNewExisting.css'

class JobTypeNewExisting extends Component {
  jobTypeNewExistingClick = () => {
   let newJobName = this.refs.jobName.state.value
    this.props.newJobName(newJobName)
    // this.props.existingJob(jobName)

  }

  backButtonClick = () => {
    this.props.backButton()
  }

  render() {
    return (
      <div className={`animated fadeIn container ${this.props.jobType ? '' : 'hide'}`}>
        <div className="row">
          <div className="col s2 m2 l2">
          </div>
          <div className="col s8 m8 l8 card job-type-container">
            <a className="btn-floating waves-effect waves-light left back-button" onClick={this.backButtonClick}><i className="material-icons">arrow_back</i></a>
            <h5 className="center-align job-name-title">JOB NAME:</h5>
            <Row>
              <Input className="center-align" ref="selectedJob" s={6} type='select' label="Previous Jobs">
              {this.props.jobType && this.props.jobs.length > 0 ? this.props.jobs.map(x =>
              this.props.jobType && x.jobType === this.props.jobType ? <option key={x.key}>{x.name}</option> : '') : <option value="No Job History"></option>}
              </Input>
              <Input ref="jobName" s={5} placeholder="New Job Name" validate/>
            </Row>
            <Row className="center-align existing-job-btn">
              <Button onClick={this.jobTypeNewExistingClick} className='new-job-continue-button' waves='light'>Continue</Button>
            </Row>
          </div>
          <div className="col s2 m2 l2">
          </div>
        </div>
      </div>
    )
  }
}

export default JobTypeNewExisting
