![image](https://github.com/TheBridge-FullStackDeveloper/map-exercise-LA-metro/assets/33903092/51876334-cc02-4c8d-b840-c6355c85046f)

# Map-exercise 🗺️

In this challenge, you'll need to use the map from [OpenFreeMap](https://openfreemap.org) to print in real time the public transport of Los Angeles. 🚌

You will use the library [MapLibre](https://maplibre.org) to display the map and the Metro’s Realtime API to get the public transport data.

## Tasks 📝

After you have initialized the map, in your `index.js` you have to:

- Center the map in Los Angeles, here the coordinates: `[-118.243683, 34.052235]`.
- Use the [Metro’s Realtime API](https://api.metro.net/) you have to display the Los Angeles public transport in the map by making petitions to this endpoint `https://api.metro.net/LACMTA/vehicle_positions/all`. 🚌

## Bonus 🏆

Create a code to refresh each `10` seconds and retrieve the new positions of the public transports and with a popup, display the ID of the vehicle.
