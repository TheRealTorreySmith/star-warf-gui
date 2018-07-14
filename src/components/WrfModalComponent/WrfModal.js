import React, { Component } from 'react'
import { Button } from 'react-materialize'
import './WrfModal.css'

class Wrf extends Component {

  wrfModal = () => {
    this.props.wrfModal()
  }

  timeControl = () => {
    this.props.timeControl()
  }

  timeControlGeneral = () => {
    this.props.timeControlGeneral()
  }

  timeControlHistoryFiles = () => {
    this.props.timeControlHistoryFiles()
  }

  timeControlHistoryIntervals = () => {
    this.props.timeControlHistoryIntervals()
  }

  timeControlHistoryTime = () => {
    this.props.timeControlHistoryTime()
  }

  domains = () => {
    this.props.domains()
  }

  domainsGeneral = () => {
    this.props.domainsGeneral()
  }

  physics = () => {
    this.props.physics()
  }

  render() {
    return (
      <div>
        <div>
          <div className='wrf-modal modal open animated fadeIn'>
            <div className="modal-header row">
              <div className="col s4 m4 l4"></div>
              <div className="col s4 m4 l4">
                <h4 className="wrf-title">WRF</h4>
              </div>
              {/* PHYSICS SEARCH FORM */}
              <div className="col s4 m4 l4">
                <div className="wrf-search">
                  <div className="col s1 m1 l1"></div>
                  <form className="col s6 m6 l6 wrf-search-form"
                    // onSubmit={this.onSubmit}
                    >
                    <input className="search__input"
                      placeholder="Search..."
                      type="text"
                      // value={wrf-query}
                    />
                    <button type="submit"
                      className="search-submit">
                      <i className="material-icons map-modal-search-icon">search</i>
                    </button>
                  </form>
                </div>
              </div>

            </div>
            <div className="modal-content">
              {console.log(this.props.inputFields)}
              <div className="row">
                <div className="col s4 m4 l4 wrf-subheaders-container">
                  <Button className={`time-control-btn ${this.props.timeControlSelect ? 'time-control-selected': ''}`} onClick={this.timeControl}>{this.props.inputFields[45].heading}</Button>
                  {this.props.timeControlSelect ?
                    <div>
                      <Button className={`time-control-general-btn ${this.props.timeControlGeneralSelect ? 'time-control-general-selected': ''}`} onClick={this.timeControlGeneral}>general</Button>
                      <Button className={`time-control-history-files-btn ${this.props.timeControlHistoryFilesSelect ? 'time-control-history-files-selected': ''}`} onClick={this.timeControlHistoryFiles}>history files</Button>
                    </div>
                  :null}
                  {this.props.timeControlSelect && this.props.timeControlHistoryFilesSelect ?
                    <div>
                      <Button className={`time-control-history-files-intervals-btn ${this.props.timeControlHistoryIntervalsSelect ? 'time-control-history-intervals-selected': ''}`} onClick={this.timeControlHistoryIntervals}>time intervals</Button>
                      <Button className={`time-control-history-files-time-btn ${this.props.timeControlHistoryTimeSelect ? 'time-control-history-time-selected': ''}`} onClick={this.timeControlHistoryTime}>start stop times</Button>
                    </div>
                  :null}
                  <Button className={`domains-btn ${this.props.domainsSelect ? 'domains-selected': ''}`} onClick={this.domains}>domains</Button>
                  {this.props.domainsSelect ?
                    <Button className={`domains-general-btn ${this.props.domainsGeneralSelect ? 'domains-general-selected': ''}`} onClick={this.domainsGeneral}>general</Button>
                  :null}
                  <Button className={`physics-btn ${this.props.physicsSelect ? 'physics-selected': ''}`} onClick={this.physics}>physics</Button>
                  <Button className={`stoch-btn ${this.props.stochSelect ? 'stoch-selected': ''}`} onClick={this.stoch}>stoch</Button>
                  <Button className={`noah-mp-btn ${this.props.noahMpSelect ? 'noah-mp-selected': ''}`} onClick={this.noahMp}>noah_mp</Button>
                  <Button className={`fdda-btn ${this.props.fddaSelect ? 'fdda-selected': ''}`} onClick={this.fdda}>fdda</Button>
                  <Button className={`dynamics-btn ${this.props.dynamicsSelect ? 'dynamics-selected': ''}`} onClick={this.dynamics}>dynamics</Button>
                  <Button className={`bdy-control-btn ${this.props.bdyControlSelect ? 'bdy-control-selected': ''}`} onClick={this.bdyControl}>bdy_control</Button>
                  <Button className={`namelist-quilt-btn ${this.props.namelistQuiltSelect ? 'namelist-quilt-selected': ''}`} onClick={this.namelistQuilt}>namelist_quilt</Button>
                  <Button className={`dfi-control-btn ${this.props.dfiControlSelect ? 'dfi-control-selected': ''}`} onClick={this.dfiControl}>dfi_control</Button>
                </div>
                <div className="col s8 m8 l8">
                </div>
              </div>
            </div>
            <div className="modal-footer"><div>
                <button className="btn toast modal-save-btn" onClick={this.savePhysics}>Save</button>
                <button className="btn modal-action modal-close modal-save-btn red darken-2" onClick={this.wrfModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-overlay"></div>
     </div>
    )
  }
}

export default Wrf
