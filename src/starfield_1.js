var Rx = require('rx');
// var SpaceShip = require('./hero_1')

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var enemyShip="";
enemyShip += "<svg version=\"1.1\" id=\"object\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" x=\"0px\" y=\"0px\"";
enemyShip += "	 width=\"80px\" height=\"80px\" viewBox=\"0 0 800 800\" enable-background=\"new 0 0 800 800\" xml:space=\"preserve\">";
enemyShip += "<path stroke=\"#000000\" stroke-miterlimit=\"10\" d=\"M579.764,697.098c0.005-1.02,0.005-2.038-0.006-3.054";
enemyShip += "	c-0.007-0.585-0.019-1.169-0.03-1.752c-0.02-0.94-0.044-1.88-0.077-2.816c-0.021-0.597-0.043-1.193-0.069-1.789";
enemyShip += "	c-0.042-0.95-0.094-1.897-0.149-2.843c-0.033-0.561-0.063-1.122-0.101-1.681c-0.076-1.118-0.166-2.233-0.261-3.346";
enemyShip += "	c-0.032-0.376-0.058-0.753-0.092-1.128c-0.132-1.441-0.281-2.877-0.445-4.31c-0.064-0.559-0.139-1.115-0.207-1.673";
enemyShip += "	c-0.112-0.902-0.225-1.806-0.35-2.705c-0.089-0.649-0.187-1.297-0.282-1.945c-0.12-0.805-0.243-1.607-0.372-2.408";
enemyShip += "	c-0.109-0.677-0.223-1.352-0.339-2.025c-0.133-0.771-0.273-1.541-0.416-2.309c-0.127-0.683-0.252-1.366-0.386-2.046";
enemyShip += "	c-0.151-0.769-0.313-1.534-0.475-2.3c-0.14-0.665-0.273-1.333-0.42-1.996c-0.29-1.31-0.593-2.615-0.91-3.916";
enemyShip += "	c-0.184-0.753-0.381-1.501-0.573-2.251c-0.163-0.636-0.323-1.272-0.493-1.905c-0.21-0.785-0.43-1.566-0.65-2.348";
enemyShip += "	c-0.165-0.586-0.33-1.172-0.5-1.756c-0.235-0.804-0.476-1.605-0.721-2.405c-0.165-0.538-0.334-1.075-0.503-1.611";
enemyShip += "	c-0.265-0.836-0.531-1.67-0.807-2.501c-0.146-0.441-0.298-0.879-0.447-1.319c-1.117-3.289-2.319-6.539-3.608-9.747";
enemyShip += "	c-0.041-0.1-0.079-0.2-0.119-0.3c-0.405-1.004-0.824-2.001-1.246-2.996c-0.116-0.274-0.231-0.549-0.349-0.822";
enemyShip += "	c-0.42-0.977-0.849-1.948-1.284-2.917c-0.116-0.258-0.233-0.516-0.351-0.773c-0.459-1.009-0.925-2.014-1.4-3.013";
enemyShip += "	c-0.061-0.127-0.122-0.252-0.183-0.379c-13.085-27.312-32.486-51.094-56.394-69.369c6.087-30.72,9.918-63.153,11.127-96.749";
enemyShip += "	c2.217-61.672-4.641-120.085-18.597-171.642c0.573,0.107,1.148,0.211,1.721,0.32l-6.646-17.293";
enemyShip += "	c-16.93-54.539-42.056-100.43-72.837-132.978c-0.002-0.001-0.003-0.002-0.005-0.004c-0.971-1.027-1.948-2.039-2.931-3.04";
enemyShip += "	c-0.09-0.091-0.178-0.186-0.268-0.276c-0.912-0.925-1.831-1.835-2.753-2.737c-0.154-0.152-0.308-0.309-0.463-0.459";
enemyShip += "	c-1.068-1.04-2.144-2.065-3.225-3.074c-1.147,0.925-2.289,1.867-3.427,2.824c-0.246,0.207-0.489,0.423-0.735,0.631";
enemyShip += "	c-0.899,0.764-1.797,1.531-2.689,2.315c-0.188,0.165-0.374,0.336-0.562,0.502c-0.956,0.845-1.909,1.696-2.856,2.563";
enemyShip += "	c-0.096,0.088-0.19,0.179-0.287,0.267c-66.576,61.129-114.102,177.93-118.981,313.599c-1.208,33.604,0.282,66.236,4.147,97.319";
enemyShip += "	c-49.95,32.783-83.786,88.465-86.098,152.72c-0.88,24.466,2.935,48,10.562,69.779c20.141-46.539,58.204-83.27,105.203-101.814";
enemyShip += "	c2.612,6.717,5.352,13.275,8.224,19.653c5.222-1.452,10.522-2.717,15.888-3.793l-0.728,20.136l30.683,1.103";
enemyShip += "	c3.282,30.69,9.741,55.928,18.292,71.576c9.651-14.99,17.91-39.7,23.393-70.078l36.811,1.322l0.668-18.575";
enemyShip += "	c3.201,0.983,6.374,2.027,9.511,3.147c3.301-6.118,6.484-12.424,9.554-18.894c40.462,19.402,72.876,52.563,91.348,93.267";
enemyShip += "	c0.013,0.026,0.024,0.053,0.036,0.08c0.745,1.645,1.467,3.302,2.166,4.971c0.026,0.063,0.054,0.125,0.08,0.188";
enemyShip += "	c0.665,1.59,1.304,3.192,1.926,4.803c0.109,0.284,0.218,0.568,0.325,0.854c0.609,1.599,1.203,3.205,1.77,4.824";
enemyShip += "	c9.177-21.171,14.677-44.364,15.558-68.833c0.055-1.525,0.088-3.047,0.106-4.564C579.764,698.1,579.762,697.599,579.764,697.098z\"\/>";
enemyShip += "<g>";
enemyShip += "	<g>";
enemyShip += "		<g id=\"rocket_2_\">";
enemyShip += "			<polygon fill=\"#107570\" points=\"338.533,689.556 447.711,693.479 449.006,657.473 339.834,653.545 			\"\/>";
enemyShip += "			<path fill=\"#D02125\" d=\"M396.882,501.813c-105.281-3.781-193.709,78.492-197.498,183.782c-0.88,24.466,2.935,48,10.562,69.779";
enemyShip += "				c30.295-70,101.126-117.827,181.944-114.923c80.823,2.911,148.037,55.702,173.204,127.691";
enemyShip += "				c9.177-21.171,14.677-44.364,15.558-68.833C584.438,594.011,502.163,505.598,396.882,501.813z\"\/>";
enemyShip += "			<path fill=\"#9F0611\" d=\"M440.331,648.617c58.515,17.702,104.829,62.547,124.763,119.525";
enemyShip += "				c9.177-21.171,14.677-44.364,15.558-68.833c3.18-88.468-54.41-164.994-135.328-189.438L440.331,648.617z\"\/>";
enemyShip += "			<path fill=\"#FDFDFD\" d=\"M281.335,435.556c-3.229,89.855,12.82,172.772,42.037,237.657c21.448-5.964,44.18-8.83,67.628-7.982";
enemyShip += "				c23.445,0.844,45.906,5.328,66.89,12.82c33.78-62.619,55.752-144.166,58.986-234.014c5.13-142.739-38.31-268.052-106.003-331.183";
enemyShip += "				C338.806,170.959,286.469,292.818,281.335,435.556z\"\/>";
enemyShip += "			<path fill=\"#B4B4B4\" d=\"M410.873,112.854c-8.225,6.631-23.853,552.312-23.853,552.312c1.328,0.024,2.649,0.015,3.979,0.064";
enemyShip += "				c23.445,0.844,45.906,5.328,66.89,12.82c33.78-62.619,55.752-144.166,58.986-234.014";
enemyShip += "				C522.006,301.298,478.566,175.985,410.873,112.854z\"\/>";
enemyShip += "			<path fill=\"#2EBCBC\" d=\"M318.98,247.775l-6.005,16.311c0,0,101.172-7.784,187.024,8.629l-7.18-18.681";
enemyShip += "				C492.82,254.035,377.342,235.474,318.98,247.775z\"\/>";
enemyShip += "			<path fill=\"#D02125\" d=\"M367.134,625.337c-2.138,59.36,6.289,111.123,20.373,136.897c15.897-24.69,28.032-75.719,30.168-135.083";
enemyShip += "				c2.136-59.362-6.301-111.13-20.381-136.9C381.396,514.95,369.268,565.972,367.134,625.337z\"\/>";
enemyShip += "			<path fill=\"#9F0611\" d=\"M386.871,760.968c0.222,0.408,0.423,0.864,0.636,1.267c15.897-24.69,28.032-75.719,30.168-135.083";
enemyShip += "				c2.136-59.362-6.301-111.13-20.381-136.9c-0.236,0.388-0.479,0.84-0.729,1.21L386.871,760.968z\"\/>";
enemyShip += "			<path fill=\"#107570\" d=\"M403.146,327.629c-25.365-0.917-46.737,18.973-47.649,44.325c-0.909,25.375,18.975,46.729,44.34,47.64";
enemyShip += "				c25.351,0.91,46.728-18.961,47.64-44.332C448.387,349.915,428.494,328.538,403.146,327.629z\"\/>";
enemyShip += "			<path fill=\"#D02125\" d=\"M318.98,247.775c28.372-0.861,57.415-0.861,87.03,0.206c29.604,1.069,58.578,3.142,86.81,6.053";
enemyShip += "				c-18.673-59.458-47.053-108.634-81.947-141.18C373.718,142.81,341.876,189.812,318.98,247.775z\"\/>";
enemyShip += "			<path fill=\"#9F0611\" d=\"M408.881,248.11c28.601,1.101,56.627,3.11,83.939,5.925c-18.673-59.458-47.053-108.634-81.947-141.18";
enemyShip += "				c-0.667,0.538-1.324,1.124-1.992,1.674V248.11z\"\/>";
enemyShip += "		<\/g>";
enemyShip += "	<\/g>";
enemyShip += "<\/g>";
enemyShip += "<\/svg>";


var heroShip="";
heroShip += "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" x=\"0px\" y=\"0px\"";
heroShip += "	 width=\"80px\" height=\"80px\" viewBox=\"0 0 1080 1080\" enable-background=\"new 0 0 1080 1080\" xml:space=\"preserve\">";
heroShip += "<g>";
heroShip += "	<path stroke=\"#0B0B0B\" stroke-width=\"6\" stroke-miterlimit=\"10\" d=\"M300.638,223.418l219.106-13.485";
heroShip += "		c-1.392,7.534-0.283,14.643,7.201,17.903c2.877,1.248,17.591,3.163,29.123,1.546c11.529,1.617,26.241-0.298,29.119-1.548";
heroShip += "		c7.416-3.229,8.57-10.237,7.237-17.692l219.07,13.276l0.003-46.113l-226.145,13.709c-0.254-0.509-0.503-1.002-0.736-1.463";
heroShip += "		c-4.132-8.135-16.605-37.6-28.241-40.022v-0.123c-0.103,0.013-0.206,0.044-0.31,0.062c-0.103-0.017-0.206-0.049-0.309-0.062v0.123";
heroShip += "		c-11.636,2.42-24.109,31.891-28.246,40.022c-0.265,0.522-0.547,1.083-0.838,1.667l-226.038-13.915L300.638,223.418z\"\/>";
heroShip += "	<path stroke=\"#0B0B0B\" stroke-width=\"6\" stroke-miterlimit=\"10\" d=\"M990.479,413.929c0-20.101-16.291-36.399-36.405-36.401H640.026";
heroShip += "		c-0.003-44.95-0.509-82.278-0.964-106.784h0.002c-0.347-18.682-0.665-29.919-0.708-31.382c-0.001-0.043-0.002-0.077-0.003-0.103";
heroShip += "		c-0.001-0.039-0.002-0.066-0.002-0.066h-82.059v-0.003l-82.512,0.003c0,0-0.001,0.026-0.002,0.064";
heroShip += "		c-0.059,2.028-1.667,57.994-1.672,138.271H158.056c-20.106,0-36.402,16.301-36.405,36.401l0.003,87.372";
heroShip += "		c0,20.105,16.298,36.406,36.404,36.404l316.326,0.001c2.452,81.76,7.278,168.29,16.277,242.685l-82.518,0.001";
heroShip += "		c-17.136,0.002-31.029,13.898-31.029,31.033l-0.001,64.137c0.001,17.132,13.893,31.03,31.033,31.03h106.19";
heroShip += "		c10.892,36.479,24.509,61.114,41.507,67.771v0.184c0.077-0.028,0.153-0.063,0.23-0.092c0.074,0.028,0.148,0.062,0.223,0.089v-0.178";
heroShip += "		c16.998-6.656,30.616-31.293,41.507-67.773h106.183c17.144,0,31.036-13.898,31.036-31.03l0.001-64.133";
heroShip += "		c0.003-17.134-13.892-31.037-31.037-31.04l-82.509,0.001c8.998-74.396,13.823-160.924,16.275-242.684l316.328,0.001";
heroShip += "		c20.105,0,36.402-16.301,36.406-36.406L990.479,413.929z\"\/>";
heroShip += "<\/g>";
heroShip += "<g>";
heroShip += "	<g>";
heroShip += "		<path fill=\"#90C73E\" d=\"M557.126,236.293l-82.512,0.003c0,0-20.574,697.059,82.514,735.35L557.126,236.293z\"\/>";
heroShip += "		<path fill=\"#1D592C\" d=\"M556.671,236.297h82.514c0,0,20.578,697.061-82.51,735.353L556.671,236.297z\"\/>";
heroShip += "	<\/g>";
heroShip += "	<g>";
heroShip += "		<path fill=\"#FBAD18\" d=\"M557.126,267.845v-31.552l-82.512,0.003c0,0-0.339,11.486-0.708,31.548H557.126z\"\/>";
heroShip += "		<path fill=\"#C2832B\" d=\"M639.897,267.848c-0.372-20.067-0.713-31.551-0.713-31.551h-82.514v31.545L639.897,267.848z\"\/>";
heroShip += "	<\/g>";
heroShip += "	<g>";
heroShip += "		<path fill=\"#C2832B\" d=\"M557.209,146.51c-11.809,1.471-24.655,31.87-28.864,40.146c-5.055,9.953-15.499,31.779-0.567,38.285";
heroShip += "			c2.903,1.259,17.857,3.199,29.433,1.504L557.209,146.51z\"\/>";
heroShip += "		<path fill=\"#FBAD18\" d=\"M557.209,146.51c-11.809,1.471-24.655,31.87-28.864,40.146c-5.055,9.953-15.499,31.779-0.567,38.285";
heroShip += "			c2.903,1.259,17.857,3.199,29.433,1.504L557.209,146.51z\"\/>";
heroShip += "		<path fill=\"#C2832B\" d=\"M556.591,146.51c11.809,1.474,24.654,31.867,28.859,40.146c5.056,9.953,15.506,31.779,0.57,38.282";
heroShip += "			c-2.903,1.262-17.855,3.201-29.43,1.506V146.51z\"\/>";
heroShip += "	<\/g>";
heroShip += "	<path fill=\"#FBAD18\" d=\"M616.356,557.863c0.001,32.836-26.617,59.455-59.455,59.455s-59.459-26.619-59.459-59.455";
heroShip += "		c0-32.836,26.621-59.458,59.459-59.458C589.74,498.405,616.358,525.023,616.356,557.863z\"\/>";
heroShip += "	<g>";
heroShip += "		<polygon fill=\"#C2832B\" points=\"538.092,205.958 301.471,220.522 301.469,174.407 538.093,188.974 		\"\/>";
heroShip += "		<polygon fill=\"#FBAD18\" points=\"572.068,205.961 812.328,220.522 812.331,174.409 572.07,188.974 		\"\/>";
heroShip += "	<\/g>";
heroShip += "	<g>";
heroShip += "		<path fill=\"#90C73E\" d=\"M991.318,498.405c-0.004,20.104-16.301,36.406-36.406,36.406l-796.021-0.002";
heroShip += "			c-20.106,0.002-36.404-16.299-36.404-36.404l-0.003-87.372c0.003-20.101,16.299-36.401,36.405-36.401h796.018";
heroShip += "			c20.114,0.002,36.405,16.301,36.405,36.401L991.318,498.405z\"\/>";
heroShip += "		<g>";
heroShip += "			<rect x=\"791.093\" y=\"476.563\" fill=\"#F8ED37\" width=\"140.766\" height=\"58.246\"\/>";
heroShip += "			<rect x=\"181.943\" y=\"476.563\" fill=\"#F8ED37\" width=\"140.756\" height=\"58.246\"\/>";
heroShip += "		<\/g>";
heroShip += "	<\/g>";
heroShip += "	<g>";
heroShip += "		<path fill=\"#30B44A\" d=\"M735.854,872.665c0,17.132-13.893,31.03-31.036,31.03h-295.84c-17.14,0-31.031-13.898-31.033-31.03";
heroShip += "			l0.001-64.137c0-17.135,13.894-31.031,31.029-31.033l295.842-0.003c17.146,0.003,31.04,13.906,31.037,31.04L735.854,872.665z\"\/>";
heroShip += "		<polygon fill=\"#90C73E\" points=\"578.739,777.497 535.054,777.495 535.057,903.695 578.741,903.698 		\"\/>";
heroShip += "	<\/g>";
heroShip += "<\/g>";
heroShip += "<\/svg>";


var DOMURL = window.URL || window.webkitURL || window;

var imgEnemy = new Image();
var imgHero = new Image();

var svgEnemy = new Blob([enemyShip], {type: 'image/svg+xml;charset=utf-8'});
var urlEnemy = DOMURL.createObjectURL(svgEnemy);

var svgHero = new Blob([heroShip], {type: 'image/svg+xml;charset=utf-8'});
var urlHero = DOMURL.createObjectURL(svgHero);

imgEnemy.onload = function () {
		  // ctx.drawImage(imgEnemy, 0, 0);
		  DOMURL.revokeObjectURL(urlEnemy);
		}

imgEnemy.src = urlEnemy;

imgHero.onload = function () {
		  // ctx.drawImage(imgEnemy, 0, 0);
		  DOMURL.revokeObjectURL(svgHero);
		}

imgHero.src = urlHero;

/*--contents--*/
var SPEED = 40;
var STAR_NUMBER = 250;
var ENEMY_FREQ = 1500;
var ENEMY_SHOOTING_FREQ = 750;
var	SHOOTING_SPEED = 15;
var HERO_Y = canvas.height - 90;
var SCORE_INCREASE = 10;
var TO_RADIANS = Math.PI/180;


/*--helpar function--*/
//Helper function to get a random integer
	function getRandomInt(min, max){
		return Math.floor(Math.random()*(max - min + 1)) + min;
	}

	function isVisible(obj) {
		return obj.x > -40 && obj.x < canvas.width + 40 &&
				obj.y > -40 && obj.y < canvas.height + 40;
	}

	function collision(target1, target2){
		return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
			(target1.y > target2.y - 20 && target1.y < target2.y + 20);
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


	function drawShip(img, x, y, angle){
		ctx.save();

		ctx.translate(x, y);
		ctx.rotate(angle * TO_RADIANS);
		ctx.drawImage(img, -40, -40);
		ctx.restore();
	}

	function paintStars(stars) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		stars.forEach(function(star) {
			ctx.fillRect(star.x, star.y, star.size, star.size);
			ctx.fillStyle = star.color;
		});
	}

	/*--paintin all spaceship---*/
	function paintSpaceShip(x, y) {
		// drawTriangle(x, y, 20, "#ff0000", 'up');
		drawShip(imgHero, x, y, 0);
	}

	function paintEnemies(enemies) {
		// console.log(enemies);
		enemies.forEach(function(enemy) {
			enemy.y += 5;
			enemy.x += getRandomInt(-15, 15);

			if(!enemy.isDead){
				// drawTriangle(enemy.x, enemy.y, 20, "#00ff00", "down");
				// ctx.clearRect(0,0,canvas.width, canvas.height); 
				drawShip(imgEnemy, enemy.x, enemy.y, 180);
			}

			enemy.shots.forEach(function(shot){
				shot.y += SHOOTING_SPEED;
				drawTriangle(shot.x, shot.y, 5, "#00ffff", 'down');
			});
			
		});
	}


//helper function to draw every short in the array of shots 

function paintHeroShots(heroShots, enemies) {
		// console.log(heroShots);

	heroShots.forEach(function(shot) {
		for ( var l = 0; l < enemies.length; l++){
			var  enemy = enemies[l];
			if(!enemy.isDead && collision(shot, enemy)) {
				ScoreSubject.onNext(SCORE_INCREASE);
				enemy.isDead = true;
				shot.x = shot.y = -100;
				break;
			}
		}
		shot.y -= SHOOTING_SPEED;
		drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
	});
}

function gameOver(ship, enemies) {
	return enemies.some(function(enemy){

		if(collision(ship, enemy)){
			return true;
		}

		return enemy.shots.some(function(shot) {
			return collision(ship, shot);
		})
	})
}

function paintScore(score) {
	ctx.fillStyle = "#ffffff";
	ctx.font = "bold 26px sans-serif";
	ctx.fillText('Score: ' + score, 40, 43);
}


/*----------*****--------------
	Reactive Code
------------*****--------------*/

var ScoreSubject = new Rx.Subject();
var score = ScoreSubject.scan(function(pre, cur) {
	return pre + cur;
}, 0).startWith(0);

var playerShots = Rx.Observable
	.merge(
		Rx.Observable.fromEvent(canvas, 'click'),
		Rx.Observable.fromEvent(document, 'keydown')
		.filter(function(evt){ return evt.keyCode === 32; })
	);

var StarStream = Rx.Observable.range(1, STAR_NUMBER)
	.map(function(){
		return {
			x: parseInt(Math.random() * canvas.width),
			y: parseInt(Math.random() * canvas.height),
			size: Math.random() * 3 +1,
			color: "#ffffff"
		};
	})
	.toArray()
	.flatMap(function(starArray) {
		return animationLoop().map(function() {
			return starArray.map(function(star) {
				if(star.y >= canvas.height) {
					star.y = 0;
				}
				star.y += 3;
				return star;
			});
		});
	});

var StarStreamFaraway = Rx.Observable.range(1, STAR_NUMBER)
	.map(function(){
		return {
			x: parseInt(Math.random() * canvas.width),
			y: parseInt(Math.random() * canvas.height),
			size: Math.random() * 3 +1,
			color: "#ffffff"
		};
	})
	.toArray()
	.flatMap(function(starArray) {
		return Rx.Observable.interval(60).map(function() {
			return starArray.map(function(star) {
				if(star.y >= canvas.height) {
					star.y = 0;
				}
				star.y += 3;
				return star;
			});
		});
	});

var newStar = Rx.Observable.combineLatest(StarStream, StarStreamFaraway, 
	function(stars, starsFaraway){
		return starsFaraway.concat(stars);
});

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
	
/*---Hero Firing functions---*/
playerFiring= playerShots
	.startWith({})
	.sample(200)
	.timestamp();

var HeroShots = Rx.Observable.combineLatest(
	playerFiring, SpaceShip,
	function(shotEvents, spaceShip){
		// console.log(shotEvents);
		return {
			timestamp: shotEvents.timestamp,
			x: spaceShip.x
		};
	})
	.distinctUntilChanged( function(shot) { return shot.timestamp; })
	.scan(function(shotArray, shot){
		shotArray.push({x: shot.x, y: HERO_Y});
		return shotArray;
	},[]);

	


	/*---enemy Spaceship---*/
	/*var Enemies = Rx.Observable.interval(ENEMY_FREQ)
				.scan(function(enemyArray){
					 enemyArray.push({
						x: parseInt(Math.random()*canvas.width),
						y: -30
					})
					return enemyArray;
				},[]);
*/
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
	.scan(function(enemyArray) {
		var enemy = {
			x: parseInt(Math.random() * canvas.width),
			y: -30,
			shots: []
		};

		Rx.Observable.interval(ENEMY_SHOOTING_FREQ)
			.subscribe(function(){

				if(!enemy.isDead) {
					enemy.shots.push({x: enemy.x, y: enemy.y });
				}
				enemy.shots = enemy.shots.filter(isVisible);
			});

		enemyArray.push(enemy);
		return enemyArray.filter(isVisible)
				.filter(function(enemy) {
					return !(enemy.isDead && enemy.shots.length === 0);
				});
	}, []);

var Game = Rx.Observable
	.combineLatest(
		newStar,  SpaceShip, Enemies, HeroShots, score,
		function(stars, spaceship, enemies, heroShots, score) {

			return {
				stars: stars,
				spaceship: spaceship, 
				enemies: enemies,
				heroShots: heroShots,
				score: score
			};
		}).sample(SPEED)
	.takeWhile(function(actors){
		return gameOver(actors.spaceship, actors.enemies) === false;
	});

Game.subscribe(function(actors){
	console.log(actors.stars);
	paintStars(actors.stars);
	paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
	paintEnemies(actors.enemies);
	paintHeroShots(actors.heroShots, actors.enemies);
	paintScore(actors.score);
});


/*--helper functions*/
function animationLoop(scheduler) {
	return Rx.Observable.generate(
		0,
		function(){ return true; },
		function(x){return x+1; },
		function(x){ return x; },
		Rx.Scheduler.requestAnimationFrame);
}