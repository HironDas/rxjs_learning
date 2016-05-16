var Rx = require('rx');

var avg = Rx.Observable.interval(1000)
			.scan((pre, cur) =>{
				return {
				 	sum: pre.sum + cur,
				 	count: pre.count + 1
				 }
			},{sum: 0, count: 0})
			.map((d)=> d.sum/d.count).take(10);

avg.subscribe(
	(x)=> console.log ('Average is: '+x)
);