/* ===========================================
		ANIMATION SCRIPTS
	==========================================
*/

// dir (boolean): true if up, false if down
function animateMe(target) {
	var curPos = $(target).position().top;
	var bottom = 393; //the lowest an element will go
	var top    = -5;   //the highest an element can go
	console.log(curPos);

	if (curPos === bottom) {
		$(target).css({ 'transform': 'translate(0px, -390px)',
						'transition': getSpeed($(target)) + 's ease'});
	}
	else {
		first  = $(target).children(':first-child')[0];
		second = $(first).children(':first-child')[0];

		$(target).css('transform', 'translate(0px, 0px)');
		//select the actual html element and play
		if (hasExtraSample(target)) {
			first.play();

			if (willFire) {
				setTimeout(function() { second.play() }, getFire());
			}
		}
		else {
			first.play();
		}
	}
}

function hasExtraSample(target) {
	first  = $(target).children(':first-child')[0];
	second = $(first).children(':first-child')[0];

	if (typeof second === 'undefined') {
		return false;
	}
	else {
		return true;
	} 
}

//a second sample has a 30% chance of firing every time
function willFire() {
	num = Math.floor((Math.random() * 10) + 1);

	if (num === 1 || num === 2 || num === 3) {
		return true;
	}

	else {
		return false;
	}
}

//return a random time between .5 seconds and 5 seconds
function getFire() {
	return Math.floor((Math.random() * 5000) + 500);
}

// HTML OBJECT -> Int
//returns the speed and parses to an int
function getSpeed( object ) {
  return parseInt($(object).attr('speed'));
}

//	HTML BUTTON -> VOID
//
//	Given an html button, increments the sample
//  speed of the stone it controls.  
//	The effect will not be visible until
//	the next round of animation
function changeSampleSpeed( object ) {
	var buttonID  = $(object).attr('id');
	var stone     = getStone($(object));
	var origSpeed = getSpeed(stone);
	//console.log(stone);

	console.log('button id: ' + buttonID);
	console.log(stone);
	console.log('speed: ' + origSpeed);
	if (origSpeed > 1) {
		if (buttonID === 'faster') {
			$(stone).attr('speed', origSpeed - 1);
		}
		else if (buttonID === 'slower') {
			$(stone).attr('speed', origSpeed + 1);
		}
	}

	else {
		alert('speed must be greater than 0');
	}
}

//HTML Button -> Stone
//
//given a button, returns the stone that it controls
function getStone( object ) {
	//go to the top of the bar
	var result = $( object ).parents('.bar');
	//get the first child
	result = result.children(':first-child')[0];
	//get the first child again
	//result = result.children(':first-child');
	return result;
}

//the ripple animation when a simple is played
function ripple( object ) {
	var color = $(object).css('background-color');

	if(color === 'rgb(255, 255, 255)') {
		$(object).css('background-color', 'rgb(140, 140, 197)')
	}

	else {
		$(object).css('background-color', 'white');
	}
}
