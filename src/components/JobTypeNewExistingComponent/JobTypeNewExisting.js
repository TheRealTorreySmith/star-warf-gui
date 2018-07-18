import React, { Component } from 'react'
import { Button, Row, Input } from 'react-materialize'
import './JobTypeNewExisting.css'

class JobTypeNewExisting extends Component {
  jobTypeNewExistingClick = () => {
    this.props.getInputFields()
    this.props.getDefaultValues()
   let newJobName = this.refs.jobName.state.value
   let existingJobName = this.refs.selectedJob.selectInput.value
   if(newJobName) {
      this.props.newJobName(newJobName)
   } else if (existingJobName) {
      this.props.existingJobName(existingJobName)
   } else {
     alert('Oops, something bad happened. Please try again.')
   }
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
            <h5 className="center-align job-name-title">Job Select:</h5>
            {this.props.jobs ?
              <Row className="job-new-existing-row">
                <div className=" col s1 m1 l1"></div>
                <Input className="job-list" ref="selectedJob" s={5} type='select' label="Previous Jobs">
                  {this.props.jobs.reverse().map(x => <option key={x.id} className="job-list-options">{x.name}</option>)}
                </Input>
                <Input ref="jobName" s={5} placeholder="New Job Name" validate/>
                <div className=" col s1 m1 l1"></div>
              </Row>
              :
              <Row>
                <div className=" col s3 m3 l3"></div>
                <Input ref="jobName" s={6} placeholder="New Job Name" validate/>
                <div className="col s3 m3 l3"></div>
              </Row>
            }

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
