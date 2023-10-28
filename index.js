mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhbmVzdGViYW4iLCJhIjoiY2xvOXFiYXdnMGo0NDJqcXByMWp5eGt2NCJ9.M4IK9Cm2MPbyj26ZXeukug";

let map = new mapboxgl.Map({
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
    map.remove();
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-118.243683, 34.052235],
      zoom: 9,
    });

    vehicles.forEach((vehicle) => {
      const coordinates = vehicle.geometry.coordinates;
      const vehicleId = vehicle.vehicle.vehicle_id;
      const newMarker = new mapboxgl.Marker({
        element: createCustomMarkerElement(),
      })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(vehicleId))
        .addTo(map);
    });
  })
  .catch((error) => {
    console.error("La solicitud no se puede procesar: ", error);
  });

function Refresh() {
  fetch("https://api.metro.net/LACMTA/vehicle_positions/all")
    .then((response) => {
      return response.json();
    })
    .then((vehicles) => {
      map.remove();
      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-118.243683, 34.052235],
        zoom: 9,
      });

      vehicles.forEach((vehicle) => {
        const coordinates = vehicle.geometry.coordinates;
        const vehicleId = vehicle.vehicle.vehicle_id;
        const newMarker = new mapboxgl.Marker({
          element: createCustomMarkerElement(),
        })
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(vehicleId))
          .addTo(map);
      });
    })
    .catch((error) => {
      console.error("La solicitud no se puede procesar: ", error);
    });
}

// Function to create a custom marker element with inline styles
function createCustomMarkerElement() {
  const markerElement = document.createElement("div");
  markerElement.style.width = "6px"; // Set the width
  markerElement.style.height = "6px"; // Set the height
  markerElement.style.backgroundColor = "red";
  markerElement.style.borderRadius = "50%"; // Make it round (for a circular marker)
  return markerElement;
}

//Bonus: Function to refresh every 10 seconds - 10000 milliseconds
setInterval(Refresh, 10000);
