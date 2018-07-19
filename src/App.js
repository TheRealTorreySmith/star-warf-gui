import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Header from './components/HeaderComponent/Header.js'
import Login from './components/LoginComponent/Login.js'
import JobType from './components/JobTypeComponent/JobType.js'
import JobTypeNewExisting from './components/JobTypeNewExistingComponent/JobTypeNewExisting.js'
import Dashboard from './components/DashboardComponent/Dashboard.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // LOGIN STATE
      jobType: '',
      currentUser: undefined,
      jobs: [
        {id: 1, name: 'Jan17,2018'},
        {id: 2, name: 'Feb3,2018'},
        {id: 3, name: 'Mar7,2018'},
        {id: 4, name: 'AFTAC test job'},
        {id: 5, name: 'Apr12,2018'},
        {id: 6, name: 'Jun21,2018'},
        {id: 7, name: 'Galvanize Presentation'}
        ],
      currentJob: undefined,
      // headings: null,
      // subHeadings: null,
      // tertiaryHeadings: null,
      allHeadings: null,
      inputFields: null,
      defaultValues: null,
      isLoggedIn: true,
      // DASHBOARD STATE
      // NWP STATE
      showNwp: true,
      nwpFlipped: false,
      // WPS STATE
      showWps: false,
      wpsFlipped: false,
      boundaryConditionsFlipped: false,
      threeDvar: false,
      threeDensvar: false,
      fourDensvar: false,
      coldStartWrf: false,
      hourFrequency: 3,
      yearFrequency: 0,
      dayFrequency: 0,
      minuteFrequency: 0,
      secondFrequency: 0,
      continueToWps: false,
      // SUMMARY STATE
      mapSaved: false,
      wpsTypeSaved: false,
      gsi: false,
      wrfda: false,
      gfsSelect: false,
      hrrrSelect: false,
      namSelect: false,
      runMainJob: false,
      // CALENDAR STATE
      date:Date.now(),
      selectionStart: 0,
      selectionEnd: 0,
      // MAP STATE
      lat: 20.9635945,
      lng: -105.14556859999999,
      zoom: 0,
      showMapModal: false,
      coords: [],
      latCoords: [],
      lngCoords: [],
      mapColors: ['black','red', 'green', 'purple', 'orange', 'blue', 'cyanne', 'turqoise', 'grey', 'pink', 'yellow'],
      northWest: {},
      northEast: {},
      southEast: {},
      southWest: {},
      // WRF STATE
      showWrf: false,
      wrfFlipped: false,
      headers: [],
      headingsArray: [],
      subHeaders: [],
      subHeadersArray: [],
      tertiaryHeaders: [],
      // DA STATE
      showDa: false,
      daFlipped: false,
      // TIME_CONTROL STATE
      // timeControl: false,
      // timeControlGeneral: false,
      // timeControlHistoryFiles: false,
      // timeControlHistoryIntervals: false,
      // timeControlHistoryTime: false,
      // DOMAINS STATE
      // domains: false,
      // domainsGeneral: false,
      // domainsBasicTimeStep: false,
      // domainsAdaptiveTimeStep: false,
      // domainsHorVertInterpolation: false,
      // domainsThreeDOcean: false,
      // PHYSICS STATE
      // physics: false,
      // physicsGeneral: false,
      // physicsMicrophysics: false,
      // physicsRadiation: false,
      // physicsLandOcean: false,
      // physicsBoundaryLayer: false,
      // physicsCumulus: false,
      // physicsLightning: false,
      // STOCH STATE
      // stoch: false,
      // stochGeneral: false,
      // stochSppt: false,
      // stochSkebs: false,
      // stochSpp: false,
      // NOAH_MP STATE
      // noahMp: false
    }
  }

  // HOLDS THE SESSION IN STORAGE
  componentWillMount = () => {
    let id = this.state.jobs.length + 1
    if(sessionStorage.getItem('username') && sessionStorage.getItem('currentJob')) {
      let username = sessionStorage.getItem('username')
      let currentJob = sessionStorage.getItem('currentJob')
      this.setState({
        ...this.state,
        currentUser: username,
        jobs: [
        {
          id: id,
          name: currentJob
        },
        ...this.state.jobs],
        currentJob: {id: id, name: currentJob}
      })
      document.title = currentJob
    } else if (sessionStorage.getItem('username')){
      let username = sessionStorage.getItem('username')
      this.setState({
        currentUser: username
      })
    }
  }

  // USERNAME STATE HANDLER
  setCurrentUser = (username, password) => {
    sessionStorage.setItem('username', username)
    this.setState({
      currentUser: username
    })
  }

  jobTypeSelect = (jobType) => {
    this.setState({
      jobType: jobType
    })
  }

  // BACK BUTTON STATE HANDLER
  backButton = () => {
    this.state.cyclingNwpStandard ||
    this.state.cyclingNwpEnsemble ?
    this.setState({
      cyclingNwpStandard: false,
      cyclingNwpEnsemble: false
    }) :
    this.setState({
      jobType: '',
      jobs: []
    })
  }

  // NEW JOB NAME STATE HANDLER
  newJobName = (newJobName) => {
    document.title = newJobName
    sessionStorage.setItem('currentJob', newJobName)
    let id = this.state.jobs.length + 1
    this.setState({
      ...this.state,
      jobs: [
      {
        id: id,
        name: newJobName
      },
      ...this.state.jobs],
      currentJob: {id: id, name: newJobName}
    })
  }

  // EXISTING JOB STATE HANDLER
  existingJobName = (existingJobName) => {
    document.title = existingJobName
    sessionStorage.setItem('currentJob', existingJobName)
    let job = this.state.jobs.filter(x => x.name === existingJobName)
    this.setState({
      currentJob: job[0]
    })
  }

  getAllHeadings = async () => {
    try {
      const res = await fetch('http://localhost:8080/inputFields/headings')
        const allHeadings = await res.json()
        const headingsArray = []
        const subHeadingsArray = []
        // const tertiaryHeadingsArray = []
        allHeadings.map(x => headingsArray.includes(x.heading) || x.heading === '' ? x : headingsArray.push(x.heading))
        const headers = Object.assign(headingsArray.map(d => ({[d]: false})))
        allHeadings.map(x => x.subheading === subHeadingsArray[subHeadingsArray.length-1] || x.subheading === '' ? x : subHeadingsArray.push(x.subheading))
        const subHeaders = Object.assign(subHeadingsArray.map(d => ({[d]: false})))
        // allHeadings.map(x => tertiaryHeadingsArray.includes(x.tertiary_heading) || x.tertiary_heading === '' ? x : tertiaryHeadingsArray.push(x.tertiary_heading))
        // const tertiaryHeaders = Object.assign({}, tertiaryHeadingsArray)
        this.setState({
          headers: headers,
          headingsArray: headingsArray,
          subHeaders: subHeaders,
          subHeadingsArray: subHeadingsArray,
          // tertiaryHeaders: tertiaryHeaders,
          allHeadings: allHeadings
        })
      }
      catch (err) {
        console.log(`AWWWW SHUCKS! ${err}`)
      }
    }

  // PULLS ALL INPUT FIELDS FROM THE DB
  getInputFields = async () => {
    try {
      const res = await fetch('http://localhost:8080/inputFields')
        const inputFields = await res.json()
        this.setState({
          inputFields: inputFields
        })
      }
      catch (err) {
        console.log(`AWWWW SHUCKS! ${err}`)
      }
    }

  // PULLS ALL DEFAULT VALUES FROM THE DB
  getDefaultValues = async () => {
    try {
      const res = await fetch('http://localhost:8080/defaultValues')
        const defaultValues = await res.json()
        this.setState({
          defaultValues: defaultValues
        })
      }
      catch (err) {
        console.log(`AWWWW SHUCKS! ${err}`)
      }
    }

  wrfBtnClick = (headBtnId) => {
    let headers = Object.assign(this.state.headingsArray.map(d =>
      d === this.state.headingsArray[headBtnId] &&
      this.state.headers[headBtnId][this.state.headingsArray[headBtnId]] === false ?
      ({[d]: true})
      : ({[d]: false})))
    this.setState({
      headers: headers
    })
    this.wrfSubBtnClick()
  }

  wrfSubBtnClick = (subBtnId) => {
    let subHeaders = Object.assign(this.state.subHeadingsArray.map(d =>
      d === this.state.subHeadingsArray[subBtnId] &&
      this.state.subHeaders[subBtnId][this.state.subHeadingsArray[subBtnId]] === false ?
      ({[d]: true})
      : ({[d]: false})))
    this.setState({
      subHeaders: subHeaders
    })
  }

  // FLIPS NWP CAROUSEL CARD
  nwpFlipFunc = () => {
    let flipStatus = this.state.nwpFlipped ? false : true
    this.setState({
      nwpFlipped: flipStatus
    })
  }

  // FLIPS WPS CAROUSEL CARD
  wpsFlipFunc = () => {
    let flipStatus = this.state.wpsFlipped ? false : true
    this.setState({
      wpsFlipped: flipStatus
    })
  }

  // FLIPS THE BOUNDARY CONDITIONS CARD ON THE WPS CARD
  boundaryConditionsFlipFunc = () => {
    let flipStatus = this.state.boundaryConditionsFlipped ? false : true
    this.setState({
      boundaryConditionsFlipped: flipStatus
    })
  }

  // FLIPS WRF CAROUSEL CARD
  wrfFlipFunc = () => {
    let flipStatus = this.state.wrfFlipped ? false : true
    this.setState({
      wrfFlipped: flipStatus
    })
  }

  // FLIPS DA CAROUSEL CARD
  daFlipFunc = () => {
    let flipStatus = this.state.daFlipped ? false : true
    this.setState({
      daFlipped: flipStatus
    })
  }

  // SWITCHES TO NWP CAROUSEL CARD
  nwpShowClick = () => {
    this.setState({
      showNwp: true,
      showWps: false,
      showWrf: false,
      showDa: false,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      daFlipped: false
    })
  }

  // SWITCHES TO WPS CAROUSEL CARD
  wpsShowClick = () => {
    this.setState({
      showNwp: false,
      showWps: true,
      showWrf: false,
      showDa: false,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      daFlipped: false
    })
  }

  // SWITCHES TO WRF CAROUSEL CARD
  wrfShowClick = () => {
    if(this.state.showWrf) {
      this.setState({
        showWrf: false
      })
    } else {
      this.setState({
        showNwp: false,
        showWps: false,
        showWrf: true,
        showDa: true,
        nwpFlipped: false,
        wpsFlipped: false,
        wrfFlipped: false,
        daFlipped: false
      })
    }
  }

  // SWITCHES TO DA CAROUSEL CARD
  daShowClick = () => {
    this.setState({
      showNwp: false,
      showWps: false,
      showWrf: false,
      showDa: true,
      nwpFlipped: false,
      wpsFlipped: false,
      wrfFlipped: false,
      daFlipped: false
    })
  }

  // RUNS THE MAIN JOB
  setMainJob = () => {
    this.state.runMainJob ?
    this.setState({
      runMainJob: false
    }) :
    this.setState({
      runMainJob: true
    })
  }

  // SETS 3DVAR AS SELECTED IN STATE
  threeDvarSelect = () => {
    this.state.threeDvar ?
    this.setState({
      threeDvar: false
    }) :
    this.setState({
      threeDvar: true,
      fourDensvar: false,
      threeDensvar: false,
      coldStartWrf: false
    })
  }

  // SETS 3DENSVAR AS SELECTED IN STATE
  threeDensvarSelect = () => {
    this.state.threeDensvar ?
    this.setState({
      threeDensvar: false
    }) :
    this.setState({
      threeDensvar: true,
      threeDvar: false,
      fourDensvar: false,
      coldStartWrf: false
    })
  }


  // SETS 4DENSVAR AS SELECTED IN STATE
  fourDensvarSelect = () => {
    this.state.fourDensvar ?
    this.setState({
      fourDensvar: false
    }) :
    this.setState({
      fourDensvar: true,
      threeDvar: false,
      threeDensvar: false,
      coldStartWrf: false
    })
  }

  // SETS COLD-START WRF AS SELECTED IN STATE
  coldStartWrfSelect = () => {
    this.state.coldStartWrf ?
    this.setState({
      coldStartWrf: false
    }) :
    this.setState({
      coldStartWrf: true,
      fourDensvar: false,
      threeDvar: false,
      threeDensvar: false
    })
  }


  // HOUR FREQUENCY RANGE-SLIDER
  hourFrequencyOnChange = (value) => {
    this.setState({
      hourFrequency: value
    })
  }

  // YEAR FREQUENCY RANGE-SLIDER
  yearFrequencyOnChange = (value) => {
    this.setState({
      yearFrequency: value
    })
  }

  // DAY FREQUENCY RANGE-SLIDER
  dayFrequencyOnChange = (value) => {
    this.setState({
      dayFrequency: value
    })
  }

  // MINUTE FREQUENCY RANGE-SLIDER
  minuteFrequencyOnChange = (value) => {
    this.setState({
      minuteFrequency: value
    })
  }

  // SECOND FREQUENCY RANGE-SLIDER
  secondFrequencyOnChange = (value) => {
    this.setState({
      secondFrequency: value
    })
  }

  // BUTTONS ARE ENABLED TO CONTINUE TO THE WPS CAROUSEL CARD
  continueToWpsOnChange = () => {
    let value = this.state.continueToWps ? false : true
    this.setState({
      continueToWps: value
    })
  }

  // CHANGES CALENDAR MONTH BACK
  prevMonth = (date) => {
      this.setState({
        date:date.getTime()
      })
  }

  // CHANGES CALENDAR MONTH FORWARD
  nextMonth = (date) => {
      this.setState({
        date:date.getTime()
      })
  }

 // SET CALENDAR DATE RANGE
  setRange = (selectionStart, selectionEnd) => {
      this.setState({
        selectionStart,
        selectionEnd
      })
  }

  // OPEN AND CLOSE THE MAP MODAL
  mapModal = () => {
    if(this.state.showMapModal) {
      this.setState({
        showMapModal: false
      })
    } else {
      this.setState({
        showMapModal: true
      })
    }
  }

  // SET DRAWN COORDINATES ON MAP
  drawCoords = (northWest, northEast, southEast, southWest) => {
    this.setState({
      northWest,
      northEast,
      southEast,
      southWest
    })
  }

  // SELECTS GFS TYPE
  gfsSelect = () => {
    if(this.state.gfsSelect) {
      this.setState({
        gfsSelect: false,
        wpsTypeSaved: false
      })
    } else {
      this.setState({
        gfsSelect: true,
        hrrrSelect: false,
        namSelect: false,
        wpsTypeSaved: true
      })
    }
  }

  // SELECTS HRRR TYPE
  hrrrSelect = () => {
    if(this.state.hrrrSelect) {
      this.setState({
        hrrrSelect: false,
        wpsTypeSaved: false
      })
    } else {
      this.setState({
        hrrrSelect: true,
        gfsSelect: false,
        namSelect: false,
        wpsTypeSaved: true
      })
    }
  }

  // SELECTS NAM TYPE
  namSelect = () => {
    if(this.state.namSelect) {
      this.setState({
        namSelect: false,
        wpsTypeSaved: false
      })
    } else {
      this.setState({
        hrrrSelect: false,
        gfsSelect: false,
        namSelect: true,
        wpsTypeSaved: true
      })
    }
  }

  // SAVES THE MAP TO THE SUMMARY
  saveMap = () => {
      this.setState({
        mapSaved: true
      })
  }

  // SELECTS WRFDA TYPE
  wrfdaSelect = () => {
    if(this.state.wrfda) {
      this.setState({
        wrfda: false
      })
    } else {
      this.setState({
        wrfda: true,
        gsi: false
      })
    }
  }

  // SELECTS GSI TYPE
  gsiSelect = () => {
    if(this.state.gsi) {
      this.setState({
        gsi: false
      })
    } else {
      this.setState({
        gsi: true,
        wrfda: false
      })
    }
  }

  // WRF TIME CONTROL SELECTED
  // timeControl = () => {
  //   if(this.state.timeControl) {
  //     this.setState({
  //       timeControl: false
  //     })
  //   } else {
  //     this.setState({
  //       timeControl: true,
  //       physics: false,
  //       domains: false,
  //       domainsGeneral: false,
  //       domainsBasicTimeStep: false,
  //       domainsHorVertInterpolation: false,
  //       domainsThreeDOcean: false,
  //       timeControlGeneral: false,
  //       timeControlHistoryFiles: false,
  //       timeControlHistoryIntervals: false,
  //       timeControlHistoryTime: false,
  //       physicsLightning: false,
  //       physicsCumulus: false,
  //       physicsBoundaryLayer: false,
  //       physicsLandOcean: false,
  //       physicsGeneral: false,
  //       physicsMicrophysics: false,
  //       physicsRadiation: false,
  //       stoch: false,
  //       noahMp: false
  //     })
  //   }
  // }

  // WRF TIME CONTROL GENERAL SELECTED
  // timeControlGeneral = () => {
  //   if(this.state.timeControlGeneral) {
  //     this.setState({
  //       timeControlGeneral: false
  //     })
  //   } else {
  //     this.setState({
  //       timeControlGeneral: true,
  //       timeControlHistoryFiles: false,
  //       timeControlHistoryIntervals: false,
  //       timeControlHistoryTime: false
  //     })
  //   }
  // }

  // WRF TIME CONTROL HISTORY FILES SELECTED
  // timeControlHistoryFiles = () => {
  //   if(this.state.timeControlHistoryFiles) {
  //     this.setState({
  //       timeControlHistoryFiles: false,
  //       timeControlHistoryIntervals: false,
  //       timeControlHistoryTime: false
  //     })
  //   } else {
  //     this.setState({
  //       timeControlHistoryFiles: true,
  //       timeControlGeneral: false
  //     })
  //   }
  // }

  // WRF TIME CONTROL HISTORY FILES INTERVALS SELECTED
  // timeControlHistoryIntervals = () => {
  //   if(this.state.timeControlHistoryIntervals) {
  //     this.setState({
  //       timeControlHistoryIntervals: false
  //     })
  //   } else {
  //     this.setState({
  //       timeControlHistoryIntervals: true,
  //       timeControlHistoryTime: false
  //     })
  //   }
  // }

  // WRF TIME CONTROL HISTORY FILES START STOP TIME SELECTED
  // timeControlHistoryTime = () => {
  //   if(this.state.timeControlHistoryTime) {
  //     this.setState({
  //       timeControlHistoryTime: false
  //     })
  //   } else {
  //     this.setState({
  //       timeControlHistoryTime: true,
  //       timeControlHistoryIntervals: false
  //     })
  //   }
  // }

  // WRF DOMAIN SELECTED
  // domains = () => {
  //   if(this.state.domains) {
  //     this.setState({
  //       domains: false,
  //       domainsGeneral: false,
  //       domainsBasicTimeStep: false,
  //       domainsHorVertInterpolation: false,
  //       domainsThreeDOcean: false
  //     })
  //   } else {
  //     this.setState({
  //       physics: false,
  //       domains: true,
  //       timeControl: false,
  //       physicsLightning: false,
  //       physicsCumulus: false,
  //       physicsBoundaryLayer: false,
  //       physicsLandOcean: false,
  //       physicsGeneral: false,
  //       physicsMicrophysics: false,
  //       physicsRadiation: false,
  //       stoch: false,
  //       noahMp: false
  //     })
  //   }
  // }

  // WRF DOMAINS GENERAL SELECTED
  // domainsGeneral = () => {
  //   if(this.state.domainsGeneral) {
  //     this.setState({
  //       domainsGeneral: false
  //     })
  //   } else {
  //     this.setState({
  //       domainsGeneral: true,
  //       domainsBasicTimeStep: false,
  //       domainsAdaptiveTimeStep: false,
  //       domainsHorVertInterpolation: false,
  //       domainsThreeDOcean: false
  //     })
  //   }
  // }

  // WRF DOMAINS BASIC TIME STEP SELECTED
  // domainsBasicTimeStep = () => {
  //   if(this.state.domainsBasicTimeStep) {
  //     this.setState({
  //       domainsBasicTimeStep: false
  //     })
  //   } else {
  //     this.setState({
  //       domainsBasicTimeStep: true,
  //       domainsGeneral: false,
  //       domainsAdaptiveTimeStep: false,
  //       domainsHorVertInterpolation: false,
  //       domainsThreeDOcean: false
  //     })
  //   }
  // }

  // WRF DOMAINS ADAPTIVE TIME STEP SELECTED
  // domainsAdaptiveTimeStep = () => {
  //   if(this.state.domainsAdaptiveTimeStep) {
  //     this.setState({
  //       domainsAdaptiveTimeStep: false
  //     })
  //   } else {
  //     this.setState({
  //       domainsAdaptiveTimeStep: true,
  //       domainsGeneral: false,
  //       domainsBasicTimeStep: false,
  //       domainsHorVertInterpolation: false,
  //       domainsThreeDOcean: false
  //     })
  //   }
  // }

  // WRF DOMAINS HORIZONTAL AND VERTICAL INTERPOLATION SELECTED
  // domainsHorVertInterpolation = () => {
  //   if(this.state.domainsHorVertInterpolation) {
  //     this.setState({
  //       domainsHorVertInterpolation: false
  //     })
  //   } else {
  //     this.setState({
  //       domainsHorVertInterpolation: true,
  //       domainsAdaptiveTimeStep: false,
  //       domainsGeneral: false,
  //       domainsBasicTimeStep: false,
  //       domainsThreeDOcean: false
  //     })
  //   }
  // }

  // WRF DOMAINS 3D OCEAN MODEL SELECTED
  // domainsThreeDOcean = () => {
  //   if(this.state.domainsThreeDOcean) {
  //     this.setState({
  //       domainsThreeDOcean: false
  //     })
  //   } else {
  //     this.setState({
  //       domainsThreeDOcean: true,
  //       domainsHorVertInterpolation: false,
  //       domainsAdaptiveTimeStep: false,
  //       domainsGeneral: false,
  //       domainsBasicTimeStep: false
  //     })
  //   }
  // }

  // WRF PHYSICS SELECTED
  // physics = () => {
  //   if(this.state.physics) {
  //     this.setState({
  //       physics: false,
  //       physicsGeneral: false,
  //       physicsMicrophysics: false,
  //       physicsRadiation: false,
  //       physicsLandOcean: false,
  //       physicsBoundaryLayer: false,
  //       physicsCumulus: false,
  //       physicsLightning: false
  //     })
  //   } else {
  //     this.setState({
  //       physics: true,
  //       domains: false,
  //       timeControl: false,
  //       domainsGeneral: false,
  //       domainsBasicTimeStep: false,
  //       domainsHorVertInterpolation: false,
  //       domainsThreeDOcean: false,
  //       stoch: false,
  //       noahMp: false
  //     })
  //   }
  // }

  // WRF PHYSICS GENERAL SELECTED
  // general = () => {
  //   if(this.state.physicsGeneral) {
  //     this.setState({
  //       physicsGeneral: false
  //     })
  //   } else {
  //     this.setState({
  //       physicsGeneral: true,
  //       physicsMicrophysics: false,
  //       physicsRadiation: false,
  //       physicsLandOcean: false,
  //       physicsBoundaryLayer: false,
  //       physicsCumulus: false,
  //       physicsLightning: false
  //     })
  //   }
  // }

  // WRF PHYSICS MICROPHYSICS SELECTED
  // physicsMicrophysics = () => {
  //   if(this.state.physicsMicrophysics) {
  //     this.setState({
  //       physicsMicrophysics: false
  //     })
  //   } else {
  //     this.setState({
  //       physicsMicrophysics: true,
  //       physicsGeneral: false,
  //       physicsRadiation: false,
  //       physicsLandOcean: false,
  //       physicsBoundaryLayer: false,
  //       physicsCumulus: false,
  //       physicsLightning: false
  //     })
  //   }
  // }

  // WRF PHYSICS RADIATION SELECTED
  // physicsRadiation = () => {
  //   if(this.state.physicsRadiation) {
  //     this.setState({
  //       physicsRadiation: false
  //     })
  //   } else {
  //     this.setState({
  //       physicsRadiation: true,
  //       physicsGeneral: false,
  //       physicsMicrophysics: false,
  //       physicsLandOcean: false,
  //       physicsBoundaryLayer: false,
  //       physicsCumulus: false,
  //       physicsLightning: false
  //     })
  //   }
  // }

  // WRF PHYSICS LAND/OCEAN SELECTED
  // physicsLandOcean = () => {
  //   if(this.state.physicsLandOcean) {
  //     this.setState({
  //       physicsLandOcean: false
  //     })
  //   } else {
  //     this.setState({
  //       physicsLandOcean: true,
  //       physicsGeneral: false,
  //       physicsMicrophysics: false,
  //       physicsRadiation: false,
  //       physicsBoundaryLayer: false,
  //       physicsCumulus: false,
  //       physicsLightning: false
  //     })
  //   }
  // }

  // WRF PHYSICS BOUNDARY LAYER SELECTED
  // physicsBoundaryLayer = () => {
  //   if(this.state.physicsBoundaryLayer) {
  //     this.setState({
  //       physicsBoundaryLayer: false
  //     })
  //   } else {
  //     this.setState({
  //       physicsBoundaryLayer: true,
  //       physicsLandOcean: false,
  //       physicsGeneral: false,
  //       physicsMicrophysics: false,
  //       physicsRadiation: false,
  //       physicsCumulus: false,
  //       physicsLightning: false
  //     })
  //   }
  // }

  // WRF PHYSICS CUMULUS SELECTED
  // physicsCumulus = () => {
  //   if(this.state.physicsCumulus) {
  //     this.setState({
  //       physicsCumulus: false
  //     })
  //   } else {
  //     this.setState({
  //       physicsCumulus: true,
  //       physicsBoundaryLayer: false,
  //       physicsLandOcean: false,
  //       physicsGeneral: false,
  //       physicsMicrophysics: false,
  //       physicsRadiation: false,
  //       physicsLightning: false
  //     })
  //   }
  // }

  // WRF PHYSICS LIGHTNING SELECTED
  // physicsLightning = () => {
  //   if(this.state.physicsLightning) {
  //     this.setState({
  //       physicsLightning: false
  //     })
  //   } else {
  //     this.setState({
  //       physicsLightning: true,
  //       physicsCumulus: false,
  //       physicsBoundaryLayer: false,
  //       physicsLandOcean: false,
  //       physicsGeneral: false,
  //       physicsMicrophysics: false,
  //       physicsRadiation: false,
  //     })
  //   }
  // }

  // WRF STOCH SELECT
  // stoch = () => {
  //   if(this.state.stoch) {
  //     this.setState({
  //       stoch: false
  //     })
  //   } else {
  //     this.setState({
  //       stoch: true,
  //       timeControl: false,
  //       domains: false,
  //       physics: false,
  //       noahMp: false
  //     })
  //   }
  // }

  // WRF STOCH GENERAL SELECT
  // stochGeneral = () => {
  //   if(this.state.stochGeneral) {
  //     this.setState({
  //       stochGeneral: false
  //     })
  //   } else {
  //     this.setState({
  //       stochGeneral: true,
  //       stochSppt: false
  //     })
  //   }
  // }

  // WRF STOCH SPPT SELECT
  // stochSppt = () => {
  //   if(this.state.stochSppt) {
  //     this.setState({
  //       stochSppt: false
  //     })
  //   } else {
  //     this.setState({
  //       stochSppt: true,
  //       stochGeneral: false
  //     })
  //   }
  // }

  // WRF STOCH SKEBS SELECT
  // stochSkebs = () => {
  //   if(this.state.stochSkebs) {
  //     this.setState({
  //       stochSkebs: false
  //     })
  //   } else {
  //     this.setState({
  //       stochSkebs: true,
  //       stochSppt: false,
  //       stochGeneral: false
  //     })
  //   }
  // }

  // WRF STOCH SPP SELECT
  // stochSpp = () => {
  //   if(this.state.stochSpp) {
  //     this.setState({
  //       stochSpp: false
  //     })
  //   } else {
  //     this.setState({
  //       stochSpp: true,
  //       stochGeneral: false,
  //       stochSppt: false,
  //       stochSkebs: false
  //     })
  //   }
  // }

  // WRF NOAH_MP SELECT
  // noahMp = () => {
  //   if(this.state.noahMp) {
  //     this.setState({
  //       noahMp: false
  //     })
  //   } else {
  //     this.setState({
  //       noahMp: true,
  //       stoch: false,
  //       timeControl: false,
  //       domains: false,
  //       physics: false,
  //     })
  //   }
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/'
            render={()=> (
            this.state.currentUser !== undefined ?
            (<Redirect to={`/${this.state.currentUser}`} />)
              :
            <div>
              <Login
              setCurrentUser={this.setCurrentUser}/>
            </div>)}
          />
          {/* DEV SETUP */}
          {/* <Route exact path='/'
            render={()=> (
            this.state.currentJob ? (
              <Redirect to={`/${this.state.currentJob.name}`}/>
            ) : (
            <div>
              <Header />
              <JobType jobType={this.state.jobType}
                jobTypeSelect={this.jobTypeSelect}/>
              <JobTypeNewExisting
                jobs={this.state.jobs}
                jobType={this.state.jobType}
                newJobName={this.newJobName}
                existingJobName={this.existingJobName}
                jobTypeNewExisting={this.newExisting}
                backButton={this.backButton}
                getInputFields={this.getInputFields}
                getDefaultValues={this.getDefaultValues}
              />
            </div>))}
            /> */}
          <Route exact path={`/${this.state.currentUser}`}
            render={()=> (
            this.state.currentJob &&
            this.state.currentUser ? (
              <Redirect to={`/${this.state.currentUser}/${this.state.currentJob.name}`}/>
            ) : (
            <div>
              <Header />
              <JobType jobType={this.state.jobType}
                jobTypeSelect={this.jobTypeSelect}/>
              <JobTypeNewExisting
                jobs={this.state.jobs}
                jobType={this.state.jobType}
                newJobName={this.newJobName}
                existingJobName={this.newJobName}
                jobTypeNewExisting={this.existingJobName}
                backButton={this.backButton}
                getInputFields={this.getInputFields}
                getDefaultValues={this.getDefaultValues}
              />
            </div>))}
            />
            {/* DEV SETUP */}
          <Route
            // exact path={`/${this.state.currentJob ? this.state.currentJob.name : null}`}
            path={`/${this.state.currentJob ? this.state.currentUser+'/'+this.state.currentJob.name : null}`}
            render={()=> (
            <div>
              <Dashboard
                getInputFields={this.getInputFields}
                getAllHeadings={this.getAllHeadings}
                allHeadings={this.state.allHeadings}
                getDefaultValues={this.getDefaultValues}
                inputFields={this.state.inputFields}
                defaultValues={this.state.defaultValues}
                nwpFlipped={this.state.nwpFlipped}
                wpsFlipped={this.state.wpsFlipped}
                wrfFlipped={this.state.wrfFlipped}
                daFlipped={this.state.daFlipped}
                nwpFlipFunc={this.nwpFlipFunc}
                wpsFlipFunc={this.wpsFlipFunc}
                boundaryConditionsFlipFunc={this.boundaryConditionsFlipFunc}
                boundaryConditionsFlipped={this.state.boundaryConditionsFlipped}
                wrfFlipFunc={this.wrfFlipFunc}
                daFlipFunc={this.daFlipFunc}
                currentJob={this.state.currentJob}
                showNwp={this.state.showNwp}
                showWps={this.state.showWps}
                showWrf={this.state.showWrf}
                showDa={this.state.showDa}
                threeDvar={this.state.threeDvar}
                threeDensvar={this.state.threeDensvar}
                fourDensvar={this.state.fourDensvar}
                coldStartWrf={this.state.coldStartWrf}
                threeDvarSelect={this.threeDvarSelect}
                threeDensvarSelect={this.threeDensvarSelect}
                fourDensvarSelect={this.fourDensvarSelect}
                coldStartWrfSelect={this.coldStartWrfSelect}
                nwpShowClick={this.nwpShowClick}
                wpsShowClick={this.wpsShowClick}
                wrfShowClick={this.wrfShowClick}
                daShowClick={this.daShowClick}
                runMainJob={this.state.runMainJob}
                setMainJob={this.setMainJob}
                hourFrequencyOnChange={this.hourFrequencyOnChange}
                hourFrequency={this.state.hourFrequency}
                yearFrequencyOnChange={this.yearFrequencyOnChange}
                yearFrequency={this.state.yearFrequency}
                dayFrequencyOnChange={this.dayFrequencyOnChange}
                dayFrequency={this.state.dayFrequency}
                minuteFrequencyOnChange={this.minuteFrequencyOnChange}
                minuteFrequency={this.state.minuteFrequency}
                secondFrequencyOnChange={this.secondFrequencyOnChange}
                secondFrequency={this.state.secondFrequency}
                continueToWps={this.state.continueToWps}
                continueToWpsOnChange={this.continueToWpsOnChange}
                date={this.state.date}
                selectionStart={this.state.selectionStart}
                selectionEnd={this.state.selectionEnd}
                prevMonth={this.prevMonth}
                nextMonth={this.nextMonth}
                setRange={this.setRange}
                lat={this.state.lat}
                lng={this.state.lng}
                zoom={this.state.zoom}
                mapModal={this.mapModal}
                showMapModal={this.state.showMapModal}
                syncMapModal={this.syncMapModal}
                drawCoords={this.drawCoords}
                northWest={this.state.northWest}
                northEast={this.state.northEast}
                southEast={this.state.southEast}
                southWest={this.state.southWest}
                gfsSelect={this.gfsSelect}
                gfs={this.state.gfsSelect}
                hrrrSelect={this.hrrrSelect}
                hrrr={this.state.hrrrSelect}
                namSelect={this.namSelect}
                nam={this.state.namSelect}
                mapSaved={this.state.mapSaved}
                saveMap={this.saveMap}
                wpsTypeSaved={this.state.wpsTypeSaved}
                wrfdaSelect={this.wrfdaSelect}
                gsiSelect={this.gsiSelect}
                wrfda={this.state.wrfda}
                gsi={this.state.gsi}
                mapColors={this.state.mapColors}
                wrfModal={this.wrfShowClick}
                wrfBtnClick={this.wrfBtnClick}
                headers={this.state.headers}
                wrfSubBtnClick={this.wrfSubBtnClick}
                subHeaders={this.state.subHeaders}
                // timeControl={this.timeControl}
                // timeControlSelect={this.state.timeControl}
                // timeControlGeneral={this.timeControlGeneral}
                // timeControlGeneralSelect={this.state.timeControlGeneral}
                // timeControlHistoryFiles={this.timeControlHistoryFiles}
                // timeControlHistoryFilesSelect={this.state.timeControlHistoryFiles}
                // timeControlHistoryIntervals={this.timeControlHistoryIntervals}
                // timeControlHistoryIntervalsSelect={this.state.timeControlHistoryIntervals}
                // timeControlHistoryTime={this.timeControlHistoryTime}
                // timeControlHistoryTimeSelect={this.state.timeControlHistoryTime}
                // domains={this.domains}
                // domainsSelect={this.state.domains}
                // domainsGeneral={this.domainsGeneral}
                // domainsGeneralSelect={this.state.domainsGeneral}
                // domainsBasicTimeStep={this.domainsBasicTimeStep}
                // domainsBasicTimeStepSelect={this.state.domainsBasicTimeStep}
                // domainsAdaptiveTimeStep={this.domainsAdaptiveTimeStep}
                // domainsAdaptiveTimeStepSelect={this.state.domainsAdaptiveTimeStep}
                // domainsHorVertInterpolation={this.domainsHorVertInterpolation}
                // domainsHorVertInterpolationSelect={this.state.domainsHorVertInterpolation}
                // domainsThreeDOcean={this.domainsThreeDOcean}
                // domainsThreeDOceanSelect={this.state.domainsThreeDOcean}
                // physics={this.physics}
                // physicsSelect={this.state.physics}
                // physicsGeneral={this.general}
                // physicsGeneralSelect={this.state.physicsGeneral}
                // physicsMicrophysics={this.physicsMicrophysics}
                // physicsMicrophysicsSelect={this.state.physicsMicrophysics}
                // physicsRadiation={this.physicsRadiation}
                // physicsRadiationSelect={this.state.physicsRadiation}
                // physicsLandOcean={this.physicsLandOcean}
                // physicsLandOceanSelect={this.state.physicsLandOcean}
                // physicsBoundaryLayer={this.physicsBoundaryLayer}
                // physicsBoundaryLayerSelect={this.state.physicsBoundaryLayer}
                // physicsCumulus={this.physicsCumulus}
                // physicsCumulusSelect={this.state.physicsCumulus}
                // physicsLightning={this.physicsLightning}
                // physicsLightningSelect={this.state.physicsLightning}
                // ralwPhysics={this.ralwPhysics}
                // ralwPhysicsSelect={this.state.ralwPhysics}
                // raswPhysics={this.raswPhysics}
                // raswPhysicsSelect={this.state.raswPhysics}
                // stoch={this.stoch}
                // stochSelect={this.state.stoch}
                // stochGeneral={this.stochGeneral}
                // stochGeneralSelect={this.state.stochGeneral}
                // stochSppt={this.stochSppt}
                // stochSpptSelect={this.state.stochSppt}
                // stochSkebs={this.stochSkebs}
                // stochSkebsSelect={this.state.stochSkebs}
                // stochSpp={this.stochSpp}
                // stochSppSelect={this.state.stochSpp}
                // noahMp={this.noahMp}
                // noahMpSelect={this.state.noahMp}

              />
            </div>
          )}
          />
          {console.log(this.state)}
        </div>
      </BrowserRouter>
    )
  }
}

export default App
