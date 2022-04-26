import path from 'path'
import express from 'express'
import hbs from 'hbs'
import geocodes from './utiles/geocodes.js'
import forecasting from './utiles/forecasting.js'
import { read } from 'fs'

//Define path for Express config
const __dirname = path.resolve('public')
const viewPath  = path.resolve('templates/views')
const partialViewPath = path.resolve('templates/partials')

const app = express()

const port = process.env.PORT || 3000

//Setup handlebars engine and view locations
app.set('view engine', 'hbs')  //handlebars templates
app.set('views', viewPath)
hbs.registerPartials(partialViewPath)
//Setup status directory to serve
app.use(express.static(__dirname))


app.get('', (req, res) => {
    res.render('index',{
        title: 'This is webapp title!',
        name:'Ashish Ithape'
    })
})

app.get('/about' ,(req, res) => {
    res.render('about', {
        title:'About Page',
        name: 'Ashish Ithape',
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error:'you have to search by address.'
        })
    }

    geocodes.geocode(req.query.address, (error, {latitude, longitude, Place}={})=> {

        if (error) {
            return res.send({ error })
        } else {

            forecasting.forecasting(longitude, latitude, (error, forCastData)=>{
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forcast:forCastData,
                    Place,
                    address:req.query.address
                })

            })
        }
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help title!',
        name:'Ashish Ithape',
    })
})

 app.get('/help/*', (req,res) => {
    res.render('404', {
        title:"404",
        name:"Ashish Ithape",
        errorMessage:"Help articles are not found.."
    })
})


app.get('*', (req,res) => {
    res.render('404', {
        title:"404",
        name:"Ashish Ithape",
        errorMessage:"404 page found."
    })
})


app.listen(port, () => {
    console.log('server up in port on. ' + port)
})





// app.get('/help', (req, res) => {
//     res.send(app.use(express.static(helpPagePath)))
// })

// app.get('/about',(req,res)=>{
//     res.send("<b>Ashish</b>")
// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         forcast:'12',
//         location: 'mumbai'
//     })
// })