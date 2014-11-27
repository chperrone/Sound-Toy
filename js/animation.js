/* ===========================================
		ANIMATION SCRIPTS
	==========================================
*/

// dir (boolean): true if up, false if down
function animateMe(target) {
	var curPos = $(target).position().top;
	var bottom = 443; //the lowest an element will go
	var top    = -5;   //the highest an element can go
	console.log(curPos);

	if (curPos === bottom) {
		$(target).css({ 'transform': 'translate(0px, -450px)',
						'transition': getSpeed($(target)) + 's ease'});
	}
	else {
		$(target).css('transform', 'translate(0px, 0px)');
		//select the actual html element and play
		$(target).children(':first-child')[0].play();
	}
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
