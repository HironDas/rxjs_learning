var Rx = require('rx');

var arr = Array.from({length : 1000}, (d,i)=> i);

/*var timeStart = Date.now();
Rx.Observable.from(arr, null, null, Rx.Scheduler.default).subscribe(
	function onNext() {},
	function onError() {},
	function onCompleted(){
		console.log('Total Time: '+(Date.now() - timeStart)+ 'ms');
	});
console.log('Hi this is I');*/


console.log('before subscription');

Rx.Observable.range(1, 5)
	.do((d)=> console.log('Processing value '+d))
	.map((value)=> value*value)
	.subscribe(function(value){
		console.log("Emitted "+value);
	});

console.log('after subscription');

console.log('before subscription');

Rx.Observable.range(1, 5)
	.do((d)=> console.log('Processing value '+d))
	.observeOn(Rx.Scheduler.default)
	.map((value)=> value*value)
	.subscribe(function(value){
		console.log("Emitted "+value);
	});

console.log('after subscription');