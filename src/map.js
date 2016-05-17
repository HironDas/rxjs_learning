var L = require('leaflet');

var QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/' +
'summary/all_day.geojsonp';

function loadJSONP(url) {
	var script = document.createElement('script');
	script.src = url;

	var head = document.getElementByTagName('head')[0];

	head.appendChild(script);
}

var map = L.map('map').setView([33.858631, -118.279602], 7);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);