import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle, DirectionsRenderer, DirectionsService, Polyline } from '@react-google-maps/api';
import './map.css'
import mapConfig from '../Configs/MapConfig'
import _Marker from './Marker'
import _Circle from './Circle'
import _Polyline from './Polyline'


function Map({mapState, config, handleMove, gameType}) {

  const [center, setCenter] = useState()
  // const [polylines, setPolylines] = useState([])

  // useEffect(() => {
    
  //   async function getPoly(){
       
  //     const lines = []
  //     mapState.marker.map(async (player, index) => {

  //       const polyPath = await getPolylinePath(player, mapState.missingCity[index])
  //       lines.push(polyPath)
  //     }) 

  //     setPolylines(lines)
  //   }
  //   if(mapState.marker && mapState.missingCity && gameType === 'drive'){
  //     getPoly()
  //   } else {
  //     if(polylines.llength > 0){
  //       setPolylines([])
  //     } else {
  //       return
  //     }
  //   }
  // }, [mapState])

  // function getDirections(response){
  //   if (response !== null) {
  //     if (response.status === 'OK') {
  //       const polyPoints = response.routes[0].legs[0].steps.map(step => PolylinePoints(step.polyline.points))
  //       setPolylines([
  //         ...polylines,
  //         polyPoints.flat()
  //       ])
  //     } else {
  //       console.log('response: ', response)
  //     }
  //   }
  // }


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
          {(mapState.marker) &&
            mapState.marker.map((marker, index) => {
              return <_Marker marker={marker} index={index}/>
            })
          }

          {(mapState.missingCity) &&
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
            <Circle radius={40000} center={mapState.hint}/>
          }

        </GoogleMap>
     </LoadScript>
  )
}
export default Map;