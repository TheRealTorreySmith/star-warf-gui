import React, { Component } from 'react'
// import { Button } from 'react-materialize'
import './WrfModal.css'

class Wrf extends Component {

  wrfModal = () => {
    this.props.wrfModal()
  }

  // TIME CONTROL ACTIONS
  // timeControl = () => {
  //   this.props.timeControl()
  // }
  //
  // timeControlGeneral = () => {
  //   this.props.timeControlGeneral()
  // }
  //
  // timeControlHistoryFiles = () => {
  //   this.props.timeControlHistoryFiles()
  // }
  //
  // timeControlHistoryIntervals = () => {
  //   this.props.timeControlHistoryIntervals()
  // }
  //
  // timeControlHistoryTime = () => {
  //   this.props.timeControlHistoryTime()
  // }

  // DOMAINS ACTIONS
  // domains = () => {
  //   this.props.domains()
  // }
  //
  // domainsGeneral = () => {
  //   this.props.domainsGeneral()
  // }
  //
  // domainsBasicTimeStep = () => {
  //     this.props.domainsBasicTimeStep()
  // }
  //
  // domainsAdaptiveTimeStep = () => {
  //     this.props.domainsAdaptiveTimeStep()
  // }
  //
  // domainsHorVertInterpolation = () => {
  //     this.props.domainsHorVertInterpolation()
  // }
  //
  // domainsThreeDOcean = () => {
  //     this.props.domainsThreeDOcean()
  // }

  // PHYSICS ACTIONS
  // physics = () => {
  //   this.props.physics()
  // }
  //
  // physicsGeneral = () => {
  //   this.props.physicsGeneral()
  // }
  //
  // microphysics = () => {
  //   this.props.physicsMicrophysics()
  // }
  //
  // radiation = () => {
  //   this.props.physicsRadiation()
  // }
  //
  // landOcean = () => {
  //   this.props.physicsLandOcean()
  // }
  //
  // boundaryLayer = () => {
  //   this.props.physicsBoundaryLayer()
  // }
  //
  // cumulus = () => {
  //   this.props.physicsCumulus()
  // }
  //
  // lightning = () => {
  //   this.props.physicsLightning()
  // }

  // STOCH ACTIONS
  // stoch = () => {
  //   this.props.stoch()
  // }
  //
  // stochGeneral = () => {
  //   this.props.stochGeneral()
  // }
  //
  // stochSppt = () => {
  //   this.props.stochSppt()
  // }
  //
  // stochSkebs = () => {
  //   this.props.stochSkebs()
  // }
  //
  // stochSpp = () => {
  //   this.props.stochSpp()
  // }

  // NOAH_MP ACTIONS

  // noahMp = () => {
  //   this.props.noahMp()
  // }

  // WRF HEADING SELECT
  wrfBtnClick = (e) => {
    let headBtnId = e.target.id
    this.props.wrfBtnClick(headBtnId)
  }

  // WRF SUBHEADING SELECT
  wrfSubBtnClick = (e) => {
    let subBtnId = e.target.id
    this.props.wrfSubBtnClick(subBtnId)
  }

  // WRF TERTHEADING SELECT
  wrfTertBtnClick = (e) => {
    let tertBtnId = e.target.id
    this.props.wrfTertBtnClick(tertBtnId)
  }

  makeHeadings = () => {

    // MAIN HEADING
    const filteredHeads = this.props.inputFields.map(x =>
      !x.tertiary_heading || x.tertiary_heading ? {heading: x.heading} : x
    ).filter(x =>
      x.heading
    )
    const head = [...new Set(filteredHeads.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    let noSubHeadNoDupsArray = []
    const noSubHead = this.props.inputFields.filter(x => x.heading && x.subheading === '')
    const noSubHeadNoDups = [...new Set(noSubHead.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    noSubHeadNoDups.map(z => noSubHeadNoDupsArray.push(z.heading))

    // SECONDARY
    const filteredInputs = this.props.inputFields.map(x =>
      !x.tertiary_heading || x.tertiary_heading ? {heading: x.heading, subheading: x.subheading} : x
    ).map(x =>
      !x.subheading ? {heading: x.heading} : x
    ).filter(x =>
      x.heading
    )
    const haveTert = this.props.inputFields.filter(x => x.heading && x.subheading && x.tertiary_heading)
    let haveTertArray = []
    haveTert.map(x => !haveTertArray.includes(x.subheading) ? haveTertArray.push(x.subheading) : null )
    const headSubHead = [...new Set(filteredInputs.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    let noTertHeadNoDupsArray = []
    const noTertHead = this.props.inputFields.filter(x => x.heading && x.subheading && x.tertiary_heading === '')
    const noTertHeadNoDups = [...new Set(noTertHead.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    noTertHeadNoDups.map(z => noTertHeadNoDupsArray.push(z.subheading))

    // TERTIARY
    const filteredTertiary = this.props.inputFields.map(x =>
      !x.tertiary_heading ? {heading: x.heading, subheading: x.subheading} : x
    ).map(x =>
      !x.subheading ? {heading: x.heading} : x
    ).filter(x =>
      x.heading
    )
    const headSubHeadTertiary = [...new Set(filteredTertiary.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    const hasTert = headSubHeadTertiary.filter(x => x.tertiary_heading !== undefined)

       return head.map(x =>
        <div key={head.indexOf(x)}>
          <div key={head.indexOf(x)} id={head.indexOf(x)} className={`wrf-btn ${this.props.wrfBtnSelect ? 'wrf-btn-selected': ''}`} onClick={this.wrfBtnClick}>
            {this.props.wrfBtnSelect && !noSubHeadNoDupsArray.includes(x.heading) ?
              <i className="material-icons file-arrow">keyboard_arrow_down</i>
              : null}
              {!this.props.wrfBtnSelect && !noSubHeadNoDupsArray.includes(x.heading) ?
                <i className="material-icons file-arrow">keyboard_arrow_right</i>
                : null}
              {x.heading}
          </div>
          <div>
            {headSubHead.map((y) => y.heading === x.heading &&
              headSubHead[headSubHead.indexOf(y)].subheading !== undefined  ?
              <div key={headSubHead.indexOf(y)}>
                <div key={headSubHead.indexOf(y)} id={headSubHead.indexOf(y)} className={`wrf-sub-btn ${this.props.wrfBtnSelect ? 'wrf-btn-selected': ''}`} onClick={this.wrfSubBtnClick}>
                  {!this.props.wrfBtnSelect && haveTertArray.includes(y.subheading) ?
                    <i className="material-icons file-arrow">keyboard_arrow_right</i>
                    : null}
                  {y.subheading}
                </div>
                <div>
                  {hasTert.map((z) => z.subheading === y.subheading ?
                    <div key={hasTert.indexOf(z)} id={hasTert.indexOf(z)} className={`wrf-tert-btn ${this.props.wrfBtnSelect ? 'wrf-btn-selected': ''}`} onClick={this.wrfTertBtnClick}>
                      {z.tertiary_heading}
                    </div>
                    : null
                  )}
                </div>
              </div>
              : null
            )}
          </div>
        </div>
      )
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
              <div className="row">
                <div className="col s4 m4 l4 wrf-headers-container">
                  {this.makeHeadings()}

                  {/* TIME CONTROL */}
                  {/* <Button className={`time-control-btn ${this.props.timeControlSelect ? 'time-control-selected': ''}`} onClick={this.timeControl}>
                    {this.props.timeControlSelect ? <i className="material-icons file-arrow">keyboard_arrow_down</i> : <i className="material-icons file-arrow">keyboard_arrow_right</i>}
                    {this.props.inputFields[45].heading}
                  </Button>
                  {this.props.timeControlSelect ?
                    <div>
                      <Button className={`time-control-general-btn ${this.props.timeControlGeneralSelect ? 'time-control-general-selected': ''}`} onClick={this.timeControlGeneral}>
                        {this.props.inputFields[45].subheading}
                      </Button>
                      <Button className={`time-control-history-files-btn ${this.props.timeControlHistoryFilesSelect ? 'time-control-history-files-selected': ''}`} onClick={this.timeControlHistoryFiles}>
                        {this.props.timeControlHistoryFilesSelect ? <i className="material-icons file-arrow">keyboard_arrow_down</i> : <i className="material-icons file-arrow">keyboard_arrow_right</i>}
                        {this.props.inputFields[67].subheading}
                      </Button>
                    </div>
                  :null}
                  {this.props.timeControlSelect && this.props.timeControlHistoryFilesSelect ?
                    <div>
                      <Button className={`time-control-history-files-intervals-btn ${this.props.timeControlHistoryIntervalsSelect ? 'time-control-history-intervals-selected': ''}`} onClick={this.timeControlHistoryIntervals}>
                        {this.props.inputFields[67].tertiary_heading}
                      </Button>
                      <Button className={`time-control-history-files-time-btn ${this.props.timeControlHistoryTimeSelect ? 'time-control-history-time-selected': ''}`} onClick={this.timeControlHistoryTime}>
                        {this.props.inputFields[72].tertiary_heading}
                      </Button>
                    </div>
                  :null} */}

                  {/* DOMAINS */}
                  {/* <Button className={`domains-btn ${this.props.domainsSelect ? 'domains-selected': ''}`} onClick={this.domains}>
                    {this.props.domainsSelect ? <i className="material-icons file-arrow">keyboard_arrow_down</i> : <i className="material-icons file-arrow">keyboard_arrow_right</i>}
                    {this.props.inputFields[95].heading}
                  </Button>
                  {this.props.domainsSelect ?
                    <div>
                      <Button className={`domains-general-btn ${this.props.domainsGeneralSelect ? 'domains-general-selected': ''}`} onClick={this.domainsGeneral}>
                        {this.props.inputFields[95].subheading}
                      </Button>
                      <Button className={`domains-basic-time-step-btn ${this.props.domainsBasicTimeStepSelect ? 'domains-basic-time-step-selected': ''}`} onClick={this.domainsBasicTimeStep}>
                        {this.props.inputFields[115].subheading}
                      </Button>
                      <Button className={`domains-adaptive-time-step-btn ${this.props.domainsAdaptiveTimeStepSelect ? 'domains-adaptive-time-step-selected': ''}`} onClick={this.domainsAdaptiveTimeStep}>
                        {this.props.inputFields[120].subheading}
                      </Button>
                      <Button className={`domains-hor-vert-interpolation-btn ${this.props.domainsHorVertInterpolationSelect ? 'domains-hor-vert-interpolation-selected': ''}`} onClick={this.domainsHorVertInterpolation}>
                        {this.props.inputFields[133].subheading}
                      </Button>
                      <Button className={`domains-three-d-ocean-btn ${this.props.domainsThreeDOceanSelect ? 'domains-three-d-ocean-selected': ''}`} onClick={this.domainsThreeDOcean}>
                        {this.props.inputFields[152].subheading}
                      </Button>
                    </div>
                  :null} */}

                  {/* PHYSICS */}
                  {/* <Button className={`physics-btn ${this.props.physicsSelect ? 'physics-selected': ''}`} onClick={this.physics}>
                    {this.props.physicsSelect ? <i className="material-icons file-arrow">keyboard_arrow_down</i> : <i className="material-icons file-arrow">keyboard_arrow_right</i>}
                    {this.props.inputFields[157].heading}
                  </Button>
                  {this.props.physicsSelect ?
                    <div>
                      <Button className={`physics-general-btn ${this.props.physicsGeneralSelect ? 'physics-general-selected': ''}`} onClick={this.physicsGeneral}>
                        {this.props.inputFields[157].subheading}
                      </Button>
                      <Button className={`physics-microphysics-btn ${this.props.physicsMicrophysicsSelect ? 'physics-microphysics-selected': ''}`} onClick={this.microphysics}>
                        {this.props.inputFields[158].subheading}
                      </Button>
                      <Button className={`physics-radiation-btn ${this.props.physicsRadiationSelect ? 'physics-radiation-selected': ''}`} onClick={this.radiation}>
                        {this.props.inputFields[181].subheading}
                      </Button>
                      <Button className={`physics-land-ocean-btn ${this.props.physicsLandOceanSelect ? 'physics-land-ocean-selected': ''}`} onClick={this.landOcean}>
                        {this.props.inputFields[202].subheading}
                      </Button>
                      <Button className={`physics-boundary-layer-btn ${this.props.physicsBoundaryLayerSelect ? 'physics-boundary-layer-selected': ''}`} onClick={this.boundaryLayer}>
                        {this.props.inputFields[247].subheading}
                      </Button>
                      <Button className={`physics-cumulus-btn ${this.props.physicsCumulusSelect ? 'physics-cumulus-selected': ''}`} onClick={this.cumulus}>
                        {this.props.inputFields[270].subheading}
                      </Button>
                      <Button className={`physics-lightning-btn ${this.props.physicsLightningSelect ? 'physics-lightning-selected': ''}`} onClick={this.lightning}>
                        {this.props.inputFields[294].subheading}
                      </Button>
                    </div>
                  :null} */}

                  {/* STOCH */}
                  {/* <Button className={`stoch-btn ${this.props.stochSelect ? 'stoch-selected': ''}`} onClick={this.stoch}>
                    {this.props.stochSelect ? <i className="material-icons file-arrow">keyboard_arrow_down</i> : <i className="material-icons file-arrow">keyboard_arrow_right</i>}
                    {this.props.inputFields[303].heading}
                  </Button>
                  {this.props.stochSelect ?
                    <div>
                      <Button className={`stoch-general-btn ${this.props.stochGeneralSelect ? 'stoch-general-selected': ''}`} onClick={this.stochGeneral}>
                        {this.props.inputFields[303].subheading}
                      </Button>
                      <Button className={`stoch-sppt-btn ${this.props.stochSpptSelect ? 'stoch-sppt-selected': ''}`} onClick={this.stochSppt}>
                        {this.props.inputFields[311].subheading}
                      </Button>
                      <Button className={`stoch-skebs-btn ${this.props.stochSkebsSelect ? 'stoch-skebs-selected': ''}`} onClick={this.stochSkebs}>
                        {this.props.inputFields[318].subheading}
                      </Button>
                      <Button className={`stoch-spp-btn ${this.props.stochSppSelect ? 'stoch-spp-selected': ''}`} onClick={this.stochSpp}>
                        {this.props.inputFields[337].subheading}
                      </Button>
                    </div>
                  :null} */}

                  {/* NOAH_MP */}
                  {/* <Button className={`noah-mp-btn ${this.props.noahMpSelect ? 'noah-mp-selected': ''}`} onClick={this.noahMp}>
                    {this.props.inputFields[358].heading}
                  </Button>
                  {this.props.noahMpSelect ?
                    <div>

                    </div>
                  :null} */}
                  {/* FDDA */}
                  {/* <Button className={`fdda-btn ${this.props.fddaSelect ? 'fdda-selected': ''}`} onClick={this.fdda}>
                    {this.props.inputFields[372].heading}
                  </Button> */}

                  {/* DYNAMICS */}
                  {/* <Button className={`dynamics-btn ${this.props.dynamicsSelect ? 'dynamics-selected': ''}`} onClick={this.dynamics}>
                    dynamics
                  </Button> */}

                  {/* BDY_CONTROL */}
                  {/* <Button className={`bdy-control-btn ${this.props.bdyControlSelect ? 'bdy-control-selected': ''}`} onClick={this.bdyControl}>
                    bdy_control
                  </Button> */}

                  {/* NAMELIST_QUILT */}
                  {/* <Button className={`namelist-quilt-btn ${this.props.namelistQuiltSelect ? 'namelist-quilt-selected': ''}`} onClick={this.namelistQuilt}>
                    namelist_quilt
                  </Button> */}

                  {/* DFI_CONTROL */}
                  {/* <Button className={`dfi-control-btn ${this.props.dfiControlSelect ? 'dfi-control-selected': ''}`} onClick={this.dfiControl}>
                    dfi_control
                  </Button> */}

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
