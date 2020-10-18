import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';
import './map.css'
import mapConfig from '../Configs/MapConfig'
import _Marker from './Marker'
import _Circle from './Circle'
import _Polyline from './Polyline'


function Map({mapState, config, handleMove}) {

  const [center, setCenter] = useState()
  
  const map = useRef()

  
  useEffect(() => {
    if(map.current){
      map.current.state.map.mapTypeId = config.mapType[0]
    }
  }, [config])
  
  function changeCenter(){
    if(map.current){
      setCenter({
        lat: map.current.state.map.center.lat(),
        lng: map.current.state.map.center.lng()
      })
    }	
    
  }
  
  const options = {
    styles: mapConfig(config),
    disableDefaultUI: true,
    zoomControl: true,           
  }
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"
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
              return <_Marker marker={marker} index={index}/>
            })
          }

          {mapState.missingCity &&
          mapState.missingCity.map((circle, index) => {
            return <_Circle circle={circle} index={index} />
          })
            
          }

          {mapState.polyline.length > 0 && 
           mapState.polyline.map((poly, index) => {
           return <_Polyline poly={poly} index={index}/>
            })
          }

          {mapState.hint &&
            <Circle radius={60000} center={mapState.hint}/>
          }

        </GoogleMap>
     </LoadScript>
  )
}
export default Map;