import allCities from '../Maps/cities'
import Levels from'../Configs/Levels'

export function getCities(level){

    const filteredCities = allCities.filter(city => city.MGLSDE_L_1 > Levels[level - 1].populationLimit)
    
    return filteredCities;
}

export function getRandomCity(cities){

    const randomCity = cities[Math.floor(Math.random() * cities.length)]
 
    return randomCity
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

export function getAbsuluteDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}
  
//  function getWalkingDistance(lat1,lon1,lat2,lon2){

//  }

