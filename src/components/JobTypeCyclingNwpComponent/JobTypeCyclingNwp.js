import React, { Component } from 'react'
import { Button } from 'react-materialize'
import './JobTypeCyclingNwp.css'

class JobTypeCyclingNwp extends Component {
  jobTypeCyclingNwpClick = (event) => {
    let cyclingNwpOption = event.target.name
    this.props.jobTypeCyclingNwp(cyclingNwpOption)
  }

backButtonClick = () => {
  this.props.backButton()
}

  render() {
    return (
      <div className={`container ${ this.props.jobType === 'cycling-nwp' &&
        !this.props.cyclingNwpStandard &&
        !this.props.cyclingNwpEnsemble ? '' : 'hide'}`}>
        <div className="row">
          <div className="col s2 m2 l2">
          </div>
          <div className="col s8 m8 l8 card job-type-container center-align">
            <a className="btn-floating waves-effect waves-light left back-button" onClick={this.backButtonClick}><i className="material-icons">arrow_back</i></a>
            <h5>Job Type</h5>
            <div>
              <Button className="standard-btn" onClick={this.jobTypeCyclingNwpClick} name='standard' waves='light'>Standard</Button>
            </div>
            <div className="ensemble-btn">
              <Button onClick={this.jobTypeCyclingNwpClick} name='ensemble' waves='light'>Ensemble</Button>
            </div>
          </div>
          <div className="col s2 m2 l2">
          </div>
        </div>
      </div>
    )
  }
}

export default JobTypeCyclingNwp
