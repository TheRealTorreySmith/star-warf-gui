import React, { Component } from 'react'
import L from 'leaflet';
import 'leaflet-draw'
import './MapModal.css'
import leafletImage from 'leaflet-image'
// import actions from './actions'
// import isEmpty from 'lodash.isempty'
// import simplify from './simplify'


class MapModal extends Component {

  componentDidMount() {
      this.initMap()
    }

    initMap = () => {

      // MAPBOX ATTRIBUTION AND API CALL
      const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${process.env.REACT_APP_MB_TOKEN}`

      // LAYERS OPTIONS
      let streets = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
      grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr})

      // INITIALIZE MAP
      this.modalMap = L.map('modalMap', {preferCanvas: true, layers: [streets]}).setView([20.505, -20.09], 1)
      this.featureGroup = L.featureGroup().addTo(this.modalMap)
      this.drawControl = new L.Control.Draw({
        draw: {
          polygon: true,
  				polyline: false,
  				rectangle: true,
  				circle: true,
  				circlemarker: false,
          marker: false,
        },
        edit: {
          featureGroup: this.featureGroup
        }
      }).addTo(this.modalMap)


      // LAYERS OPTIONS
      const baseLayers = {
    		"Grayscale": grayscale,
    		"Streets": streets
    	}

      // ADD LAYERS TO MAP
    	L.control.layers(baseLayers).addTo(this.modalMap)

      // ADDED CLASS TO LEAFLET ELEMENTS TO MANIPULATE STYLES FOR ZOOMED MAP
      let drawClass = this.drawControl._map._controlContainer.children[0]
      drawClass.children[0].className = 'map-modal-buttons-container leaflet-control-zoom leaflet-bar leaflet-control'
      drawClass.children[0].children[0].className = 'map-modal-buttons leaflet-control-zoom-in'
      drawClass.children[0].children[1].className = 'map-modal-buttons leaflet-control-zoom-out'
      drawClass.children[1].children[0].children[0].className = 'map-modal-buttons-container leaflet-draw-toolbar leaflet-bar leaflet-draw-toolbar-top'
      drawClass.children[1].children[1].children[0].className = 'map-modal-buttons-container leaflet-draw-toolbar leaflet-bar leaflet-draw-toolbar-top'
      drawClass.children[1].children[0].children[0].children[0].className = 'map-modal-buttons modal-polyline leaflet-draw-draw-polyline'
      drawClass.children[1].children[0].children[0].children[1].className = 'map-modal-buttons modal-polygon leaflet-draw-draw-polygon'
      drawClass.children[1].children[0].children[0].children[2].className = 'map-modal-buttons modal-rectangle leaflet-draw-draw-rectangle'
      let editBtn = document.getElementsByClassName('leaflet-draw-edit-edit')
      let trashBtn = document.getElementsByClassName('leaflet-draw-edit-remove')
      editBtn[1].className = 'leaflet-draw-edit-edit leaflet-disabled map-modal-buttons modal-edit'
      trashBtn[1].className = 'leaflet-draw-edit-remove leaflet-disabled map-modal-buttons modal-trash'

      // DOMAIN OBJECTS AND COLORS
      let domains = []

      // MAP EVENT HANDLERS
      this.modalMap.on('draw:created', (e) => {
        this.featureGroup.addLayer(e.layer)
        domains.push(e.layer)
        e.layer.options.color = this.props.mapColors[domains.length-1]
        this.calculateBounds()
      })
    }

    calculateBounds = () => {
      let northWest = {lat:(Math.round(this.featureGroup.getBounds()._northEast.lat*10000)/10000), lng: (Math.round(this.featureGroup.getBounds()._southWest.lng*10000)/10000)}
      let northEast = {lat:(Math.round(this.featureGroup.getBounds()._northEast.lat*10000)/10000), lng: (Math.round(this.featureGroup.getBounds()._northEast.lng*10000)/10000)}
      let southEast = {lat:(Math.round(this.featureGroup.getBounds()._southWest.lat*10000)/10000), lng: (Math.round(this.featureGroup.getBounds()._northEast.lng*10000)/10000)}
      let southWest = {lat:(Math.round(this.featureGroup.getBounds()._southWest.lat*10000)/10000), lng: (Math.round(this.featureGroup.getBounds()._southWest.lng*10000)/10000)}
      this.props.drawCoords(northWest, northEast, southEast, southWest)
    }

  updateMap = () => {
    this.featureGroup.clearLayers()
    let bounds = [
      [this.refs.northEastLat.value, this.refs.northEastLng.value],
      [this.refs.southWestLat.value, this.refs.southWestLng.value]
    ]
    // Need to put domains in state
    L.rectangle(bounds, {color: this.props.mapColors[0], weight: 1}).addTo(this.featureGroup)
    this.calculateBounds()
  }

  mapModal = () => {
    this.props.mapModal()
  }

  saveMapModal = () => {
    leafletImage(this.modalMap, function(err, canvas) {
      let img = document.createElement('img')
      img.width = 55
      img.height = 55
      img.src = canvas.toDataURL()
      document.getElementById('domain-box').innerHTML = ''
      document.getElementById('domain-box').appendChild(img)
    })
    this.props.saveMap()
  }

  // getAddress = ({city, country, country_code, county}) => {
	// 	return `${city} ${country} ${country_code} ${county}`
	// }
  //
  // onSubmit = (e) => {
  // 		e.preventDefault()
  // 		const {query, isLoading} = this.state
  // 		const types = ['Polygon', 'MultiPolygon']
  //
  // 		if (!query || isLoading) return
  //
  // 		this.setState({isLoading: true})
  //
  // 		actions.onSearch(query).end((err, res) => {
  // 			if (err) {
  // 				return console.log(err);
  // 			}
  // 			let search = res.body.filter(item => types.includes(item.geojson.type))
  // 				.map(item => {
  // 					return Object.assign({}, item, {addressString: this.getAddress(item.address)})
  // 				})
  // 				.filter((item, index, self) => {
  // 					const copies = self.filter(i => i.addressString === item.addressString)
  // 					const hasBoundary = copies.some(i => i.class === 'boundary')
  // 					const hasPlace = copies.some(i => i.class === 'place')
  //
  // 					return copies.length > 1
  // 						? (hasBoundary && item.class === 'boundary' ||
  // 							!hasBoundary && hasPlace && item.class === 'place' ||
  // 							!hasBoundary && !hasPlace && item.osm_type === copies[0].osm_type)
  // 							? true
  // 							: false
  // 						: true
  // 				})
  //
  // 			this.setState({
  // 				search,
  // 				isLoading: false
  // 			})
  // 		})
  // 	}
  //
  // 	onSelect = (selected) => {
  // 		const {query} = this.state
  // 		this.setState({
  // 			canSave: true,
  // 			selected,
  // 			search: null
  // 		})
  // 		this.renderObjectOnMap(selected)
  // 	}
  //
  // 	onTextChange = (e) => {
  // 		const {value} = e.target
  // 		this.setState({
  // 			query: value,
  // 			search: null
  // 		})
  // 	}
  //
  // 	onSaveLocation = () => {
  // 		const polygons = []
  // 		this.featureGroup.eachLayer(layer => polygons.push(layer.toGeoJSON().geometry.coordinates))
  // 		polygons.length && console.log('POLYGON: ', polygons)
  // 	}
  //
  renderSearchForm = () => {
  		// const {query} = this.state
  		return (
        <div className="row map-search-row">
          <div className="col s1 m1 l1"></div>
    			<form className="col s6 m6 l6 search__form"
    				// onSubmit={this.onSubmit}
            >
    				<input className="search__input"
    					// onChange={this.onTextChange}
    					placeholder="Search..."
    					type="text"
    					// value={query}
            />
    				<button type="submit"
    					className="search-submit">
              <i className="material-icons map-modal-search-icon">search</i>
            </button>
    			</form>
        </div>
  		)
  	}
  //
  // renderSearchResults = () => {
  // 		const {search} = this.state
  // 		if (!search) return
  //     // console.log('Search results: ', search)
  // 		return (
  // 			<div className="search__results">
  // 				{search.length
  // 					? search.map(item =>
  // 						<div className="search__item"
  // 							key={item.place_id}
  // 							onClick={this.onSelect.bind(this, item)}>
  // 							{item.display_name}
  // 						</div>
  // 					)
  // 					: <div className="search__item">
  // 						Nothing was found
  // 					</div>
  // 				}
  // 			</div>
  // 		)
  // 	}
  //
  // 	renderDetails = () => {
  // 		const {selected} = this.state
  // 		if (!isEmpty(selected)) {
  //   		return (
  //   			<div className="search__details">
  //   				<div className="search__details-bg">
  //   					{selected.display_name}
  //   					<div>Class: {selected.class}</div>
  //   					<div>Type: {selected.type}</div>
  //   					<div>Lat/Lon: {selected.lat}/{selected.lon}</div>
  //   				</div>
  //   			</div>
  //   		)
  //     }
  // 	}
  //
  // 	simplify = (geojson, kf = 100) => {
  // 		const coordinates = geojson.coordinates[0]
  // 		const distance = this.getDistance(coordinates)
  // 		const tolerance = distance/kf
  // 		const simplifiedCoords = simplify(coordinates, tolerance, false)
  // 		return Object.assign({}, geojson, {coordinates: [simplifiedCoords]})
  // 	}
  //
  // 	getDistance = (points) => {
  // 		let distance = 0
  // 		for (let i = 0; i < points.length - 1; i++) {
  // 			distance += this.twoPointsDistance(points[i], points[i + 1])
  // 		}
  // 		return distance
  // 	}
  //
  // 	twoPointsDistance = (point1, point2) => {
  // 		return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2))
  // 	}
  //
  // 	flatten = (array) => {
  // 		const flat = [].concat(...array)
  // 		return flat.some(arr => !this.isCoordinates(arr)) ? this.flatten(flat) : flat
  // 	}
  //
  // 	isCoordinates = (arr) => {
  // 		return Array.isArray(arr) &&
  // 			arr.length === 2 &&
  // 			typeof(arr[0]) === 'number' &&
  // 			typeof(arr[1]) === 'number'
  // 	}
  //
  //   renderObjectOnMap = (obj) => {
  // 		const {boundingbox, geojson, lat, lon} = obj
  // 		const {coordinates} = geojson
  // 		const bounds = [
  // 			[boundingbox[0], boundingbox[2]],
  // 			[boundingbox[1], boundingbox[3]]
  // 		]
  //
  // 		this.modalMap.fitBounds(bounds)
  // 		this.setState({canSave: true})
  // 		this.featureGroup.clearLayers()
  // 		const geoJsonObject = this.state.simplify
  // 			? this.state.simplify === 'convex'
  // 				? this.convexHull(geojson)
  // 				: geojson.type === 'MultiPolygon'
  // 					? this.simplifyMultyPolygon(geojson)
  // 					: this.simplify(geojson)
  // 			: geojson
  //
  // 		if (!isEmpty(geoJsonObject)) {
  // 			const myStyle = {
  // 				"color": "#3388ff",
  // 				"weight": 4,
  // 				"opacity": 0.5
  // 			}
  //
  // 			// 1. render in featureGroup
  // 			L.geoJson(geoJsonObject, {
  // 				// style: myStyle,
  // 				onEachFeature: (feature, layer) => {
  // 					this.featureGroup.addLayer(layer)
  // 				}
  // 			})
  // 		}
  // 	}

	renderMap = () => {
		return (
			<div id="modalMap" className="search__map" />
		)
	}

  render() {
    return (
      <div>
        <div>
          <div className="map-modal modal open animated zoomIn">
            <div className="modal-header">
              {this.renderSearchForm()}
            </div>
            <div className="modal-content">
              <div className="row map-content-container">
                {this.renderMap()}
                  {/* {this.renderDetails()}
                  {this.renderSearchResults()} */}

                  {/* NORTHWEST COORDINATES CONTAINER */}
                  {this.props.northWest.lat ?
                <div className="lat-lng-container">
                  <div className="individual-lat-lng-container">
                    <div className="vertice-label">NorthWest Vertice:</div>
                    <div className="lat-container">
                      <div className="lat-long-text">Lat:</div>
                      <input onChange={(event) => this.updateMap(event)} ref='northWestLat' className="lat-value" value={this.props.northWest.lat}>{console.log(this.props.northWest.lat)}</input>
                    </div>
                    <div className="lng-container">
                      <div className="lat-long-text">Lng:</div>
                      <input onChange={(event) => this.updateMap(event)} ref='northWestLng' className="lng-value" value={this.props.northWest.lng}></input>
                    </div>
                  </div>

                  {/* NORTHEAST COORDINATES CONTAINER */}
                  <div className="individual-lat-lng-container">
                    <div className="vertice-label">NorthEast Vertice:</div>
                    <div className="lat-container">
                      <div className="lat-long-text">Lat:</div>
                      <input onChange={this.updateMap} ref='northEastLat' className="lat-value" value={this.props.northEast.lat}>{console.log(this.props.northEast.lat)}</input>
                    </div>
                    <div className="lng-container">
                      <div className="lat-long-text">Lng:</div>
                      <input onChange={this.updateMap} ref='northEastLng' className="lng-value" value={this.props.northEast.lng}></input>
                    </div>
                  </div>

                  {/* SOUTHEAST COORDINATES CONTAINER */}
                  <div className="individual-lat-lng-container">
                    <div className="vertice-label">SouthEast Vertice:</div>
                    <div className="lat-container">
                      <div className="lat-long-text">Lat:</div>
                      <input onChange={this.updateMap} ref='southEastLat' className="lat-value" value={this.props.southEast.lat}></input>
                    </div>
                    <div className="lng-container">
                      <div className="lat-long-text">Lng:</div>
                      <input onChange={this.updateMap} ref='southEastLng' className="lng-value" value={this.props.southEast.lng}></input>
                    </div>
                  </div>

                  {/* SOUTHWEST COORDINATES CONTAINER */}
                  <div className="individual-lat-lng-container">
                    <div className="vertice-label">SouthWest Vertice:</div>
                    <div className="lat-container">
                      <div className="lat-long-text">Lat:</div>
                      <input onChange={this.updateMap} ref='southWestLat' className="lat-value" value={this.props.southWest.lat}></input>
                    </div>
                    <div className="lng-container">
                      <div className="lat-long-text">Lng:</div>
                      <input onChange={this.updateMap} ref='southWestLng' className="lng-value" value={this.props.southWest.lng}></input>
                    </div>
                  </div>
                </div>
                : null}
              </div>
            </div>
            <div className="modal-footer"><div>
                <button className="btn toast modal-save-btn" onClick={this.saveMapModal}>Save</button>
                <button className="btn modal-action modal-close modal-save-btn red darken-2" onClick={this.mapModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-overlay"></div>
     </div>
    )
  }
}

export default MapModal
