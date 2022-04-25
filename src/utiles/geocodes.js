
import  request  from "postman-request";
// import chalk    from "chalk"
// import { features } from "process";



const geocode = (address, callback)=> {

    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXNoaXNoODlpdGhhcGUiLCJhIjoiY2wxOWs1MHVtMW9kNDNqc2c3b2h2cXk0cSJ9.N5VEIJPW8urgJNwgLad6Vg&limi1=1"
    request({url:url, json:true}, (error, response, body)=>{

        if (error) {
            const message = "'there is internet issue, please check all!'"
            callback(message,data)
        } else if (body.features.length === 0){
            const message = "'Please check API again!'"
            callback(message,undefined)
        } else {
            callback(undefined,{
                latitude : body.features[0].geometry.coordinates[1],
                longitude : body.features[0].geometry.coordinates[0],
                Place : body.features[0].place_name
            })
        }
    })
}


export default {geocode:geocode}