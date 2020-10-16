import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import MapsLevels from '../Configs/MapConfigs/MapsLevels'
import './map.css'

function MapContainer({mapState, config, handleMove, missingCity}) {

  const [center, setCenter] = useState()

  const map = useRef()
  const mapsLevels = MapsLevels

  const mapStyles = {        
    height: "100vh",
    width: "100%"
  }

//  const mapConfig = [
//   {
//     "featureType": "administrative",
//     "elementType": "labels",
//     "stylers": [
//         {
//             "visibility": "off"
//         }
//     ]
//   },
//   {
//       "featureType": "administrative",
//       "elementType": "labels",
//       "stylers": [
//           {
//               "visibility": "off"
//           }
//       ]
//   },
//   {
//       "featureType": "landscape",
//       "elementType": "labels",
//       "stylers": [
//           {
//               "visibility": "off"
//           }
//       ]
//   },
//   {
//       "featureType": "landscape.man_made",
//       "elementType": "all",
//       "stylers": [
//           {
//               "saturation": "-70"
//           },
//           {
//               "lightness": "14"
//           }
//       ]
//   },
//   {
//       "featureType": "poi",
//       "elementType": "labels",
//       "stylers": [
//           {
//               "visibility": "off"
//           }
//       ]
//   },
//   {
//       "featureType": "road",
//       "elementType": "labels",
//       "stylers": [
//           {
//               "visibility": config.roadNumbers
//           }
//       ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "all",
//     "stylers": [
//         {
//             "visibility": config.roads
//         }
//     ]
//   },
//   {
//       "featureType": "transit",
//       "elementType": "labels",
//       "stylers": [
//           {
//               "visibility": "off"
//           }
//       ]
//   },
//   {
//       "featureType": "water",
//       "elementType": "all",
//       "stylers": [
//           {
//               "saturation": "100"
//           },
//           {
//               "lightness": "-14"
//           }
//       ]
//   },
//   {
//       "featureType": "water",
//       "elementType": "labels",
//       "stylers": [
//           {
//               "visibility": "off"
//           },
//           {
//               "lightness": "12"
//           }
//       ]
//   }] 

  function changeCenter(){
    if(map.current){
      setCenter({
        lat: map.current.state.map.center.lat(),
        lng: map.current.state.map.center.lng()
      })
    }	
    
  }

  const options = {
    styles: mapsLevels[config.mapLevel - 1],
    disableDefaultUI: true,
    zoomControl: true
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyBeOBTkKGGeblhp3ie0RmdDDI6uHduVYVw' 
       >
        <GoogleMap
          ref={map}
          mapContainerStyle={mapStyles}
          options={options}
          zoom={7}
          center={center ? { lat: center.lat, lng: center.lng } : {lat: 32, lng: 35}}
          onClick={handleMove}
          onDragEnd={changeCenter}
          onZoomChanged={changeCenter}
        >
          {mapState.marker &&
            <Marker 
            position={{lat: mapState.marker.lat, lng: mapState.marker.lng }}
            draggable
            onDragEnd={handleMove}
            />
          }

          {mapState.missingCity &&
            <Circle 
              radius={6000}
              center={mapState.missingCity}
            />
          }

        </GoogleMap>
     </LoadScript>
  )
}
export default MapContainer;