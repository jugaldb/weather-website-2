const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const chalk = require('chalk')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const publicDir = path.join(__dirname,'../Public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Jugal Bhatt'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Jugal Bhatt',
        title: 'Work Hard Anywhere'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name: 'Jugal Bhatt',
        helpText: 'We will get you all the help',
        title : 'This is the help page!'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.render('error',{
            message : 'Please enter an address',
            name: 'Jugal Bhatt',
            title: 'Enter Address'
        })
    }
    else{
        geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){      

                return res.send({error})
                
            }
        
            
            forecast(latitude,longitude, (error, foreCast) => {
                if(error){
                    return res.send({error})
                }
                res.send({location :location,
                    foreCast: foreCast,
                    entry: req.query.address})
              })
            
        })}
})

 
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        res.render('error',{
            name:'Jugal Bhatt',
            title: 'Search is invalid',
            message :'Please enter a search term'
        })
    }
    else{
    
    res.send({
        products:[] 
    })}
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message : 'Help article Not found',
        name: 'Jugal Bhatt',
        title: 'ERROR 404'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        message : 'Page Not Found',
        name: 'Jugal Bhatt',
        title: 'ERROR 404'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port: '+port)
})

