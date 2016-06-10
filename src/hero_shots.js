var Rx = require('rx');

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
		return {x: spaceShip.x};
	})
	.scan(function(shorArray, shot){
		shotArray.push({x: shot.x, y: HERO_Y});
	},[]);

//helper function to draw every short in the array of shots 
var	SHOOTING_SPEED = 15;

function paintHeroShots(heroShots) {
	heroShots.forEach(function(shot) {
		shot.y -= SHOOTING_SPEED;
		drawTrinagle(shot.x, shor.y, 5, '#ffff00', 'up');
	});
}