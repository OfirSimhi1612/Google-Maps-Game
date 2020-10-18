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

    
export function getHintCordinates(lat, lng){
    
    const yDiff = Math.random() / 3 * (Math.random() > 0.5 ? -1 : 1)
    const xDiff = Math.random() / 3 * (Math.random() > 0.5 ? -1 : 1)

    return {
        lat: lat + yDiff,
        lng: lng + xDiff
    }
    
}

function getPolyPoints(encoded){
    let points = [];
    let index = 0,
        len = encoded.length;
    let lat = 0,
        lng = 0;
    while (index < len) {
        let b,
        shift = 0,
        result = 0;
        do {
        b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii
        result |= (b & 0x1f) << shift;
        shift += 5;
        } while (b >= 0x20);
        let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lat += dlat;
        shift = 0;
        result = 0;
        do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
        } while (b >= 0x20);
        let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lng += dlng;

        points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return points;
}

export async function getPolylinePath(origin, destination){

    const url = new URL('https://maps.googleapis.com/maps/api/directions/json')
    url.search = new URLSearchParams({
        origin: `${origin.lat},${origin.lng}`,
        destination: `${destination.lat},${destination.lng}`,
        key: 'AIzaSyBeOBTkKGGeblhp3ie0RmdDDI6uHduVYVw',
        mode: 'walking'
    })
 
    const data = await fetch(url)

    const jData = await data.json()
console.log(jData)
    if(jData.status === 'OK'){

        const polyPoints = jData.routes[0].legs[0].steps.map(step => getPolyPoints(step.polyline.points))
        return [polyPoints.flat(), jData.routes[0].legs[0].distance.value]
    } else {

        return 'error'
    }

   

}
