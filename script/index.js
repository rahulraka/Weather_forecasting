async function checkWeather() {
  try {
    let city = document.querySelector("#city").value;

    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f0fc6fd6d2f04acb6841feaed8a541a5&units=metric`
    );
    let data = await result.json();
    display(data);
    forecast(data);

    // console.log(data);
  } catch (err) {
    console.log(err);
  }
}

let syncData = syncd();
let date = new Date();
let newDay = date.getDay();
// console.log(syncData);

// appending data
let weather = document.querySelector("#weather");
let maps = document.querySelector("#map");
function display(data) {
  weather.innerHTML = null;
  maps.innerHTML = null;
  let name = document.createElement("h3");

  name.innerText = "🌆    "+ data.name;

  let temp = document.createElement("h3");
  temp.innerText = "🌡️    "+ data.main.temp + " " + "°C";

  let windSpeed = document.createElement("h3");
  windSpeed.innerText =
    "🌬️    "+ data.wind.speed + " " + "Km/s";

  let cloud = document.createElement("h3");
  cloud.innerHTML = "☁️    "+"Clear";

  let sync = document.createElement("h3");
  sync.setAttribute("id", "sync");
  sync.innerText = syncData;

  let map = document.createElement("iframe");
  map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDgkoXIt14MAnzxMQN3bCVepsma1y_QRF8&q=${data.name}`;

  maps.append(map, sync);
  weather.append(name, temp, windSpeed, cloud);
}

// https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon={lon}&appid=f0fc6fd6d2f04acb6841feaed8a541a5

// function for fetching forecast data from

async function forecast(data) {
  let lat = data.coord.lat;
  let lon = data.coord.lon;
  try {
    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f0fc6fd6d2f04acb6841feaed8a541a5&units=metric`
    );
    let forecastData = await result.json();
    forecastDisplay(forecastData);

    // console.log(forecastData);
  } catch (err) {
    console.log(err);
  }
}

let dayObj={0:"Sun",1:"Mon",2:"Tues",3:"Wed",4:"Thur",5:"Fri",6:"Sat"}



function forecastDisplay(forecastData) {
  let data = forecastData.daily;
  let container = document.getElementById("forecast");
  let x=newDay

  container.innerHTML=null;
  data.map(function (el) {
    // console.log(el);
    
    let iconcode = el.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    let main = document.createElement("div");

    let day = document.createElement("h3");
    day.setAttribute("class", "day");
    day.innerText = dayObj[x++%7];
    let image = document.createElement("img");
    image.setAttribute("class", "image");
    image.src = iconurl;

    let minTem = document.createElement("h3");
    minTem.setAttribute("class", "min");
    minTem.innerText = +el.temp.min.toFixed(0) + "°C";

    let maxTem = document.createElement("h3");
    maxTem.setAttribute("class", "max");
    maxTem.innerText = +el.temp.max.toFixed(0) + "°C";

    main.append(day, image, minTem, maxTem);
    container.append(main);
  });
}

const d = new Date();
let day = d.getDay()


// function for last sync time (seconds)
function syncd() {
  var currentdate = new Date();
  var datetime =
    "Last Sync: " +
    currentdate.getDay() +
    "/" +
    currentdate.getMonth() +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
}
