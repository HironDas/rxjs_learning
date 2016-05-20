var Rx = require('rx');
var DOM = require('rx-dom');

function getProducts(url){
	var subject;

	return Rx.Observable.create(function(observer) {
		if(!subject){
			subject = new Rx.AsyncSubject();
			Rx.DOM.get(url).subscribe(subject);
		}
		return subject.subscribe(observer);
	});
}

var products = getProducts('/products');

products.subscribe(
	function onNext(result) { console.log('Result 1: ', result.response);},
	function onError(error) { console.log('ERROR ', error);}
);

setTimeout(function(){
	products.subscribe(
		function onNext(result) { console.log('Result 1: ', result.response);},
		function onError(error) { console.log('ERROR ', error);}
	);
}, 5000);
