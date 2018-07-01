import React, { Component } from 'react'
import L from 'leaflet';
import 'leaflet-draw'
import './MapModal.css'

class MapModal extends Component {

  componentDidMount() {
      this.initMap()
    }

    initMap = () => {
        this.modalMap = L.map('modalMap').setView([-70.505, 150.09], 0)
        this.featureGroup = L.featureGroup().addTo(this.modalMap)
        this.drawControl = new L.Control.Draw({
          draw: {
            polygon: true,
            polyline: true,
            rectangle: true,
            circle: true,
            marker: false
          },
          edit: {
            featureGroup: this.featureGroup,
          }
        }).addTo(this.modalMap)
        this.drawControl._map._controlContainer.children[0].children[0].className = 'map-modal-buttons-container leaflet-control-zoom leaflet-bar leaflet-control'
        this.drawControl._map._controlContainer.children[0].children[0].children[0].className = 'map-modal-buttons leaflet-control-zoom-in'
        this.drawControl._map._controlContainer.children[0].children[0].children[1].className = 'map-modal-buttons leaflet-control-zoom-out'
        this.drawControl._map._controlContainer.children[0].children[1].children[0].children[0].className = 'map-modal-buttons-container leaflet-draw-toolbar leaflet-bar leaflet-draw-toolbar-top'
        this.drawControl._map._controlContainer.children[0].children[1].children[1].children[0].className = 'map-modal-buttons-container leaflet-draw-toolbar leaflet-bar leaflet-draw-toolbar-top'
        this.drawControl._map._controlContainer.children[0].children[1].children[0].children[0].children[0].className = 'map-modal-buttons modal-polyline leaflet-draw-draw-polyline'
        this.drawControl._map._controlContainer.children[0].children[1].children[0].children[0].children[1].className = 'map-modal-buttons modal-polygon leaflet-draw-draw-polygon'
        this.drawControl._map._controlContainer.children[0].children[1].children[0].children[0].children[2].className = 'map-modal-buttons modal-rectangle leaflet-draw-draw-rectangle'
        this.drawControl._map._controlContainer.children[0].children[1].children[0].children[0].children[3].className = 'map-modal-buttons modal-circle leaflet-draw-draw-circle'
        this.drawControl._map._controlContainer.children[0].children[1].children[0].children[0].children[4].className = 'map-modal-buttons modal-circlemarker leaflet-draw-circlemarker'

        L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          tileSize: 400
        }).addTo(this.modalMap)

        // SMALL MAP EVENT HANDLERS

        this.modalMap.on('draw:created', (e) => {
          this.setState({canSave: true})
          this.featureGroup.addLayer(e.layer)
        })
        this.modalMap.on('draw:drawstart', (e) => {
          this.setState({canSave: false})
          this.featureGroup.clearLayers()
        })
      }


  mapModal = () => {
    this.props.mapModal()
  }

  render() {
    return (
      <div>
        <div>
          <div className="map-modal modal open animated zoomIn">
            <div className="modal-content">
              <div id="modalMap">

              </div>
            </div>
            <div className="modal-footer"><div>
                <button className="btn toast modal-save-btn">Save</button>
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
