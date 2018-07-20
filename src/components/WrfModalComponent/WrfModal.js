import React, {Component} from 'react'
import './WrfModal.css'

class Wrf extends Component {

  // OPENS/CLOSES THE WRF MODAL
  wrfModal = () => {
    this.props.wrfModal()
  }

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

  // WRF TERTIARY_HEADING SELECT
  wrfTertBtnClick = (e) => {
    let tertBtnId = e.target.id
    this.props.wrfTertBtnClick(tertBtnId)
  }

  makeHeadings = () => {
    // MAIN HEADING
    const filteredHeads = this.props.allHeadings.map(
      x => !x.tertiary_heading || x.tertiary_heading
      ? {
        heading: x.heading
      }
      : x).filter(x => x.heading)
    const head = [...new Set(filteredHeads.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    let noSubHeadNoDupsArray = []
    const noSubHead = this.props.allHeadings.filter(x => x.heading && x.subheading === '')
    const noSubHeadNoDups = [...new Set(noSubHead.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    noSubHeadNoDups.map(z => noSubHeadNoDupsArray.push(z.heading))

    // SECONDARY
    const filteredInputs = this.props.allHeadings.map(
      x => !x.tertiary_heading || x.tertiary_heading
      ? {
        heading: x.heading,
        subheading: x.subheading
      }
      : x).map(
      x => !x.subheading
      ? {
        heading: x.heading
      }
      : x).filter(x => x.heading)
    const haveTert = this.props.allHeadings.filter(x => x.heading && x.subheading && x.tertiary_heading)
    let haveTertArray = []
    haveTert.map(
      x => !haveTertArray.includes(x.subheading)
      ? haveTertArray.push(x.subheading)
      : null)
    const headSubHead = [...new Set(filteredInputs.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    let noTertHeadNoDupsArray = []
    const noTertHead = this.props.allHeadings.filter(x => x.heading && x.subheading && x.tertiary_heading === '')
    const noTertHeadNoDups = [...new Set(noTertHead.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    noTertHeadNoDups.map(z => noTertHeadNoDupsArray.push(z.subheading))

    // TERTIARY
    const filteredTertiary = this.props.allHeadings.map(
      x => !x.tertiary_heading
      ? {
        heading: x.heading,
        subheading: x.subheading
      }
      : x).map(
      x => !x.subheading
      ? {
        heading: x.heading
      }
      : x).filter(x => x.heading)
    const headSubHeadTertiary = [...new Set(filteredTertiary.map(x => JSON.stringify(x)))].map(y => JSON.parse(y))
    const hasTert = headSubHeadTertiary.filter(x => x.tertiary_heading !== undefined)

    return head.map(x => <div key={head.indexOf(x)}>
      <div key={head.indexOf(x)} id={head.indexOf(x)} className={`wrf-btn
        ${this.props.headers[head.indexOf(x)][x.heading] &&
          noSubHeadNoDupsArray.includes(x.heading)
          ? 'wrf-btn-selected no-subhead'
            : (noSubHeadNoDupsArray.includes(x.heading))
              ? 'no-subhead'
              : (this.props.headers[head.indexOf(x)][x.heading])
            ? 'wrf-btn-selected'
          :''}`} onClick={this.wrfBtnClick}>
        {this.props.headers[head.indexOf(x)][x.heading] && !noSubHeadNoDupsArray.includes(x.heading)
            ? <i className="material-icons file-arrow">keyboard_arrow_down</i>
            : null}
        {!this.props.headers[head.indexOf(x)][x.heading] && !noSubHeadNoDupsArray.includes(x.heading)
            ? <i className="material-icons file-arrow">keyboard_arrow_right</i>
            : null}
        {x.heading}
      </div>
      <div>
        {headSubHead.map(
            (y) => y.heading === x.heading && headSubHead[headSubHead.indexOf(y)].subheading !== undefined
            ? <div key={headSubHead.indexOf(y)}>
              <div key={headSubHead.indexOf(y)} id={headSubHead.indexOf(y)} className={`wrf-sub-btn
                    ${this.props.subHeaders[headSubHead.filter(x => x.subheading).indexOf(y)][y.subheading] &&
                      this.props.headers[head.indexOf(x)][y.heading] &&
                      !haveTertArray.includes(y.subheading)
                  ? 'wrf-btn-selected no-terthead'
                  : (this.props.headers[head.indexOf(x)][y.heading] &&
                    !haveTertArray.includes(y.subheading))
                    ? 'no-terthead'
                      : (this.props.subHeaders[headSubHead.filter(x => x.subheading).indexOf(y)][y.subheading] &&
                        this.props.headers[head.indexOf(x)][y.heading])
                      ? 'wrf-btn-selected'
                      : (this.props.headers[head.indexOf(x)][y.heading])
                      ? ''
                    : 'hide'}`} onClick={this.wrfSubBtnClick}>
                {this.props.subHeaders[headSubHead.filter(x => x.subheading).indexOf(y)][y.subheading] === true && haveTertArray.includes(y.subheading)
                    ? <i className="material-icons file-arrow">keyboard_arrow_down</i>
                    : null}
                {!this.props.subHeaders[headSubHead.filter(x => x.subheading).indexOf(y)][y.subheading] && haveTertArray.includes(y.subheading)
                    ? <i className="material-icons file-arrow">keyboard_arrow_right</i>
                    : null}
                {y.subheading}
              </div>
              <div>
                {hasTert.map(
                    (z) => z.subheading === y.subheading
                    ? <div key={hasTert.indexOf(z)} id={hasTert.indexOf(z)} className={`wrf-tert-btn
                      ${this.props.tertHeaders[headSubHeadTertiary.filter(x => x.tertiary_heading).indexOf(z)][z.tertiary_heading] &&
                        this.props.subHeaders[headSubHead.indexOf(y)][z.subheading]
                    ? 'wrf-btn-selected'
                    : (
                        this.props.subHeaders[headSubHead.indexOf(y)][z.subheading]
                      ? ''
                      : 'hide')}`} onClick={this.wrfTertBtnClick}>
                      {z.tertiary_heading}
                    </div>
                    : null)}
              </div>
            </div>
            : null)}
      </div>
    </div>)
  }

  // CHECKS IF HEADER HAS A SUBHEADER
  hasSubHeader = () => {
    let headSelected = this.props.headers.map(x => Object.values(x)[0] === true ? headSelected=Object.keys(x)[0] : '' ).filter(x => x.length > 0)[0]
    if(this.props.allHeadings.filter(x =>
      x.heading === headSelected).filter(x =>
        x.subheading.length > 0).length > 0) {
        return true
      } else {
        return false
      }
  }

  // CHECKS IF SUBHEADER HAS A TERTIARY HEADER
  hasTertHeader = () => {
    let headSelected = this.props.headers.map(x => Object.values(x)[0] === true ? headSelected=Object.keys(x)[0] : '' ).filter(x => x.length > 0)[0]
    let subHeadSelected = this.props.subHeaders.map(x => Object.values(x)[0] === true ? subHeadSelected=Object.keys(x)[0] : '' ).filter(x => x.length > 0)[0]
    if(this.props.allHeadings.filter(x => x.heading === headSelected &&
        x.subheading === subHeadSelected &&
        x.tertiary_heading.length > 0).length > 0) {
        return true
      } else {
        return false
      }
  }

  // HIDES DEFAULT VALUE AND SHOWS INPUT FIELD ON HOVER EVENT
  namelistInputField = (x) => {
    this.props.namelistInputField(x)
  }

  // FILTERS NAME FIELDS THAT SHOULD BE DISPLAYED ON THE HEADER SELECT
  headerNameInputFields = () => {
    let headSelected = this.props.headers.map(x => Object.values(x)[0] === true ? headSelected=Object.keys(x)[0] : '' ).filter(x => x.length > 0)[0]
    if(headSelected && !this.hasSubHeader()) {
      return this.props.inputFields.filter(x =>
        x.heading === headSelected &&
        x.display === 1).map(x =>
          <div key={x.id} className="row namelist-row" onMouseEnter={() => { this.namelistInputField(x) }}>
            <div className="wrf-name-fields">{`${x.name} =`}</div>
            <div className="wrf-input-fields">
              {x.id === this.props.showNamelistInputField.id
                ? <div className="wheel-tool">
                    <div>
                      <button className="name-input-button waves-effect">
                        <i className="material-icons name-input-arrow">chevron_left</i>
                      </button>
                    </div>
                    <div className="wheel-scroll-container">
                      <div className="wheel-tool-container squares">
                        <div className="wheel-tool-options wheel-tool-option-1">1</div>
                        <div className="wheel-tool-options wheel-tool-option-2">2</div>
                        <div className="wheel-tool-options wheel-tool-option-3">3</div>
                        <div className="wheel-tool-options wheel-tool-option-3">3</div>
                      </div>
                    </div>
                    <div>
                      <button className="name-input-button waves-effect">
                        <i className="material-icons name-input-arrow">chevron_right</i>
                      </button>
                    </div>
                  </div>
                : <div className="default-name-value">0</div>
              }
            </div>
          </div>
        )
    } else {
      return this.subHeaderNameInputFields(headSelected)
    }
  }

  // FILTERS NAME FIELDS THAT SHOULD BE DISPLAYED ON THE SUBHEADER SELECT
  subHeaderNameInputFields = (headSelected) => {
    let subHeadSelected = this.props.subHeaders.map(x => Object.values(x)[0] === true ? subHeadSelected=Object.keys(x)[0] : '' ).filter(x => x.length > 0)[0]
    if(subHeadSelected && !this.hasTertHeader()) {
      return this.props.inputFields.filter(x =>
        x.subheading === subHeadSelected &&
        x.heading === headSelected &&
        x.display === 1).map(x =>
          <div key={x.id} className="row namelist-row" onMouseEnter={() => { this.namelistInputField(x) }}>
            <div key={x.id} className="wrf-name-fields">{`${x.name} =`}</div>
          </div>
          )
    } else {
      return this.tertHeaderNameInputFields(headSelected, subHeadSelected)
    }
  }

  // FILTERS NAME FIELDS THAT SHOULD BE DISPLAYED ON THE TERTIARY HEADER SELECT
  tertHeaderNameInputFields = (headSelected, subHeadSelected) => {
    let tertHeadSelected = this.props.tertHeaders.map(x => Object.values(x)[0] === true ? tertHeadSelected=Object.keys(x)[0] : '' ).filter(x => x.length > 0)[0]
    if(tertHeadSelected) {
      return this.props.inputFields.filter(x =>
        x.tertiary_heading === tertHeadSelected &&
        x.subheading === subHeadSelected &&
        x.heading === headSelected &&
        x.display === 1).map(x =>
          <div key={x.id} className="row namelist-row" onMouseEnter={() => { this.namelistInputField(x) }}>
            <div key={x.id} className="wrf-name-fields">{`${x.name} =`}</div>
          </div>
        )
    }
  }

  render() {
    return (<div>
      <div>
        <div className='wrf-modal modal open animated fadeIn'>
          <div className="modal-header row">
            <div className="col s4 m4 l4"></div>
            <div className="col s4 m4 l4">
              <h4 className="wrf-title">WRF</h4>
            </div>
            {/* WRF SEARCH FORM */}
            <div className="col s4 m4 l4">
              <div className="wrf-search">
                <div className="col s1 m1 l1"></div>
                <form className="col s6 m6 l6 wrf-search-form"
                  // onSubmit={this.onSubmit}
                >
                  <input className="search__input" placeholder="Search..." type="text"
                    // value={wrf-query}
                  />
                  <button type="submit" className="search-submit">
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
              </div>
              <div className="col s8 m8 l8 name-input-fields-container">
                {this.headerNameInputFields()}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div>
              <button className="btn toast modal-save-btn" onClick={this.savePhysics}>Save</button>
              <button className="btn modal-action modal-close modal-save-btn red darken-2" onClick={this.wrfModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-overlay"></div>
    </div>)
  }
}

export default Wrf
