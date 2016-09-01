var map = require('./map');
var Rx = require('rx');
var DOM = require('rx-dom');

//all divs
var table = document.getElementById('quakes_info');
var codeLayers = {};
var quakeLayer = L.layerGroup([]).addTo(map);
var identity = Rx.helper.identity;

function initialize() {
	var quakes = Rx.Observable.interval(5000)
	.flatMap(function(){
		return Rx.DOM.jsonpRequest({
		url: map.QUAKE_URL,
		jsonpCallback: "eqfeed_callback"
		}).retry(3);
	})
	.flatMap(function transform(dataset){
		console.log(dataset);
		return Rx.Observable.from(dataset.response.features);
	})
	.distinct(function(quake){
		return quake.properties.code;

	}).share();/*.map(function(quake){
		return {
			lat: quake.geometry.coordinates[1],
			lng: quake.geometry.coordinates[2],
			size: quake.properties.mag * 10000
		};
	});*/
	quakes.pluck('properties')
		.map(makeRow)
		.bufferWithTime(500)
		.filter(function(rows){ return rows.length > 0;})
		.map(function(rows){
			var fragment = document.createDocumentFragment();

			rows.forEach(function(row){
				fragment.appendChild(row);
			});

			return fragment;
		})
		.subscribe(function(fragment) {
			var row = fragment.firstChild;
			var circle = quakeLayer.getLayer(codeLayers[row.id]);

			isHovering(row).subscribe(function(hovering){
				circle.setStyle({color: hovering ? '#ff0000' : '#0000ff'});
			});

			Rx.DOM.click(row).subscribe(function(){
				map.panTo(circle.getLatLng());
			})

			table.appendChild(fragment);
		});


	quakes.subscribe(function(quake) {
		// console.log(quake);

		var coords = quake.geometry.coordinates;
		var	size = quake.properties.mag * 10000;

		var circle = L.circle([coords[1], coords[0]], size).addTo(map);
		quakeLayer.addLayer(circle);
		codeLayers[quake.id] = quakeLayer.getLayerId(circle);
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

function isHovering(element) {
	var over = Rx.DOM.mouseover(element).map(identity(true));
	var out = Rx.DOM.mouseout(element).map(identity(false));

	return over.merge(out);
}

function getRowFromEvent(event){
	return Rx.Observable
		.fromEvent(table, event)
		.filter(function(event) {
			vat el = event.target;
			return el.tagName == "TD" && el.parentNode.id.length;
		})
		.pluck('target', 'parentNode')
		.distinctUntilChanged();
}

Rx.DOM.ready().subscribe(initialize);
