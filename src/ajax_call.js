var Rx = require('rx');
var DOM = require('rx-dom');
function get(url) {
	return Rx.Observable.create(function(observer){
		var req = new XMLHttpRequest();
		req.open('GET', url);

		req.onload = function(){
			if(req.status == 200){
				observer.onNext(req.response);
				observer.onCompleted();
			}
			else {
				observer.onError(new Error(req.statusText));
			}
		};

		req.onerror = function(){

			observer.onError(new Error('Unknown Error'));
		};
		req.send();
	});
}

var test = get('/api/contents.json');

test.subscribe(
	function noNext(x) { console.log('Result: '+x);},
	function noError(err) { console.log('Error: '+err);},
	function noCompleted() { console.log('Completed');}
); 


Rx.DOM.get('./api/contents.json').subscribe(
	function onNext(x) { console.log('Result: '+x);},
	function onError(err) { console.log('Error: '+err);},
	function onCompleted() { console.log('Completed');}
)