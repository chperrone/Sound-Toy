/* ===========================================
		ANIMATION SCRIPTS
	==========================
*/

function animateMe(targetElement, speed, right) {
  //console.log(speed);

  var properties;
  var complete = function() {
    //stop the last animation;
    animateMe(this, getSpeed(targetElement), !right);
  };

  if (right) {
    properties = {'left': '400px'};
  }
  else {
    //since object is on left, play sample
    targetElement.play();
    properties = {'left': '10px'};
  }
  
  $(targetElement).stop().animate(properties,
                                  speed,
                                  complete);
};

//given on object ->
//returns the speed and parses to an int
function getSpeed( object ) {
  return parseInt($(object).attr('speed'));
}
/*
function setSpeed( object ) {


  //var target = $(object).parent().children('first:child').children('first:child');


  if ($(object).attr('id') === 'faster') {
      
      $(target).attr('speed', parseInt($(target.attr('speed')) - 100));
    }

    else if ($(object).attr('id') === 'slower') {
      $(target).attr('speed', parseInt($(target.attr('speed')) + 100));
    }

    else {
      console.log('something went wrong');
    }
}
*/
