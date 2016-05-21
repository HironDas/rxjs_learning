var Rx = require('rx');

var cnavas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

doucment.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var SPEED = 40;
var STAR_NUMBER = 250;

var StarStream = Rx.Observable.range(1, STAR_NUMBER)
	.map(function(){
		return {
			x: parseInt(Math.random() * canvas.width),
			y: parseInt(Math.random() * convas.height),
			size: Math.random() * 3 +1
		};
	})
