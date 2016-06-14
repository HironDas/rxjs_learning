var Rx = require('rx');

function isVisible(obj) {
	return obj.x > -40 && obj.x < canvas.width + 40 &&
			obj.y > -40 && obj.y < canvas.height + 40;
}

function collision(target1, target2){
	return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
		(target1.y > target2.y - 20 && target1.y < target2.y + 20);
}

var ENEMY_FREQ = 1500;
var ENEMY_SHOOTING_FREQ = 750;
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
	.scan(function(enemyArray) {
		var enemy = {
			x: parseInt(Math.random() * canvas.width),
			y: -30,
			shots: []
		};

		Rx.Observable.interval(ENEMY_SHOOTING_FREQ)
			.subscribe(function(){
				enemy.shots.push({x: enemy.x, y: enemy.y });
				enemy.shots = enemy.shots.filter(isVisible);
			});

		enemyArray.push(enemy);
		return enemyArray.filter(isVisible);
	}, []);
