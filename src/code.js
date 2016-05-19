var map = require('./map');
var Rx = require('rx');
var DOM = require('rx-dom');


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


quakes.subscribe(function(quake) {
	console.log(quake);

	var coords = quake.geometry.coordinates;
	var	size = quake.properties.mag * 10000;

	L.circle([coords[1], coords[0]], size).addTo(map.map);
});
