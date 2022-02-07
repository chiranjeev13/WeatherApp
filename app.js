const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
  app.post("/", function(req,res){
    const city=req.body.City;
    url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=77fd5a043671399ab3d73d6e0fb901d3&units=metric"
    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const desc = weatherData.weather[0].description
        const temper = String(weatherData.main.temp)

        const icon = weatherData.weather[0].icon
        console.log(icon);
        const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write(desc)

        res.write(temper)
        res.send()
      })
    })
  })

})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server Started!!");
})
