import request from "postman-request";
// import chalk from "chalk"


const forecasting = (longitude, latitude, callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=0e51a7e366e63df7a8e1567ebf63e7ee&query='+latitude+','+longitude
     // const url ='http://api.weatherstack.com/current?access_key=0e51a7e366e63df7a8e1567ebf63e7ee&query=42.3605,-71.0596&units=f'          
    // http://api.weatherstack.com/current?access_key=0e51a7e366e63df7a8e1567ebf63e7ee&query=-75.7088,45.1545&units=c

    console.log(url)
    request({url:url, json:true}, (error, response, body)=>{
        //console.log(body)
        if (error) {
            // const msg = "error 1"
            // callback(msg, undefined)
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            // const msg = "error 2"
            // callback(msg, undefined)
            callback('Unable to find location', undefined)
        } else {
               //icon = <img src={body.current.weather_icons[0]}/>
               //wind_dir= body.current.wind_dir
           callback(undefined, 'Today wind direction is ' +body.current.wind_dir  +', and Today\'s weather is  '+ body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
       // callback(undefined, chalk.green.inverse(body.current.weather_descriptions[0] +". It is currently "+body.current.temperature+" degree out. It feels like "+body.current.feelslike+" degree out."))
        }
    })
}

export default {
    forecasting: forecasting
}