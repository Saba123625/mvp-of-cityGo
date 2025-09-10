const map = L.map('map', {
  zoomControl: false 
}).setView([41.7151, 44.8271], 13);

L.control.zoom({
  position: 'bottomright' 
}).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


fetch('data/parking.json')
  .then(res => res.json())
  .then(data => {
    data.forEach((spot, index) => {
      const marker = L.marker([spot.lat, spot.lng])
        .addTo(map)
        .bindPopup(`<b>${spot.name}</b>`);
      
      if(index === 0) marker.openPopup();
    });
  });
  const togleButton = document.querySelector(".toggle-btn");
  const secondColumn = document.querySelector(".secondColumn");
togleButton.addEventListener("click", () => {
secondColumn.classList.toggle("show");
togleButton.textContent = secondColumn.classList.contains("show")? "⬇" : "⬆";
});



const parkingSpots = [
  { name: "Central Parking", lat: 41.7151, lng: 44.8271 },
  { name: "Mall Parking", lat: 41.7185, lng: 44.7920 },
  { name: "City Center Garage", lat: 41.7200, lng: 44.8300 },

];

const searchInput = document.createElement("input");
searchInput.placeholder = "Search by street or parking number";
searchInput.classList.add("search-input");
document.body.appendChild(searchInput);

let markers = [];
searchInput.addEventListener("input", () => {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const query = searchInput.value.toLowerCase();
  parkingSpots.forEach(spot => {
    if(spot.name.toLowerCase().includes(query)) {
      const m = L.marker([spot.lat, spot.lng]).addTo(map).bindPopup(spot.name).openPopup();
      markers.push(m);
      map.setView([spot.lat, spot.lng], 15);
    }
  });
});

map.locate({ setView: true, maxZoom: 16 });

let userLatLng = null;
map.on('locationfound', (e) => {
  userLatLng = e.latlng;

  L.marker(userLatLng)
    .addTo(map)
    .bindPopup("your location")
    .openPopup();
});

map.on('locationerror', () => {
  alert("მდებარეობა ვერ მოიძნება");
});


const startBtn = document.querySelector(".parkingButton");
startBtn.addEventListener("click", () => {
  if(!userLatLng) {
    alert("მდებარეობა ჯერ ვერ მოიძებნა!");
    return;
  }

  const destination = L.latLng(41.7151, 44.8271); 

  L.Routing.control({
    waypoints: [userLatLng, destination],
    routeWhileDragging: true,
    showAlternatives: true,
    lineOptions: {
      styles: [{ color: 'red', opacity: 1, weight: 5 }]
    }
  }).addTo(map);
});