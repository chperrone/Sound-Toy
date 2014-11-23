/* ==================================
    AMBIENT MUSIC GENERATOR
   ================================== */
    
$(function() {

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  irHall = new reverbObject('../audio/3000CStreetGarageStairwell.wav');

  $('div.stone').each(function() {
    addAudioProperties( this );
  });

  $('button').click(function() {
    changeAnimation( this );
  });

  animateMe( $('div#pad1'), getSpeed($('div#pad1')), true );
  //animateMe($('div#pad2'), getSpeed($('div#pad2')), true);
  //animateMe($('div#pad3'), getSpeed($('div#pad3')), true);
  //animateMe($('div#pad4'), getSpeed($('div#pad4')), true);

});
