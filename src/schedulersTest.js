var Rx = require('rx');

var arr = Array.from({length : 1000}, (d,i)=> i);

var timeStart = Date.now();
Rx.Observable.from(arr, null, null, Rx.Scheduler.default).subscribe(
	function onNext() {},
	function onError() {},
	function onCompleted(){
		console.log('Total Time: '+(Date.now() - timeStart)+ 'ms');
	});
console.log('Hi this is I');