/* ==================================
    AMBIENT MUSIC GENERATOR
   ================================== */
    
$(function() {

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  irHall = new reverbObject('../audio/3000CStreetGarageStairwell.wav');
  //mainDelay = context.createDelay();
  //mainDelay.delayTime.value = 0.5;
  //delayGain = context.createGain();
  //delayGain.gain.value = 0.7;
  filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 440;

  //delayGain.connect(mainDelay);
  //mainDelay.connect(delayGain);
  //mainDelay.connect(filter);
  //mainDelay.connect(context.destination);
  //filter.connect(context.destination);

  $('.pebble-bucket .pebble').each(function() {
    $(this).draggable();
  });

  $('.droppable').each(function() {
    $(this).droppable({ 
        accept: ".pebble#piano",
        drop: function ( e, ui ) {
          $(this).append(function() {

            props = { 'position': 'static', 'top': '0', 'left': '0' };
            return $(ui.draggable).css(props);
          });
        }

     });
  });

  $('#sequencer div.stone').each(function() {
    addAudioProperties( this );
  });

  //changeSpeed functionality
  $('button').click(function() {
    changeSampleSpeed( this );
  });

  //main fader functionality
  $('input.fader').change(function() {
    var target = getStone( this );
    var volume = target.prop( 'volume' );
    volume.gain.value = $( this ).val();
  });

  $("div.stone").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
    animateMe(this);  
  });

  $('div.stone').click(function() {
    animateMe(this);
  });

  //animateMe( $('div#pad1'));
  //animateMe($('div#pad2'));
  //animateMe( $('div#pad3'), true);
  //animateMe( $('div#pad4'), true);
  //animateMe( $('div#pad5'), true);

});

/*Object -> Object

Takes an object and removes particular css offset rules
*/
function removePosition( object ) {
  return $( object ).css({ 'position': 'static', 'top': '0', 'left': '0' });
}
