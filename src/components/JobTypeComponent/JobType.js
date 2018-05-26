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
      <div className={`container ${this.props.jobType ? 'hide' : 'none'}`}>
        <div className="row">
          <div className="col s2 m2 l2">
          </div>
          <div className="col s8 m8 l8 card job-type-container center-align">
            <h5>Job Type</h5>
            <div>
              <Button className="forecast-btn" onClick={this.jobTypeClick} name='forecast' waves='light'>Forecast</Button>
            </div>
            <div className="cyclingnwp-btn">
              <Button onClick={this.jobTypeClick} name='cycling-nwp' waves='light'>Cycling NWP</Button>
            </div>
            <div className="reanalysis-btn">
              <Button onClick={this.jobTypeClick} name='reanalysis' waves='light'>Reanalysis</Button>
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
