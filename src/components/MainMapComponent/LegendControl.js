// import React from 'react'
// import ReactDOM from 'react-dom'
// import L from 'leaflet'
// import MapControl from 'react-leaflet'
//
// export default class ModalControl extends MapControl {
//
//   createLeafletElement () {}
//
//   componentWillMount() {
//     const modalControl = L.control({position: 'bottomright'})
//     const jsx = (
//       <div {...this.props}>
//         <button>Expand</button>
//       </div>
//     )
//
//     modalControl.onAdd = function (map) {
//       let div = L.DomUtil.create('div', '')
//       ReactDOM.render(jsx, div)
//       return div
//     }
//
//     this.leafletElement = modalControl
//   }
// }

import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import MapControl from './MapControl';

export default class LegendControl extends MapControl {

  createLeafletElement () {}


  componentWillMount() {
    const legend = L.control({position: 'bottomright'});
    debugger;

    const jsx = (
      <div {...this.props}>
        <button>Expand</button>
      </div>
    );

    legend.onAdd = function (map) {
      console.log(map)
      let div = L.DomUtil.create('div', '');
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = legend;
  }
}
