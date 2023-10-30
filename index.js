mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhbmVzdGViYW4iLCJhIjoiY2xvOXFiYXdnMGo0NDJqcXByMWp5eGt2NCJ9.M4IK9Cm2MPbyj26ZXeukug";
let currentMarkers = [];
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-118.243683, 34.052235],
  zoom: 9,
});
function publicTransportTrack() {
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
        currentMarkers.push(marker);
      });
    });
}
publicTransportTrack();
setInterval(function () {
  publicTransportTrack();

  if (currentMarkers !== null) {
    for (var i = currentMarkers.length - 1; i >= 0; i--) {
      currentMarkers[i].remove();
    }
  }
  publicTransportTrack();
}, 10000);
