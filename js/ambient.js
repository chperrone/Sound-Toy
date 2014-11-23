/* ==================================
    ON LOAD
   ================================== */
    
$(function() {

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  irHall = new reverbObject('../audio/3000CStreetGarageStairwell.wav');

  $('div.stone').each(function() {
    addAudioProperties( this );
    $(this).draggable();
  });

  $('div.stone').click(function() {
    this.play();
  });

  $('button').click(function() {
    var target;

    setSpeed( this );

  });

  animateMe($('div#pad1'), getSpeed($('div#pad1')), true);
  animateMe($('div#pad2'), getSpeed($('div#pad2')), true);
  animateMe($('div#pad3'), getSpeed($('div#pad3')), true);
  animateMe($('div#pad4'), getSpeed($('div#pad4')), true);
  //animateMe($('div#pad1'), 2000, true);
  //animateMe($('div#pad2'), 3000, true);
  //animateMe($('div#pad3'), 3000, true);
  //animateMe($('div#pad4'), 3000, true);

  //$('div#sequencer').droppable({ accept: 'div.stone' });
  
});
