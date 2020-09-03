const iconImageSources = {
    greenArrow: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Green_Arrow_Down.svg/768px-Green_Arrow_Down.svg.png',
    redArrow: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Red_Arrow_Up.svg/768px-Red_Arrow_Down.svg.png'
}

const map = createMap('map', [45.743, 4.8476], 13);
const layers = {
    openStreetMap: createTileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
    ),
    hike: createTileLayer(
        'https://www.visorando.com/tiles/HIKINGMAP/{z}/{x}/{y}.png',
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
    ),
};
const waypoints = {};
const selectedWaypoints = {};

addLayerToMap(layers.hike, map);

// Events
map.on('click', (event) => addWaypoint(event.latlng));

// Functions
// ---------

function addWaypoint(coordinates) {
    const waypointId = Date.now().toString();
    const marker = createMarker(coordinates, {icon: createIcon(iconImageSources.greenArrow)});

    marker.on('click', function () {
        this.remove();
        delete waypoints[waypointId];
        refreshWaypointList();
    });

    waypoints[waypointId] = { marker };
    marker.addTo(map);
    refreshWaypointList();
}

function refreshWaypointList() {
    const listElement = document.getElementById('waypoint-list');

    listElement.innerHTML = '';

    for (let waypointId in waypoints) {
        let waypointElement = document.createElement('li');
        waypointElement.textContent = waypointId;
        listElement.appendChild(waypointElement);

        if (waypointId in selectedWaypoints) {
            waypointElement.classList.add('selected');
        }

        waypointElement.addEventListener('click', function () {
            if (!this.classList.contains('selected')) {
                addSelectedWaypoint(waypointId, waypoints[waypointId]);
            } else {
                removeSelectedWaypoint(waypointId);
            }

            refreshWaypointList();
        });
    }
}

function addSelectedWaypoint(waypointId, waypoint) {
    selectedWaypoints[waypointId] = waypoint;
}

function removeSelectedWaypoint(waypointId) {
    delete selectedWaypoints[waypointId];
}

// Leaflet helper functions
// ------------------------

function calculateDistanceBetween2Points(latLngA, latLngB) {
    return latLngA.distanceTo(latLngB);
}

function createMap(mapElementId, centerCoordinates, zoom) {
    return L.map(mapElementId).setView(centerCoordinates, zoom);
}

function createTileLayer(url, options) {
    return L.tileLayer(url, options);
}

function createMarker(coordinates = [0, 0], options = {}) {
    return L.marker(coordinates, options);
}

function addLayerToMap(layer, map) {
    layer.addTo(map);
}

function createIcon(iconImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Green_Arrow_Down.svg/768px-Green_Arrow_Down.svg.png', iconSize = [20, 20], iconAnchor = [10, 20], popupAnchor = [0, -14]) {
    return L.icon({
        iconUrl: iconImageUrl,
        iconRetinaUrl: iconImageUrl,
        iconSize,
        iconAnchor,
        popupAnchor
    });
}

/*
// Add a layer
L.tileLayer( 'https://www.visorando.com/tiles/HIKINGMAP/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add a marker
L.marker([45.74, 4.85], {}).addTo(map);

// Add another marker with a custom icon
var iconImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Green_Arrow_Down.svg/768px-Green_Arrow_Down.svg.png';
var myIcon = L.icon({
    iconUrl: iconImageUrl,
    iconRetinaUrl: iconImageUrl,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -14]
});

L.marker([45.73, 4.85], { icon: myIcon }).addTo(map);

// Add a marker using a divIcon
const myDivIcon = L.divIcon({className: 'my-div-icon'});
const myMarker = L.marker([45.735, 4.87], { icon: myDivIcon }).addTo(map);

// Events
map.on('click', (event) => {
  const marker = L.marker(event.latlng, { icon: myIcon }).addTo(map);
  marker.onClick((event) => {
    console.log(event)
  });
});

// Distances
var pointA = L.latLng(50.5, 30.5);
var pointB = L.latLng(45.7, 4.86);
var distanceAB = pointA.distanceTo(pointB);

console.log({distanceAB});

// Polyline
var latlngs = [
    [
      [45.7, 4.86],
      [45.77, 4.87],
      [45.68, 4.88]
    ],
    [
      [45.66, 4.87],
      [45.6, 4.86],
      [45.62, 4.88]
    ],
];
var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
// zoom the map to the polyline
map.fitBounds(polyline.getBounds());
*/
