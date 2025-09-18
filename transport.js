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

  const busStops  = [
  { "name": "ავტობუსი N1", "lat": 41.8151, "lng": 44.7271 },
  { "name": "ავტობუსი N2", "lat": 41.8185, "lng": 44.820},
  { "name": "ავტობუსი N3", "lat": 41.7800, "lng": 44.7300 }
];



busStops.forEach((stop) => {
  L.marker([stop.lat, stop.lng])
    .addTo(map1)
    .bindPopup(`<b>${stop.name}</b>`);
});


document.querySelectorAll('.transportUL li').forEach(li => {
  li.style.cursor = "pointer"; 
  li.addEventListener('click', () => {
    const busId = li.dataset.bus;       
    const coords = busStops[busId];
    if (coords) {
      
      map1.flyTo(coords, 14, { animate: true, duration: 1 });
    }
  });
});

