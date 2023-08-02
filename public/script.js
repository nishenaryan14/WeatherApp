const clickCity = document.getElementById('city2');
const something = document.querySelector('ul a');
const cont = document.getElementById('conta');
const one = document.getElementById('1');
const two = document.getElementById('2');
const three = document.getElementById('3');
const four = document.getElementById('4');
const five = document.getElementById('5');
const six = document.getElementById('6');
const seven = document.getElementById('7');
const eight = document.getElementById('8');
const nine = document.getElementById('9');
const ten = document.getElementById('10');
const submit = document.getElementById('submit');
const api = "a29524a8632f4d9b1818d631fdf0e449";
const unit = "metric";


const getWeather = (city)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ api +"&units="+unit
    fetch(url).then((apidata)=>{
        // console.log(apidata);
        return apidata.json();
    })
    .then((actualdata)=>{
        console.log(actualdata);
        const main = actualdata.main;
        const wind = actualdata.wind;
        // return actualdata.main && actualdata.wind;
        return [main,wind,actualdata.name,actualdata.weather[0].description]
    })
    .then((actualdata1)=>{
        console.log(actualdata1);
        if(city === cityInput.value || city === "delhi"){
            if(actualdata1[3]==="mist"){
                cont.classList.add('cont-foggy');
            }
            else if(actualdata1[3]==="scattered clouds"){
                cont.classList.add('cont-cloudy');
            }
            else if(actualdata1[3]==="sunny"){
                cont.classList.add('cont-sunny');
            }
            // else if(actualdata1[3]===""){
            //     cont.classList.add('cont
            // }


            // document.getElementById("temp").innerHTML = actualdata1[0].temp;
            // document.getElementById("min_temp").innerHTML = actualdata1[0].temp_min;
            // document.getElementById("max_temp").innerHTML = actualdata1[0].temp_max;
            // document.getElementById("feelsLike").innerHTML = actualdata1[0].feels_like;
            // document.getElementById("pressure").innerHTML = actualdata1[0].pressure;
            // document.getElementById("humidity").innerHTML = actualdata1[0].humidity;
            // document.getElementById("windSpeed").innerHTML = actualdata1[1].speed;
            // document.getElementById("windDeg").innerHTML = actualdata1[1].deg;
            // document.getElementById("city").innerHTML = actualdata1[2];
            mainWeather(actualdata1);
        }
        
})
.catch((err)=>{
    console.log('error is ${err}');
})
}

const mainWeather = (cityDetails) => {
    document.getElementById("temp").innerHTML = cityDetails[0].temp;
    document.getElementById("min_temp").innerHTML = cityDetails[0].temp_min;
    document.getElementById("max_temp").innerHTML = cityDetails[0].temp_max;
    document.getElementById("feelsLike").innerHTML = cityDetails[0].feels_like;
    document.getElementById("pressure").innerHTML = cityDetails[0].pressure;
    document.getElementById("humidity").innerHTML = cityDetails[0].humidity;
    document.getElementById("windSpeed").innerHTML = cityDetails[1].speed;
    document.getElementById("windDeg").innerHTML = cityDetails[1].deg;
    document.getElementById("city").innerHTML = cityDetails[2];
}


clickCity.addEventListener('click', (e)=>{
  e.preventDefault();
  city = clickCity.innerHTML
  console.log(city);
  getWeather(city);
})

// something.addEventListener('click', (e)=>{
//   e.preventDefault();
//   city = something.innerHTML
//   console.log(city);
//   getWeather(city);
// });

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    city = cityInput.value;
    getWeather(city);
})

getWeather("delhi");



const otherCities = [
      {
        Shanghai: {
          Min_temp:0,
          Max_temp:0,
          Pressure: 0,
          Humidity: 0,
          Wind_speed: 0,
        },
      },
      {
        Boston: {
          Min_temp: 0,
          Max_temp: 0,
          Pressure: 0,
          Humidity: 0,
          Wind_speed: 0,
        },
      },
      {
        Lucknow: {
          Min_temp: 0,
          Max_temp: 0,
          Pressure: 0,
          Humidity: 0,
          Wind_speed: 0,
        },
      },
      {
        Kolkata: {
          Min_temp: 0,
          Max_temp: 0,
          Pressure: 0,
          Humidity: 0,
          Wind_speed: 0,
        },
      },
];
    
// Declare and define the 'api' and 'unit' variables with appropriate values here

// Function to update the data in real-time
// Declare and define the 'api' and 'unit' variables with appropriate values here

// Function to update the data in real-time
async function updateRealTimeData(otherCities) {
  try {
    for (const cityData of otherCities) {
      for (const city in cityData) {
        const otherCityData = await otherWeather(city); // Wait for the weather data to be retrieved
        if (otherCityData) {
          console.log(otherCityData[1].speed)
          cityData[city].Min_temp = otherCityData[0].temp_min;
          cityData[city].Max_temp = otherCityData[0].temp_max;
          cityData[city].Pressure = otherCityData[0].pressure;
          cityData[city].Humidity = otherCityData[0].humidity;
          cityData[city].Wind_speed = otherCityData[1].speed;
        } else {
          console.log(`Weather data not available for ${city}`);
        }
      }
    }
    console.log(otherCities);
    one.innerHTML = otherCities[0].Shanghai.Min_temp;
    two.innerHTML = otherCities[0].Shanghai.Max_temp;
    three.innerHTML = otherCities[0].Shanghai.Pressure;
    four.innerHTML = otherCities[0].Shanghai.Humidity;
    five.innerHTML = otherCities[0].Shanghai.Wind_speed;
    six.innerHTML = otherCities[1].Boston.Min_temp;
    seven.innerHTML = otherCities[1].Boston.Max_temp;
    eight.innerHTML = otherCities[1].Boston.Pressure;
    nine.innerHTML = otherCities[1].Boston.Humidity;
    ten.innerHTML = otherCities[1].Boston.Wind_speed;
  } catch (err) {
    console.log('Error:', err);
  }
}

const otherWeather = async (city) => {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=" + unit;

  try {
    const response = await fetch(url);
    const actualdata = await response.json();
    console.log(actualdata);
    if (actualdata.main && actualdata.wind) {
      const main = actualdata.main;
      const wind = actualdata.wind;
      // return {
      //   temp_min: main.temp_min,
      //   temp_max: main.temp_max,
      //   pressure: main.pressure,
      //   humidity: main.humidity,
      //   wind_speed: wind.speed
      // };
      return [main,wind];
    } else {
      console.log(`Weather data not available for ${city}`);
      return null;
    }
  } catch (err) {
    console.log('Error:', err);
    throw err;
  }
}

// Call the function to update real-time data
updateRealTimeData(otherCities);


