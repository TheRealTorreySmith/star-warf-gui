import React, { Component } from 'react'
import L from 'leaflet';
import 'leaflet-draw'
import './MapModal.css'
import leafletImage from 'leaflet-image'

class MapModal extends Component {

  componentDidMount() {
      this.initMap()
    }

    initMap = () => {
        this.modalMap = L.map('modalMap', {preferCanvas: true}).setView([-60.505, 30.09], 1)
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
            featureGroup: this.featureGroup
          }
        }).addTo(this.modalMap)
        let drawClass = this.drawControl._map._controlContainer.children[0]
        drawClass.children[0].className = 'map-modal-buttons-container leaflet-control-zoom leaflet-bar leaflet-control'
        drawClass.children[0].children[0].className = 'map-modal-buttons leaflet-control-zoom-in'
        drawClass.children[0].children[1].className = 'map-modal-buttons leaflet-control-zoom-out'
        drawClass.children[1].children[0].children[0].className = 'map-modal-buttons-container leaflet-draw-toolbar leaflet-bar leaflet-draw-toolbar-top'
        drawClass.children[1].children[1].children[0].className = 'map-modal-buttons-container leaflet-draw-toolbar leaflet-bar leaflet-draw-toolbar-top'
        drawClass.children[1].children[0].children[0].children[0].className = 'map-modal-buttons modal-polyline leaflet-draw-draw-polyline'
        drawClass.children[1].children[0].children[0].children[1].className = 'map-modal-buttons modal-polygon leaflet-draw-draw-polygon'
        drawClass.children[1].children[0].children[0].children[2].className = 'map-modal-buttons modal-rectangle leaflet-draw-draw-rectangle'
        drawClass.children[1].children[0].children[0].children[3].className = 'map-modal-buttons modal-circle leaflet-draw-draw-circle'
        drawClass.children[1].children[0].children[0].children[4].className = 'map-modal-buttons modal-circlemarker leaflet-draw-circlemarker'
        let editBtn = document.getElementsByClassName('leaflet-draw-edit-edit')
        let trashBtn = document.getElementsByClassName('leaflet-draw-edit-remove')
        editBtn[1].className = 'leaflet-draw-edit-edit leaflet-disabled map-modal-buttons modal-edit'
        trashBtn[1].className = 'leaflet-draw-edit-remove leaflet-disabled map-modal-buttons modal-trash'
        L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          // maxZoom: 18,
          tileSize: 400
        }).addTo(this.modalMap)

        // SMALL MAP EVENT HANDLERS
        this.modalMap.on('draw:created', (e) => {
          this.setState({canSave: true})
          this.featureGroup.addLayer(e.layer)
          let coords = e.layer._latlngs
          this.props.drawCoords(coords)
        })
        this.modalMap.on('draw:drawstart', (e) => {
          this.setState({canSave: false})
          // this.featureGroup.clearLayers()
        })
      }

  mapModal = () => {
    this.props.mapModal()
  }

  // syncMapModal = (e) => {
  //   // let map = this.modalMap
  //   // this.props.syncMapModal(map)
  //   console.log(e.layer)
  // }

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


  render() {
    return (
      <div>
        <div>
          <div className="map-modal modal open animated zoomIn">
            <div className="modal-content">
              <div className="row map-content-container">
                <div id="modalMap">
                </div>
                <div className="lat-lng-container">
                  {this.props.getCoords && this.props.getCoords[0] ? this.props.getCoords[0].map(x =>
                    <div key={this.props.getCoords[0].indexOf(x)}>
                      <div className="point-label">{`Point #${this.props.getCoords[0].indexOf(x)+1}:`}</div>
                      <div>Lat: {x.lat}</div>
                      <div>Lng: {x.lng}</div>
                    </div>)
                    : null}
                </div>
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
