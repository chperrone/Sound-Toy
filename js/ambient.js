/* ==================================
    AMBIENT MUSIC GENERATOR
   ================================== */
    
$(function() {

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  irHall = new reverbObject('../audio/3000CStreetGarageStairwell.wav');
  mainDelay = context.createDelay();
  mainDelay.delayTime.value = 0.5;
  delayGain = context.createGain();
  delayGain.gain.value = 0.9;
  filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 440;

  delayGain.connect(mainDelay);
  mainDelay.connect(delayGain);
  mainDelay.connect(filter);
  mainDelay.connect(context.destination);
  filter.connect(context.destination);

  $('div.stone').each(function() {
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

  animateMe( $('div#pad1'), getSpeed($('div#pad1')), true );
  animateMe( $('div#pad2'), getSpeed($('div#pad2')), true);
  animateMe( $('div#pad3'), getSpeed($('div#pad3')), true);
  animateMe( $('div#pad4'), getSpeed($('div#pad4')), true);
  animateMe( $('div#pad5'), getSpeed($('div#pad5')), true);

});
