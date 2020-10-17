import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle, MarkerClusterer } from '@react-google-maps/api';
import './map.css'


function MapContainer({mapState, config, handleMove}) {

  const [center, setCenter] = useState()

  const map = useRef()

  const mapStyles = {        
    height: "100vh",
    width: "100%"
  }

  useEffect(() => {
    if(map.current){
      map.current.state.map.mapTypeId = config.mapType[0]
    }
  }, [config])

  const playersColors = ['red', 'blue', 'green']

  const mapConfig = [
  {
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [
          {
              "saturation": "-70"
          },
          {
              "lightness": "14"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
        {
            "visibility": config.roads[0] ? 'on' : 'off'
        }
    ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": config.roads[1] ? 'on' : 'off'
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "saturation": "100"
          },
          {
              "lightness": "-14"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "lightness": "12"
          }
      ]
  }] 

  function changeCenter(){
    if(map.current){
      setCenter({
        lat: map.current.state.map.center.lat(),
        lng: map.current.state.map.center.lng()
      })
    }	
    
  }


  const options = {
    styles: mapConfig,
    disableDefaultUI: true,
    zoomControl: true,          
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyBeOBTkKGGeblhp3ie0RmdDDI6uHduVYVw' 
       >
        <GoogleMap
          ref={map}
          mapContainerStyle={mapStyles}
          options={options}
          zoom={mapState.zoom}
          center={center ? { lat: center.lat, lng: center.lng } : {lat: 32, lng: 35}}
          onClick={handleMove}
          onDragEnd={changeCenter}
          onZoomChanged={changeCenter}
        >
          {mapState.marker &&
            mapState.marker.map((marker, index) => {
              return <Marker 
              position={{lat: marker.lat, lng: marker.lng }}
              icon={{
                  url:  `http://maps.google.com/mapfiles/ms/icons/${playersColors[index]}-dot.png`
                }}
              />
            })
            
          }

          {mapState.missingCity &&
          mapState.missingCity.map((circle, index) => {
            return <Circle 
            radius={6000}
            center={circle}
            options={{
              strokeColor: playersColors[index]
            }}
          />
          })
            
          }

          {mapState.hint &&
            <Circle 
              radius={40000}
              center={mapState.hint}
            />
          }

        </GoogleMap>
     </LoadScript>
  )
}
export default MapContainer;