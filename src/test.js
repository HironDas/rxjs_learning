var Rx = require('rx');

Rx.Observable.fromArray([1,2,3,4,2,3,4,2]).distinct()
	.toArray()
	.subscribe(function(d){
		console.log(d);
	})