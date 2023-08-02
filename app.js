const express = require("express");
const https = require("https");
const fs = require("fs");

const homeFile = fs.readFileSync("index.html", "utf-8"); //utf -8 for avoiding buffer data
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

const replaceVal = (tempVal,orgVal)=>{
    let temp = tempVal.replace("{%temp%}",orgVal.main.temp);
    temp = temp.replace("{%min_temp%}",orgVal.main.temp_min);
    temp = temp.replace("{%max_temp%}",orgVal.main.temp_max);
    temp = temp.replace("{%cityName%}",orgVal.name);
    temp = temp.replace("{%feelsLike%}",orgVal.main.feels_like);
    temp = temp.replace("{%pressure%}",orgVal.main.pressure);
    temp = temp.replace("{%humidity%}",orgVal.main.humidity);
    temp = temp.replace("{%windSpeed%}",orgVal.wind.speed);
    temp = temp.replace("{%windDeg%}",orgVal.wind.deg);
    return temp;

};

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});


app.post("/",function(req,res){

    console.log(req.body.cityName);

    const query = req.body.cityName;
    const api = "a29524a8632f4d9b1818d631fdf0e449";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ api +"&units="+unit
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const arrData = [weatherData];
            // console.log(arrData);
            const realTimeData = arrData.map((val) =>replaceVal(homeFile,val)).join(" ");
            res.write(realTimeData);
        });
        response.on("end", (err)=>{
            if(err) return console.log("connection closed due to errors",err);
            res.end();
        });
    })
});


app.listen(3000,function(){
    console.log("server is running on port 3000");
})