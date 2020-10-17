import allCities from '../Maps/cities'

export function getCities(size){

    let popLimit = 0;

    switch (size) {
        case 'large':
            popLimit = 25000
            break;
        case 'mediume':
            popLimit = 10000
            break;
        case 'small':
            popLimit = 0
            break;
    }

    const filteredCities = allCities.filter(city => city.MGLSDE_L_1 > popLimit)
    
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

export function getHintCordinates(lat, lng){

    const yDiff = Math.random() / 3 * (Math.random() > 0.5 ? -1 : 1)
    const xDiff = Math.random() / 3 * (Math.random() > 0.5 ? -1 : 1)
    
    return {
        lat: lat + yDiff,
        lng: lng + xDiff
    }
    
}

export function getWalkingDistance(origin, destination){

    const url = new URL('https://maps.googleapis.com/maps/api/directions/json')
    url.search = new URLSearchParams({
        origin: '31.857700045996,34.8370833334332',
        destination: '31.9632730962419,34.9137746940875',
        key: 'AIzaSyBeOBTkKGGeblhp3ie0RmdDDI6uHduVYVw',
        mode: 'walking'
    })
 
    fetch(url).then(res => res.json()).then(res => console.log(res))

}