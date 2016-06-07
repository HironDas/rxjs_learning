var Rx = require('rx');

var playerFiring = Rx.Observable
	.merge(
	Rx.Observable.fromEvent(canvas, 'click'),
	Rx.Observable.fromEvent(canvas, 'keydown')
		.filter(function(evt){ return evt.keycode === 32; })
	);