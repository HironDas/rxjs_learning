var Rx = require('rx');

var ENEMY_FREQ = 1500;
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
			.scan(function(enemyArray){
				enemyArray.push({
					x: parseInt(Math.random()*canvas.width),
					y: -30
				})
			},[]);

module.exports = Enemies;