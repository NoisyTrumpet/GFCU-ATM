// If browser supports navigator.geolocation, generate Lat/Long else let user know there is an error
const getPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, posError); // Passing in a success callback and an error callback fn
  } else {
    alert("Sorry, Geolocation is not supported by this browser."); // Alert is browser does not support geolocation
  }
};
// Geolocation error callback fn. Query permissions to check if the error occured due to user not allowing location to be shared
const posError = () => {
  if (navigator.permissions) {
    navigator.permissions.query({ name: "geolocation" }).then((res) => {
      if (res.state === "denied") {
        alert(
          "Enable location permissions for this website in your browser settings."
        );
      }
    });
  } else {
    alert(
      "Unable to access your location. You can continue by submitting location manually."
    ); // Obtaining Lat/long from address necessary
  }
};
// Geolocation success callback fn
const showPosition = (position) => {
  let lat = position.coords.latitude; // You have obtained latitude coordinate!
  let long = position.coords.longitude; // You have obtained longitude coordinate!
  props.set_lat(lat); // Using dispatch to modify lat store state
  props.set_long(long); // Using dispatch to modify long store state
  convertToAddress(lat, long); // Will convert lat/long to City, State, & Zip code
};
// Fetching for google API key from back-end (Optional, you can store it in .env file in front-end)
const convertToAddress = (lat, long) => {
  fetch("http://localhost:3000/googlemaps")
    .then((res) => res.json())
    .then((obj) => getAddress(lat, long, obj.api_key));
};
// Converting lat/long from browser geolocation into city, state, and zip code using Google Geocoding API
const getAddress = (lat, long, googleKey) => {
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleKey}`
  )
    .then((res) => res.json())
    .then((address) => setZip(address));
};
// Dispatching city, state, and zip code to store state
const setZip = (address) => {
  let city = address.results[5].address_components[2].short_name;
  let state = address.results[5].address_components[4].short_name;
  let postal = address.results[5].address_components[0].short_name;
  props.set_city(city);
  props.set_state(state);
  props.set_postal_code(postal);
};
