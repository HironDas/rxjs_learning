var Rx = require('rx');
var SpaceShip = require('./hero_1')

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var SPEED = 40;
var STAR_NUMBER = 250;


function paintStars(stars) {
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#ffffff';
	stars.forEach(function(star) {
		ctx.fillRect(star.x, star.y, star.size, star.size);
	});
}

var StarStream = Rx.Observable.range(1, STAR_NUMBER)
	.map(function(){
		return {
			x: parseInt(Math.random() * canvas.width),
			y: parseInt(Math.random() * canvas.height),
			size: Math.random() * 3 +1
		};
	})
	.toArray()
	.flatMap(function(starArray) {
		return Rx.Observable.interval(SPEED).map(function() {
			starArray.forEach(function(star) {
				if(star.y >= canvas.height) {
					star.y = 0;
				}
				star.y += 3;
			});
			return starArray;
		});
	});

var Game = Rx.Observable
	.combineLatest(
		StarStream, SpaceShip,
		function(stars, spaceship) {
			return {stars: stars, spaceship: spaceship};
		});

Game.subscribe(function(actors){
	paintStars(actors.stars);
	paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
});