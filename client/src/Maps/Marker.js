import React from 'react'
import { Marker } from '@react-google-maps/api'

function _Marker({marker, index}){

    const playersColors = ['red', 'blue', 'green']

    return <Marker 
                  position={{lat: marker.lat, lng: marker.lng }}
                  icon={{
                      url:  `http://maps.google.com/mapfiles/ms/icons/${playersColors[index]}-dot.png`
                    }}
            />
} 

export default _Marker