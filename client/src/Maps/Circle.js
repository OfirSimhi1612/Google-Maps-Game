import React from 'react'
import { Circle } from '@react-google-maps/api'

function _Circle({circle, index}){

    const playersColors = ['red', 'blue', 'green']

    return <Circle 
                radius={6000}
                center={circle}
                options={{
                    strokeColor: playersColors[index]
                }}
            />
} 

export default _Circle