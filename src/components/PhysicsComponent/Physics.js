import React, { Component } from 'react'
import { Button, Input } from 'react-materialize'
import './Physics.css'

class Physics extends Component {

  physicsModal = () => {
    this.props.physicsModal()
  }

  general = () => {
    this.props.physicsGeneral()
  }

  microphysics = () => {
    this.props.physicsMicrophysics()
  }

  radiation = () => {
    this.props.physicsRadiation()
  }

  landOcean = () => {
    this.props.physicsLandOcean()
  }

  boundaryLayer = () => {
    this.props.physicsBoundaryLayer()
  }

  cumulus = () => {
    this.props.physicsCumulus()
  }

  lightning = () => {
    this.props.physicsLightning()
  }

  ralwPhysics = (e) => {
    let value = e.target.value
    this.props.ralwPhysics(value)
  }

  raswPhysics = (e) => {
    let value = e.target.value
    this.props.raswPhysics(value)
  }

  render() {
    return (
      <div>
        <div>
          <div className="physics-modal modal open animated fadeIn">
            <div className="modal-header row">
              <div className="col s4 m4 l4"></div>
              <div className="col s4 m4 l4">
                <h4 className="physics-title">Physics</h4>
              </div>
              {/* PHYSICS SEARCH FORM */}
              <div className="col s4 m4 l4">
                <div className="physics-search">
                  <div className="col s1 m1 l1"></div>
            			<form className="col s6 m6 l6 physics-search-form"
            				// onSubmit={this.onSubmit}
                    >
            				<input className="search__input"
            					placeholder="Search..."
            					type="text"
            					// value={physics-query}
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
                <div className="col s3 m3 l3 physics-subheaders-container">
                  <Button className={`physics-general-btn ${this.props.physicsGeneralSelect ? 'physics-general-selected': ''}`} onClick={this.general}>General</Button>
                  <Button className={`physics-microphysics-btn ${this.props.physicsMicrophysicsSelect ? 'physics-microphysics-selected': ''}`} onClick={this.microphysics}>Microphysics</Button>
                  <Button className={`physics-radiation-btn ${this.props.physicsRadiationSelect ? 'physics-radiation-selected': ''}`} onClick={this.radiation}>Radiation</Button>
                  <Button className={`physics-land-ocean-btn ${this.props.physicsLandOceanSelect ? 'physics-land-ocean-selected': ''}`} onClick={this.landOcean}>Land/Ocean</Button>
                  <Button className={`physics-boundary-layer-btn ${this.props.physicsBoundaryLayerSelect ? 'physics-boundary-layer-selected': ''}`} onClick={this.boundaryLayer}>Boundary Layer</Button>
                  <Button className={`physics-cumulus-btn ${this.props.physicsCumulusSelect ? 'physics-cumulus-selected': ''}`} onClick={this.cumulus}>Cumulus</Button>
                  <Button className={`physics-lightning-btn ${this.props.physicsLightningSelect ? 'physics-lightning-selected': ''}`} onClick={this.lightning}>Lightning</Button>
                </div>
                <div className="col s9 m9 l9">
                  {this.props.physicsGeneralSelect ?
                    <div>
                      <h5 className="physics-suite-title">Physics Suite</h5>
                      <div className="row physics-suite-options">
                        <div className="col s2 m2 l2"></div>
                        <div className="col s8 m8 l8">
                          <Input name='group1' type='checkbox' value='green' label='None' className='filled-in' checked={false} />
                          <Input name='group1' type='checkbox' value='green' label='Tropical' className='filled-in' checked={false} />
                          <Input name='group1' type='checkbox' value='green' label='CONUS' className='filled-in' checked={false} />
                        </div>
                        <div className="col s2 m2 l2"></div>
                      </div>
                    </div>
                    : null}
                  {this.props.physicsMicrophysicsSelect ?
                    <div>
                      <h5 className="mp-physics-title">MP Physics</h5>
                      <div className="row mp-physics-options">
                        <div className="col s2 m2 l2"></div>
                        <div className="col s8 m8 l8">
                          <div id="mp-physics-range-slider" className="range-field mp-physics-range-slider">
                            <input type="range" id="mp-physics" min="0" max="98" onChange={this.mpPhysics} onInput={this.mpPhysics}/>
                          </div>
                        </div>
                        <div className="col s2 m2 l2"></div>
                      </div>
                    </div>
                    : null}
                  {this.props.physicsRadiationSelect ?
                    <div>
                      <h5 className="ra-lw-physics-title">RA LW Physics</h5>
                      <div className="row ra-lw-physics-options">
                        <div className="col s2 m2 l2"></div>
                        <div className="col s8 m8 l8 ra-lw-physics-numbers-container">
                          <Button className={`ra-lw-physics-numbers ${+this.props.ralwPhysicsSelect === 0 ? 'ra-lw-physics-select' : ''}`} onClick={this.ralwPhysics} value={0}>0</Button>
                          <Button className={`ra-lw-physics-numbers ${+this.props.ralwPhysicsSelect === 1 ? 'ra-lw-physics-select' : ''}`} onClick={this.ralwPhysics} value={1}>1</Button>
                          <Button className={`ra-lw-physics-numbers ${+this.props.ralwPhysicsSelect === 3 ? 'ra-lw-physics-select' : ''}`} onClick={this.ralwPhysics} value={3}>3</Button>
                          <Button className={`ra-lw-physics-numbers ${+this.props.ralwPhysicsSelect === 4 ? 'ra-lw-physics-select' : ''}`} onClick={this.ralwPhysics} value={4}>4</Button>
                          <Button className={`ra-lw-physics-numbers ${+this.props.ralwPhysicsSelect === 5 ? 'ra-lw-physics-select' : ''}`} onClick={this.ralwPhysics} value={5}>5</Button>
                          <Button className={`ra-lw-physics-numbers ${+this.props.ralwPhysicsSelect === 7 ? 'ra-lw-physics-select' : ''}`} onClick={this.ralwPhysics} value={7}>7</Button>
                          <Button className={`ra-lw-physics-numbers ${+this.props.ralwPhysicsSelect === 31 ? 'ra-lw-physics-select' : ''}`} onClick={this.ralwPhysics} value={31}>31</Button>
                        </div>
                        <div className="col s2 m2 l2"></div>
                      </div>
                      <h5 className="ra-sw-physics-title">RA SW Physics</h5>
                      <div className="row ra-sw-physics-options">
                        <div className="col s2 m2 l2"></div>
                        <div className="col s8 m8 l8 ra-sw-physics-numbers-container">
                          <Button className={`ra-sw-physics-numbers ${+this.props.raswPhysicsSelect === 0 ? 'ra-sw-physics-select' : ''}`} onClick={this.raswPhysics} value={0}>0</Button>
                          <Button className={`ra-sw-physics-numbers ${+this.props.raswPhysicsSelect === 1 ? 'ra-sw-physics-select' : ''}`} onClick={this.raswPhysics} value={1}>1</Button>
                          <Button className={`ra-sw-physics-numbers ${+this.props.raswPhysicsSelect === 2 ? 'ra-sw-physics-select' : ''}`} onClick={this.raswPhysics} value={2}>2</Button>
                          <Button className={`ra-sw-physics-numbers ${+this.props.raswPhysicsSelect === 3 ? 'ra-sw-physics-select' : ''}`} onClick={this.raswPhysics} value={3}>3</Button>
                          <Button className={`ra-sw-physics-numbers ${+this.props.raswPhysicsSelect === 4 ? 'ra-sw-physics-select' : ''}`} onClick={this.raswPhysics} value={4}>4</Button>
                          <Button className={`ra-sw-physics-numbers ${+this.props.raswPhysicsSelect === 5 ? 'ra-sw-physics-select' : ''}`} onClick={this.raswPhysics} value={5}>5</Button>
                          <Button className={`ra-sw-physics-numbers ${+this.props.raswPhysicsSelect === 7 ? 'ra-sw-physics-select' : ''}`} onClick={this.raswPhysics} value={7}>7</Button>
                        </div>
                        <div className="col s2 m2 l2"></div>
                      </div>
                      <h5 className="radt-title">RADT</h5>
                      <div className="row radt-options">
                        <div className="col s2 m2 l2"></div>
                        <div className="col s8 m8 l8 radt-container">
                          <div className="col s5 m5 l5 radt-value-container"></div>
                            <Input s={2} className="radt-value" defaultValue={0} />
                          <div className="col s5 m5 l5"></div>
                        </div>
                        <div className="col s2 m2 l2"></div>
                      </div>
                    </div>
                    : null}
                </div>
              </div>
            </div>
            <div className="modal-footer"><div>
                <button className="btn toast modal-save-btn" onClick={this.savePhysics}>Save</button>
                <button className="btn modal-action modal-close modal-save-btn red darken-2" onClick={this.physicsModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-overlay"></div>
     </div>
    )
  }
}

export default Physics
