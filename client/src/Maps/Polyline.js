import React from 'react'
import { Polyline } from '@react-google-maps/api'

function _Polyline({poly, index}){

    const playersColors = ['red', 'blue', 'green']

    return <Polyline 
                path={poly}
                geodesic={true}
                options={{
                    strokeColor: playersColors[index],
                    strokeOpacity: 1,
                    strokeWeight: 4
                }}
            />
} 

export default _Polyline