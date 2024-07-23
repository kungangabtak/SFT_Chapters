// Initialize the map
const map = L.map('map').setView([20, 0], 2);

// Add a tile layer to the map (OpenStreetMap tiles)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define the custom icon
const customIcon = L.icon({
    iconUrl: 'images/marker-icon.png',
    iconRetinaUrl: 'images/marker-icon-2x.png',
    shadowUrl: 'images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Function to add markers to the map
function addMarkers(chapters) {
    chapters.forEach(chapter => {
        if (chapter.latitude && chapter.longitude) {
            L.marker([parseFloat(chapter.latitude), parseFloat(chapter.longitude)], {icon: customIcon})
                .addTo(map)
                .bindPopup(`
                    <b>${chapter.name}</b><br>
                    Email 1: ${chapter.email1 || 'N/A'}<br>
                    Email 2: ${chapter.email2 || 'N/A'}<br>
                    Social Media: ${chapter.socialMediaHandle ? `<a href="${chapter.socialMediaLink}" target="_blank">${chapter.socialMediaHandle}</a>` : 'N/A'}
                `);
        }
    });
}

// Load the CSV file and parse it
Papa.parse("sft_chapters.csv", {
    download: true,
    header: true,
    complete: function(results) {
        addMarkers(results.data);
    }
});