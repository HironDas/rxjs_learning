var Rx = require('rx');
// var evenTicks = 0;

function updateDistance(acc, i) {
	if(i%2 === 0){
		acc +=1;
	}

	return acc;
}

var ticksObservable = Rx.Observable
	.interval(1000)
	.scan(updateDistance, 0).take(10);

ticksObservable.subscribe(function(evenTicks) {
	console.log('Subscribe-1 -enenTicks: '+ evenTicks+ ' so far');
});
ticksObservable.subscribe(function(evenTicks) {
	console.log('Subscribe-2 -enenTicks: '+ evenTicks+ ' so far');
});