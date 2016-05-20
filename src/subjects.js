var Rx = require('rx');

var subject = new Rx.Subject();

var source = Rx.Observable.interval(300)
	.map(function(v) {return "Interval Message #"+v})
	.take(5);

source.subscribe(subject);

subject.subscribe(
	function onNext(x) {console.log('onNext: '+x);},
	function onError(err) {console.log('onError: '+err.message);},
	function onCompleted() {console.log('onCompleted');}
);

subject.onNext('Our Message #1');
subject.onNext('Our Message #2');

setTimeout(function(){
	subject.onCompleted();
}, 1000);
