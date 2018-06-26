import React, { createRef, Component } from 'react'
import Map from './Map'
import TileLayer from './TileLayer'
import FeatureGroup from './FeatureGroup'
import Polygon from './Polygon'
import './Map.css'

export default class MapComponent extends Component {

  mapRef = createRef()

  handleClick = (e) => {
    this.mapRef.current.leafletElement.locate()
    let coords = [e.latlng.lat, e.latlng.lng]
    console.log(coords)
  }

  render() {
    const position = [this.props.lat, this.props.lng]
    return (
      <div className="main-map">
        <Map
          ref={this.mapRef}
          center={position}
          zoom={this.props.zoom}
          onClick={this.handleClick}
          >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            <Polygon
              color="purple"
              positions={polygon}
              >
            </Polygon>
          </FeatureGroup>
        </Map>
      </div>
    )
  }
}
