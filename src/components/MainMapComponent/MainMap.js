import React, { Component } from 'react'
import Map from './Map'
import TileLayer from './TileLayer'
import Marker from './Marker'
import Popup from './Popup'

export default class MapComponent extends Component {
  constructor(props, latitude, longitude) {
    super(props)
    this.state = {
      lat: 39.9635945,
      lng: -105.14556859999999,
      zoom: 11,
    }
  }

  getCoordinates = () => {
    if (localStorage.getItem("latitude") === null) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        localStorage.setItem("latitude", latitude)
        localStorage.setItem("longitude", longitude)
        // console.log([localStorage.getItem("Latitude"),localStorage.getItem("Longitude")])
      })
    } else {
      console.log(this.state)
      // console.log([localStorage.getItem("Latitude"),localStorage.getItem("Longitude")])
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (

      <div className="main-map">
        {this.getCoordinates()}
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            // attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={position}
          >
            <Popup>
              You are here! <br /> And I see you...
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}
