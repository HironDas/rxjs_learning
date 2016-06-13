var Rx = require('rx');
// var SpaceShip = require('./hero_1')

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*--contents--*/
var SPEED = 40;
var STAR_NUMBER = 250;
var ENEMY_FREQ = 1500;
var	SHOOTING_SPEED = 15;
var HERO_Y = canvas.height - 30;


/*--helpar function--*/
//Helper function to get a random integer
	function getRandomInt(min, max){
		return Math.floor(Math.random()*(max - min + 1)) + min;
	}

	function drawTriangle(x, y, width, color, direction) {
		ctx.fillStyle = color,
		ctx.beginPath();
		ctx.moveTo(x - width, y);
		ctx.lineTo(x, direction === 'up' ? y - width : y + width);
		ctx.lineTo(x + width, y);
		ctx.lineTo(x - width, y);
		ctx.fill();
	}

	function paintStars(stars) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#ffffff';
		stars.forEach(function(star) {
			ctx.fillRect(star.x, star.y, star.size, star.size);
		});
	}

	/*--paintin all spaceship---*/
	function paintSpaceShip(x, y) {
		drawTriangle(x, y, 20, "#ff0000", 'up');
	}

	function paintEnemies(enemies) {
		console.log(enemies);
		enemies.forEach(function(enemy) {
			enemy.y += 5;
			enemy.x += getRandomInt(-15, 15);

			drawTriangle(enemy.x, enemy.y, 20, "#00ff00", "down");
		});
	}


//helper function to draw every short in the array of shots 

function paintHeroShots(heroShots) {
	heroShots.forEach(function(shot) {
		shot.y -= SHOOTING_SPEED;
		drawTrinagle(shot.x, shor.y, 5, '#ffff00', 'up');
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

	
/*---Hero Firing functions---*/
var playerFiring = Rx.Observable
	.merge(
		Rx.Observable.fromEvent(canvas, 'click'),
		Rx.Observable.fromEvent(canvas, 'keydown')
		.filter(function(evt){ return evt.keycode === 32; })
	).sample(200)
	.timestamp();

var HeroShots = Rx.Observable.combineLatest(
	playerFiring,
	SpaceShip,
	function(shotEvents, spaceShip){
		return {
			timestamp: shotEvents.timestamp,
			x: spaceShip.x
		};
	})
	.distinctUntilChanged( function(shot) { return shot.timestamp; })
	.scan(function(shorArray, shot){
		shotArray.push({x: shot.x, y: HERO_Y});
	},[]);

	
	/*---hero Spaceship---*/
	var mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');

	var SpaceShip = mouseMove.map(function(event) {
		return {
			x: event.clientX,
			y: HERO_Y
		};
	}).startWith({
		x: canvas.width / 2,
		y: HERO_Y
	});

	/*---enemy Spaceship---*/
	var Enemies = Rx.Observable.interval(ENEMY_FREQ)
				.scan(function(enemyArray){
					 enemyArray.push({
						x: parseInt(Math.random()*canvas.width),
						y: -30
					})
					return enemyArray;
				},[]);

var Game = Rx.Observable
	.combineLatest(
		StarStream, SpaceShip, Enemies, HeroShots,
		function(stars, spaceship, enemies, heroShots) {
			return {
				stars: stars, 
				spaceship: spaceship, 
				enemies: enemies,
				heroShots: heroShots
			};
		}).sample(SPEED);

Game.subscribe(function(actors){
	paintStars(actors.stars);
	paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
	paintEnemies(actors.enemies);
	paintHeroShots(actors.heroShots);
});
