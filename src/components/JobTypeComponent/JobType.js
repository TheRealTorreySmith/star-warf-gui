import React, { Component } from 'react'
import { Button } from 'react-materialize'
import './JobType.css'

class JobType extends Component {
  jobTypeClick = (event) => {
    let jobType = event.target.name
    this.props.jobTypeSelect(jobType)
  }
  render() {
    return (
      <div className={`animated fadeIn container ${this.props.jobType ? 'hide' : ''}`}>
        <div className="row">
          <div className="col s2 m2 l2">
          </div>
          <div className="col s8 m8 l8 card job-type-container center-align">
            <h5 className="jobtype-title">Job Type:</h5>
            <div className="cyclingnwp-btn">
              <Button onClick={this.jobTypeClick} name='cycling-nwp' className='cycling-nwp-button' waves='light'>Cycling NWP</Button>
            </div>
            <div className="reanalysis-btn">
              <Button onClick={this.jobTypeClick} name='reanalysis' className='job-status-button' waves='light'>Job Status</Button>
            </div>
          </div>
          <div className="col s2 m2 l2">
          </div>
        </div>
      </div>
    )
  }
}

export default JobType
