import React, { Component } from 'react'
import Map from './Map'
import TileLayer from './TileLayer'
import './Map.css'

export default class MapComponent extends Component {
  render() {
    const position = [this.props.lat, this.props.lng]
    return (
      <div className="main-map">
        <Map
          center={position}
          zoom={this.props.zoom}
          >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    )
  }
}
