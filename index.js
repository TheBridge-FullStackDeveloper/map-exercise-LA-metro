mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhbmVzdGViYW4iLCJhIjoiY2xvOXFiYXdnMGo0NDJqcXByMWp5eGt2NCJ9.M4IK9Cm2MPbyj26ZXeukug";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // Estilo de mapa predeterminado
  center: [-118.243683, 34.052235], // Coordenadas de ubicación inicial
  zoom: 9, // Nivel de zoom inicial
});

fetch("https://api.metro.net/LACMTA/vehicle_positions/all")
  .then((response) => {
    return response.json();
  })
  .then((vehicles) => {
    vehicles.forEach((vehicle) => {
      const coordinates = vehicle.geometry.coordinates;
      const vehicleID = vehicle.vehicle.vehicle_id;
      const newMarker = new mapboxgl.Marker({
        element: createCustomMarkerElement(), //I am adding this to change the style of the marker
      })
        .setLngLat(coordinates) // Use the coordinates array directly
        .setPopup(new mapboxgl.Popup().setHTML(vehicleID))
        .addTo(map);
    });
  });

// Function to create a custom marker element with inline styles
function createCustomMarkerElement() {
  const markerElement = document.createElement("div");
  markerElement.style.width = "10px"; // Set the width
  markerElement.style.height = "10px"; // Set the height
  markerElement.style.backgroundColor = "red"; // Set the background color
  markerElement.style.borderRadius = "50%"; // Make it round (for a circular marker)
  return markerElement;
}

//Function to refresh every 10 seconds
setInterval(fetchDataAndRefreshMap, 10000); 
