/* ===========================================
		ANIMATION SCRIPTS
	==========================================
*/

// dir (boolean): true if up, false if down
function animateMe(target) {

	var curPos = $(target).position().top;
	var bottom = 445; //the lowest an element will go
	var top    = -5;   //the highest an element can go

	if (curPos === bottom) {
		$(target).css({ 'transform': 'translate(0px, -450px)',
						'transition': getSpeed($(target)) + ' ease'});
	}
	else if (curPos === top) {
		$(target).css('transform', 'translate(0px, 0px)');
		target.play();
	}

	else { alert('didnt hit boundary');}
}

// HTML OBJECT -> Int
//returns the speed and parses to an int
function getSpeed( object ) {
  return $(object).attr('speed');
}

//	HTML BUTTON -> VOID
//
//	Given an html button, increments the sample
//  speed of the stone it controls.  
//	The effect will not be visible until
//	the next round of animation
function changeSampleSpeed( object ) {
	var buttonID  = $(object).attr('id');
	var stone     = getStone($(object))
	var origSpeed = getSpeed(stone);

	if (buttonID === 'faster') {
		$(stone).attr('speed', origSpeed - 1000);
	}
	else {
		$(stone).attr('speed', origSpeed + 1000);
	}
}

//HTML Button -> Stone
//
//given a button, returns the stone that it controls
function getStone( object ) {
	//go to the top of the bar
	var result = $( object ).parents('.bar');
	//get the first child
	result = result.children(':first-child');
	//get the first child again
	result = result.children(':first-child');
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
