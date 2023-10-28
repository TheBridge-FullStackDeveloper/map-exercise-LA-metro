mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhbmVzdGViYW4iLCJhIjoiY2xvOXFiYXdnMGo0NDJqcXByMWp5eGt2NCJ9.M4IK9Cm2MPbyj26ZXeukug";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-118.243683, 34.052235],
  zoom: 9,
});
setInterval(function () {
console.log("Cargando...")
fetch("https://api.metro.net/LACMTA/vehicle_positions/all")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("La solicitud no fue exitosa");
    }
    return response.json();
  })

  .then((data) => {
    data.forEach((vehicle) => {
      let marker = new mapboxgl.Marker()
        .setLngLat([vehicle.position.longitude, vehicle.position.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(vehicle.vehicle.vehicle_id))
        .addTo(map);
    });
});
}, 10000)
