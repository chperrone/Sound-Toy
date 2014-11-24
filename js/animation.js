/* ===========================================
		ANIMATION SCRIPTS
	==========================
*/

function animateMe(target, speed, up) {

  var properties;
  var complete = function() { animateMe(this, getSpeed(target), !up); };

  if (up) {

    properties = { 'bottom': '+=300px' };
  }
  else {
  	target.play(); //since object is on left, play sample
  	ripple(target);
    properties = { 'bottom': '-=300px' };
  }
  
  $(target).stop().animate(properties,
                           speed,
                           complete);
};

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

// HTML OBJECT -> Int
//returns the speed and parses to an int
function getSpeed( object ) {
  return parseInt($(object).attr('speed'));
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

	if(color === 'white') {
		$(object).css('background-color', 'rgb(140, 140, 197)')
	}

	else {
		$(object).css('background-color', 'white');
	}
}
