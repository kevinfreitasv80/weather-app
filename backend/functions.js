const url = {
  currentWeather(lat, lon, unit) {
    // https://api.openweathermap.org/data/2.5/weather?lat=-3.7814272&lon=-38.486016&units=metric&appid=2db7ccdb8721e1d326386b50cb8d588c
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.KEYAPI}`;
    // Result
    /* {
      coord: { lon: -38.4876, lat: -3.771 },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d'
        }
      ],
      base: 'stations',
      main: {
        temp: 29.99,
        feels_like: 34.08,
        temp_min: 29.99,
        temp_max: 29.99,
        pressure: 1013,
        humidity: 66,
        sea_level: 1013,
        grnd_level: 1011
      },
      visibility: 10000,
      wind: { speed: 4.63, deg: 90 },
      clouds: { all: 40 },
      dt: 1737471923,
      sys: {
        type: 1,
        id: 8363,
        country: 'BR',
        sunrise: 1737448568,
        sunset: 1737492847
      },
      timezone: -10800,
      id: 6320062,
      name: 'Fortaleza',
      cod: 200
    } */
  },
  forecast(lat, lon, unit) {
    // https://api.openweathermap.org/data/2.5/forecast?lat=-3.7814272&lon=-38.486016&units=metric&appid=2db7ccdb8721e1d326386b50cb8d588c
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.KEYAPI}`;
    // Result
    /* 
      [
        '3PM',  '6PM',  '9PM',  '12AM', '3AM',
        '6AM',  '9AM',  '12PM', '3PM',  '6PM',
        '9PM',  '12AM', '3AM',  '6AM',  '9AM',
        '12PM', '3PM',  '6PM',  '9PM',  '12AM',
        '3AM',  '6AM',  '9AM',  '12PM', '3PM',
        '6PM',  '9PM',  '12AM', '3AM',  '6AM',
        '9AM',  '12PM', '3PM',  '6PM',  '9PM',
        '12AM', '3AM',  '6AM',  '9AM',  '12PM'
      ]
    */
  },
  airPollution(lat, lon) {
    // https://api.openweathermap.org/data/2.5/air_pollution?lat=-3.7814272&lon=-38.486016&appid=2db7ccdb8721e1d326386b50cb8d588c
    return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.KEYAPI}`;
    /* 
      
    */
  },
};

function getFormattedDate(arr) {
  let times = {
    0: "12AM",
    1: "1AM",
    2: "2AM",
    3: "3AM",
    4: "4AM",
    5: "5AM",
    6: "6AM",
    7: "7AM",
    8: "8AM",
    9: "9AM",
    10: "10AM",
    11: "11AM",
    12: "12PM",
    13: "1PM",
    14: "2PM",
    15: "3PM",
    16: "4PM",
    17: "5PM",
    18: "6PM",
    19: "7PM",
    20: "8PM",
    21: "9PM",
    22: "10PM",
    23: "11PM",
  };
  const listDate = [];
  const listHours = [];

  for (const el of arr) {
    let date = new Date(el.dt * 1000);
    let getMonth = date.getMonth() + 1;
    let getDate = date.getDate();
    let getHours = date.getHours();

    listDate.push(`${getMonth < 10 ? `0${getMonth}` : getMonth}/${getDate}`);
    listHours.push(`${times[getHours]}`);
  }

  return listDate, listHours;
}

module.exports = { url, getFormattedDate };
