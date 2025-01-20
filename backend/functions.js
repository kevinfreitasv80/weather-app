const url = {
  currentWeather(lat, lon, unit) {
    // // https://api.openweathermap.org/data/2.5/weather?lat=-3.7814272&lon=-38.486016&units=metric&appid=2db7ccdb8721e1d326386b50cb8d588c
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.KEYAPI}`;
  },
  forecast(lat, lon, unit) {
    // https://api.openweathermap.org/data/2.5/forecast?lat=-3.7814272&lon=-38.486016&units=metric&appid=2db7ccdb8721e1d326386b50cb8d588c
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.KEYAPI}`;
  },
  airPollution(lat, lon, unit) {
    // https://api.openweathermap.org/data/2.5/air_pollution?lat=-3.7814272&lon=-38.486016&units=metric&appid=2db7ccdb8721e1d326386b50cb8d588c
    return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.KEYAPI}`;
  },
};

function getFormattedDate(arr) {
  const list = [];

  for (const el of arr) {
    let date = new Date(el.dt * 1000);
    list.push(`${date.getMonth() + 1}/${date.getDate()}`);
  }

  return list;
}

module.exports = { url, getFormattedDate };
