var Rx = require('rx');

function getJSON(arr) {
	return Rx.Observable.from(arr).map(function(str){
		var parsedJSON = JSON.parse(str);
		return parsedJSON;
	});
}

getJSON([
	'{"1": 1, "2": 2}',
	'{"success: true}',
	'{"enabled": true}'
]).catch(Rx.Observable.just({
	error: "There was an error passing JSON"
})).subscribe(function(json){
	console.log("Parsed JSON: ",json);
},
function(err){
	console.log(err.message);
});