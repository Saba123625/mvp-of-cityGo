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