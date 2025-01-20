// Variables
const search = document.querySelector("#search");
const input = document.querySelector("#input");
const currentLocation = document.querySelector("#currentLocation");
const celsius = document.querySelector("#celsius");
const fahrenheit = document.querySelector("#fahrenheit");
let isCelsius = true;

// Events
celsius.addEventListener("click", function (e) {
  changeType(e);
});
fahrenheit.addEventListener("click", function (e) {
  changeType(e);
});
currentLocation.addEventListener("click", getPermissionGeolocation);
search.addEventListener("click", getPossiblesLocations);

// Functions
function getPermissionGeolocation() {
  if ("geolocation" in navigator) {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(getGeolocation);
      } else if (result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(getGeolocation, handleError);
      } else if (result.state === "denied") {
        alert(
          "Geolocation permission was denied. Please enable it in your browser settings."
        );
      }
    });
  } else {
    alert("Your browser doesn't support geolocation.");
  }
}

async function getGeolocation(position) {
  let lat = await position.coords.latitude;
  let lon = await position.coords.longitude;

  console.log(lat, lon);

  requestWeatherAPI(lat, lon);
}

function handleError(error) {
  console.error("Error getting geolocation:", error);
}

async function requestWeatherAPI(lat, lon) {
  fetch("http://127.0.0.1:4625/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lat: lat,
      lon: lon,
      unit: isCelsius ? "metric" : "imperial", // Celsius or Fahrenheit
    }),
  }).catch((e) => console.error("Error in request with an API", e));
}

async function getPossiblesLocations() {
  let local = !input.value.trim() ? alert("Insert something") : input.value;
  if (!local) {
    return;
  }

  let data = fetch(
    `https://nominatim.openstreetmap.org/search?q=${local}&format=json&addressdetails=1`
  )
    .then((r) => {
      if (!r.ok) {
        throw new Error("Error in request");
      }
      return r.json();
    })
    .then(async (d) => await d)
    .catch((e) => console.error(`Error in request: ${e}`));

  console.log(data);
}

function showPossibleLocations(array) {
  console.log(`SHOWPOSSIBLELOCATIONS ${array}`);
}

async function getLocate(LOCATION) {
  const data = fetch(
    `https://nominatim.openstreetmap.org/search?q=${LOCATION}&format=json&addressdetails=1`
  )
    .then((r) => r.json())
    .then((d) => d)
    .catch((e) => console.error(`FETCH ERROR: ${e}`));

  // return data.state ? `${data.name}, ${data.state}, ${data.country}` : `${data.name}, ${data.country}`;
  return data;
}

function changeType(e) {
  let types = {
    0: "celsius",
    1: "fahrenheit",
  };

  let item = e.target;

  if (item.id === types[0] && !item.classList.contains("actived")) {
    item.classList.add("actived");
    fahrenheit.classList.remove("actived");
    isCelsius = true;
  } else if (item.id === types[1] && !item.classList.contains("actived")) {
    item.classList.add("actived");
    celsius.classList.remove("actived");
    isCelsius = false;
  }
}
