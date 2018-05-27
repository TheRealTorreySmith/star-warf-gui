import React, { Component } from 'react'
import { Button, Input } from 'react-materialize'
import './NewJob.css'

class NewJob extends Component {
  createNewJobClick = () => {
    let newJobName = this.refs.jobName.state.value
    this.props.newJobName(newJobName)
  }

  // backButtonNewJobClick = () => {
  //   this.props.backButton()
  // }

  render() {
    return (
      <div className={`container ${this.props.cyclingNwpStandardNewJob ||
        this.props.cyclingNwpEnsembleNewJob ||
        this.props.forecastNewJob ||
        this.props.reanalysisNewJob ? '' : 'hide'}`}>
        <div className="row">
          <div className="col s2 m2 l2">
          </div>
          <div className="col s8 m8 l8 card job-type-container">
            <a className="btn-floating waves-effect waves-light left back-button" onClick={this.backButtonNewJobClick}><i className="material-icons">arrow_back</i></a>
            <h5 className="center-align">Job Type</h5>
            <div className="row">
              <div className="col s3 m3 l3">
              </div>
                <Input placeholder="Job Name" ref="jobName" s={6}/>
              <div className="center-align">
                <Button id="create-job-btn" onClick={this.createNewJobClick} waves='light'>CREATE</Button>
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

export default NewJob
