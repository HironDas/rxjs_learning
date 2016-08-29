var map = require('./map');
var Rx = require('rx');
var DOM = require('rx-dom');

//all divs
var table = document.getElementById('quakes_info');

function initialize() {
	var quakes = Rx.Observable.interval(5000)
	.flatMap(function(){
		return Rx.DOM.jsonpRequest({
		url: map.QUAKE_URL,
		jsonpCallback: "eqfeed_callback"
		}).retry(3);
	})
	.flatMap(function transform(dataset){
		return Rx.Observable.from(dataset.response.features);
	})
	.distinct(function(quake){
		return quake.properties.code;

	});/*.map(function(quake){
		return {
			lat: quake.geometry.coordinates[1],
			lng: quake.geometry.coordinates[2],
			size: quake.properties.mag * 10000
		};
	});*/
	quakes.pluck('properties')
		.map(makeRow)
		.subscribe(function(row) {
			table.appendChild(row);
		});


	quakes.subscribe(function(quake) {
		console.log(quake);

		var coords = quake.geometry.coordinates;
		var	size = quake.properties.mag * 10000;

		L.circle([coords[1], coords[0]], size).addTo(map.map);
	});
}

//helper functions
function makeRow(props) {
	var row = document.createElement('tr');
	row.id = props.net + props.code;

	var date = new Date(props.time);
	var time = date.toString();
	
	[props.place, props.mag, time].forEach(function(text) {
		var cell = document.createElement('td');
		cell.textContent = text;
		row.appendChild(cell);
	});

	return row;
}

Rx.DOM.ready().subscribe(initialize);
