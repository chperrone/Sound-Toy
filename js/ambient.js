/* ==================================
    AMBIENT MUSIC GENERATOR
   ================================== */
    
var convolver;

$(function() {

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  irHall = new reverbObject('../audio/3000CStreetGarageStairwell.wav');
  mainDelay = context.createDelay();
  mainDelay.delayTime.value = 0.5;
  delayGain = context.createGain();
  delayGain.gain.value = 0.7;

  filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 440;

  //console.log(irHall.buffer);
  //convolver = context.createConvolver();
  //convolver.buffer = irHall;
  //convolver.connect(context.destination);

  delayGain.connect(mainDelay);
  mainDelay.connect(delayGain);
  mainDelay.connect(filter);

  var convolver = context.createConvolver();
  //mainDelay.connect(context.destination);
  filter.connect(context.destination);

  $('.pebble-bucket .stone').each(function() {
    $(this).draggable();
  });

  $('.droppable').each(function() {
    $(this).droppable({ 
        accept: ".stone",
        drop: function ( e, ui ) {
          props = { 'position': 'static', 'top': '0', 'left': '0' };
          $(this).append($(ui.draggable).css(props)); 
          animateMe(this);
        }
     });
  });

  $('.pebble-bucket div.stone').each(function() {
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

  $("div.slot").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
    animateMe(this);  
  });

  convolver = context.createConvolver();
  convolver.buffer = irHall.buffer;
  convolver.connect(context.destination);

});

function makeConvolver(convolver) {
  convolver.buffer = irHall.buffer;
  return convolver;

}
