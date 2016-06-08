var Rx = require('rx');

var playerFiring = Rx.Observable
	.merge(
	Rx.Observable.fromEvent(canvas, 'click'),
	Rx.Observable.fromEvent(canvas, 'keydown')
		.filter(function(evt){ return evt.keycode === 32; })
	).sample(200)
	.timeStamp();

var HeroShots = Rx.Observable.combineLatest(
	playerFiring,
	SpaceShip,
	function(shotEvents, spaceShip){
		return {x: spaceShip.x};
	})
	.scan(function(shorArray, shot){
		shotArray.push({x: shot.x, y: HERO_Y});
	},[]);