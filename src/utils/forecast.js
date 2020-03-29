const request = require('request')
const chalk = require('chalk')
const express = require('express')




const forecast  = (latitude,longitude,callback)=>{
    const url ='https://api.darksky.net/forecast/57b80532419d0af7845e484581dc9414/'+encodeURIComponent(latitude)+',' + encodeURIComponent(longitude)+ '?units=us&lang=en'

    request({url ,json:true},(error,{body})=>{
        if(error){
            callback('Couldnt fetch the weather information due to poor internet connection  ',undefined)
        }else if(body.error){
            callback('The coordinates are incorrect',undefined)

        }else{
            
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            }
    })
}

module.exports = forecast


