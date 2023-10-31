mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhbmVzdGViYW4iLCJhIjoiY2xvOXFiYXdnMGo0NDJqcXByMWp5eGt2NCJ9.M4IK9Cm2MPbyj26ZXeukug";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-118.243683, 34.052235],
  zoom: 9,
});
function movimiento() {
  fetch("https://api.metro.net/LACMTA/vehicle_positions/all")
    .then((response) => response.json())
    .then((movimiento) => {
      movimiento.forEach((el) => {
        var marker = new mapboxgl.Marker()
          .setLngLat([el.position.longitude, el.position.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(el.vehicle.vehicle_id))
          .addTo(map);
      });
    });
}

movimiento();

setInterval(() => {
  return movimiento();
}, 10000);
