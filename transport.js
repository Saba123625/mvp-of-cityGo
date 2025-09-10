const togleButton = document.querySelector(".toggle-btn");
const secondColumn = document.querySelector(".secondColumn");
togleButton.addEventListener("click", () => {
secondColumn.classList.toggle("show");
togleButton.textContent = secondColumn.classList.contains("show")? "⬇" : "⬆";
});

const map1 = L.map('map1', {
  zoomControl: false 
}).setView([41.7151, 44.8271], 13);

L.control.zoom({
  position: 'bottomright' 
}).addTo(map1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map1);

fetch('data/transport.json')
  .then(res => res.json())
  .then(data => {
    data.forEach((spot, index) => {
      const marker = L.marker([spot.lat, spot.lng])
        .addTo(map1)
        .bindPopup(`<b>${spot.name}</b>`);
      
      if(index === 0) marker.openPopup();
    });
  });

  const parkingSpots = [
  { "name": "bus station", "lat": 41.8151, "lng": 44.7271 },
  { "name": "taxi Rideshare", "lat": 41.8185, "lng": 44.820},
  { "name": "public transport", "lat": 41.7800, "lng": 44.7300 }
];

const searchInput = document.createElement("input");
searchInput.placeholder = "where aryou going?";
searchInput.classList.add("searchinput");
document.body.appendChild(searchInput);

let markers = [];
searchInput.addEventListener("input", () => {
  markers.forEach(m => map1.removeLayer(m));
  markers = [];

  const query = searchInput.value.toLowerCase();
  parkingSpots.forEach(spot => {
    if(spot.name.toLowerCase().includes(query)) {
      const m = L.marker([spot.lat, spot.lng]).addTo(map1).bindPopup(spot.name).openPopup();
      markers.push(m);
      map1.setView([spot.lat, spot.lng], 15);
    }
  });
});