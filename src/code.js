var map = require('./map');
var Rx = require('rx');

var quakes = Rx.Observable.create(function(observer) {
	window.eqfeed_callback = function(response) {
		quakes.forEach(function(quake) {
			observer.onNext(quake);
			observer.onCompleted();
		});
	};

	map.loadJSONP(map.QUAKE_URL);

}).flatMap(function transform(dataset){
	return Rx.Observable.from(dataset.response.features);
});


quakes.subscribe(function(quake) {
	console.log(quake);
	var coords = quake.geometry.coordinates;
	var size = quake.properties.mag * 10000;

	L.circle([coords[1], coords[0]], size).addTo(mag);
});
