// Variables
const list = document.querySelector("#list");
const input = document.querySelector("#input");
const search = document.querySelector("#search");
const loading = document.querySelector("#loading");
const not = document.querySelector("#notification");
const celsius = document.querySelector("#celsius");
const fahrenheit = document.querySelector("#fahrenheit");
const currentLocation = document.querySelector("#currentLocation");
let isCelsius = true;
const types = {
  bad: Symbol.for("bad"),
  good: Symbol.for("good"),
};

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
function notificate(content, type) {
  if (types[type]) {
    not.classList = "";
    not.classList.add(type);

    not.textContent = content;
    not.style.display = "block";

    setTimeout(() => {
      not.style.display = "none";
    }, 3000);
  } else {
    alert("Use wrong of notificate");
  }
}

function getPermissionGeolocation() {
  if ("geolocation" in navigator) {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(getGeolocation);
      } else if (result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(getGeolocation, handleError);
      } else if (result.state === "denied") {
        notificate(
          "Geolocation permission was denied. Please enable it in your browser settings.",
          "bad"
        );
      }
    });
  } else {
    notificate("Your browser doesn't support geolocation.", "bad");
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
  loading.style.display = "block";

  try {
    const response = await fetch("http://127.0.0.1:4625/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: lat, // Latitude
        lon: lon, // Longitude
        unit: isCelsius ? "metric" : "imperial", // Celsius or Fahrenheit
      }),
    }).catch((e) => console.error("Error in request with an API", e));

    const data = await response.json();
    console.log(data);

    loading.style.display = "none";
  } catch (err) {
    console.error("Error in request", err);
  }
}

async function getPossiblesLocations() {
  try {
    let local = input.value.trim();
    if (!local) {
      notificate("Insert something in input", "bad");
      return;
    }

    let data = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${local}&format=json&addressdetails=1`
    )
      .then((r) => r.json())
      .catch((e) =>
        console.error(`Error in get locations in API request: ${e}`)
      );

    console.log(data);
    showPossibleLocations(data);
  } catch (e) {
    console.error(`Error fetching locations: ${e}`);
    notificate("Failed to fetch locations", "bad");
  }
}

function showPossibleLocations(arr) {
  let geolocationOptions = [];
  list.replaceChildren();

  for (const elem of arr) {
    let option = document.createElement("div");
    option.textContent = `${elem.name}, ${elem.address.country}`;

    option.addEventListener("click", () => {
      let lat = elem.lat,
        lon = elem.lon;

      requestWeatherAPI(lat, lon);
    });

    list.appendChild(option);
    geolocationOptions.push(``);
  }
}

function getInforOfOptionsList() {}

/* async function getLocate(LOCATION) {
  const data = fetch(
    `https://nominatim.openstreetmap.org/search?q=${LOCATION}&format=json&addressdetails=1`
  )
    .then((r) => r.json())
    .then((d) => d)
    .catch((e) => console.error(`FETCH ERROR: ${e}`));

  // return data.state ? `${data.name}, ${data.state}, ${data.country}` : `${data.name}, ${data.country}`;
  return data;
} */

function changeType(e) {
  const buttons = { celsius, fahrenheit };

  isCelsius = e.target.id === "celsius"; // Verify if the Celsius or fahrenheit

  Object.values(buttons).forEach((btn) =>
    btn.classList.toggle("actived", btn === e.target)
  );
}
