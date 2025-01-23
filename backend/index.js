require("dotenv/config");
const express = require("express");
const cors = require("cors");
const app = express();
const { url, getFormattedDate } = require("./functions");

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    //methods: "POST",
  })
);

app.post("/", async (req, res) => {
  const { lat, lon, unit } = req.body;

  if (!lat || !lon || !unit) {
    return;
  }

  //const promises = [];
  //const datas = [];

  //  const dataWeather = await fetch(url.currentWeather(lat, lon, unit))
  //    .then((r) => r.json())
  //    .then((d) => d)
  //    .catch((e) => `Error in request: ${e}`);

  //const dataForecast = await fetch(url.forecast(lat, lon, unit))
  //  .then((r) => r.json())
  //  .then(async (dataPromise) => {
  //    let list = await dataPromise.list;
  //    list = getFormattedDate(list);
  //    return list;
  //  })
  //  .catch((e) => `Error in request: ${e}`);

  const dataAirPollution = await fetch(url.airPollution(lat, lon))
    .then((r) => r.json())
    .then(async (data) => {
      let d = await data;
      let list = [];
      list.push(d.pm2_5, d.so2, d.no2, d.o3);
      return list;
    })
    .catch((e) => `Error in request: ${e}`);

  //promises.push(dataAirPollution, dataWeather, dataForecast);

  //Promise.all(promises);

  //const dataWeather = await fetch(url.currentWeather(lat, lon, unit))
  //  .then((r) => r.json())
  //  .then((d) => d)
  //  .catch((e) => `Error in request: ${e}`);
  //
  //if (dataWeather.cod === 200) {
  //  console.log(dataWeather.main.temp);
  //  console.log(dataWeather.name);
  //  console.log(new Date(dataWeather.dt * 1000)); // Date
  //  console.log(dataWeather.weather[0].description);
  //  console.log(dataWeather.humidity);
  //  console.log(dataWeather.main.pressure);
  //  console.log(dataWeather.visibility);
  //  console.log(dataWeather.main.feels_like);
  //  console.log(new Date(dataWeather.sys.sunrise * 1000)); // Sunrise
  //  console.log(new Date(dataWeather.sys.sunset * 1000)); // Sunset
  //  console.log(dataWeather.wind.speed);
  //  console.log(dataWeather.wind.deg);
  //}

  /* const dataAirPollution = fetch(url.airPollution(lat, lon))
    .then((r) => r.json())
    .then(async (data) => {
      let d = await data;
      console.log(d);
      console.log(d.pm2_5);
      console.log(d.so2);
      console.log(d.no2);
      console.log(d.o3);
    })
    .catch((e) => `Error in request: ${e}`);

  if (dataAirPollution) {
    console.log(dataAirPollution.pm2_5);
    console.log(dataAirPollution.so2);
    console.log(dataAirPollution.no2);
    console.log(dataAirPollution.o3);
  } */

  //let list;
  //const dataForecast = fetch(url.forecast(lat, lon, unit))
  //  .then((r) => r.json())
  //  .then(async (dataPromise) => {
  //    list = await dataPromise.list;
  //    list = getFormattedDate(list);
  //    console.log("BBBBBBBBBBBBBB", list);
  //  })
  //  .catch((e) => `Error in request: ${e}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running in PORT ${process.env.PORT}`);
});
