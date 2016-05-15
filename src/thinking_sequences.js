let Rx = require('rx');

Rx.Observable.fromEvent(document, 'click')
	.filter(function(d){ 
		return d.clientX > window.innerWidth/2;
	})
	.take(10)
	.subscribe(function(d){ 
		console.log('X: '+d.clientX+" Y: "+d.clientY);
	});