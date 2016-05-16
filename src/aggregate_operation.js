var Rx = require('rx');

var avg = Rx.Observable.range(0,7)
			.reduce((pre, cur) =>{
				return {
				 	sum: pre.sum + cur,
				 	count: pre.count + 1
				 }
			},{sum: 0, count: 0})
			.map((d)=> d.sum/d.count);

avg.subscribe(
	(x)=> console.log ('Average is: '+x)
);