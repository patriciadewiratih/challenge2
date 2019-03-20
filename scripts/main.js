
var clock = document.getElementById('clock');

function hexClock(){
	var time = new Date();	
	var hours = time.getHours().toString();
	var minutes = time.getMinutes().toString();
	var seconds = time.getSeconds().toString();

	if (hours.length < 2){
		hours = '0' + hours;
	}

	if (minutes.length < 2){
		minutes = '0' + minutes;
	}
	
	if (seconds.length < 2){
		seconds = '0' + seconds;
	}

	var clockStr = hours + ' : '+ minutes + ' : '+ seconds;
	var hexColorStr = '#' + seconds + hours + minutes;

	clock.textContent = clockStr;

	document.getElementById('change').color = hexColorStr;
}

hexClock();
setInterval(hexClock, 1000);

// change the color
function interaction(){
	var time = new Date();	
	var hours = time.getHours().toString();
	var minutes = time.getMinutes().toString();
	var seconds = time.getSeconds().toString();

	if (hours.length < 2){
		hours = '0' + hours;
	}

	if (minutes.length < 2){
		minutes = '0' + minutes;
	}
	
	if (seconds.length < 2){
		seconds = '0' + seconds;
	}

	var hexColorStr = '#' + seconds + hours + minutes;
	document.body.style.background = hexColorStr;
}

// animation
TweenMax.from(".button", 2, {scale: 0, opacity: 0, ease: Power4.easeOut});
TweenMax.from(".current", 1, {scale: 0, opacity: 0, ease: Power4.easeOut});
TweenMax.from(".clock", 1, {scale: 0, opacity: 0, ease: Power4.easeOut});
TweenMax.from(".mars", 3, {scale: 0, opacity: 0, ease: Power4.easeOut}).delay(.5);
TweenMax.from(".earth", 3, {scale: 0, opacity: 0, ease: Power4.easeOut}).delay(1);

// stars
const Star = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.size = 25;
};

var context = document.querySelector('canvas').getContext('2d');

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var stars = new Array();

var max_depth = 7500;

for(let i = 0; i < 200; i++){

	stars[i] = new Star(Math.random() * width, Math.random() * height, i * (max_depth / 200));
};

function loop(){
	window.requestAnimationFrame(loop);

	height = document.documentElement.clientHeight;
	width = document.documentElement.clientWidth;

	context.canvas.height = height;
	context.canvas.width = width;

	context.fillStyle = 'transparent';
	context.fillRect(0, 0, width, height);

	for(let i = stars.length - 1; i > -1; i--){

		let star = stars [i];

		star.z -=5;

		if (star.z < 0){
			stars.push(stars.splice(i,1)[0]);
			star.z = max_depth;
			continue;
		}

		let translateX = width * .5;
		let translateY = height * .5;

		let field_of_view = (height + width) * .5;

		let starX = (star.x - translateX) / (star.z / field_of_view) + translateX;
		let starY = (star.y - translateY) / (star.z / field_of_view) + translateY;

		let scale = field_of_view / (field_of_view + star.z);

		let color = Math.floor(scale * 200);

		context.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
		context.fillRect(starX, starY, star.size * scale, star.size * scale);
	}
}

loop();

