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

  $(function() {
    $( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
      }
    });
    $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
  });

  //handles the dropping logic for an empty slot, a slot with a sample already loaded and a slot with two samples already loaded.
  $('.droppable').each(function() {
    $(this).droppable({ 
        accept: ".stone",
        drop: function ( e, ui ) {
          //the center of the slot
          var center = $(this).children(':first-child')[0];

          //if there are no samples in the slot
          if (typeof center === "undefined") {
            props = { 'position': 'absolute', 'top': '0', 'left': '0' };
            $(this).append($(ui.draggable).css(props)); 
            animateMe(this);
          }

          //if there is one sample in the slot
          /*
          else {
            var target = $(ui.draggable).css(props);
            var source = $(target).data('sound');
            var classes = target[0].classList;

            result = '<div class="inner ' + classes[0] + ' ' + classes[1] + ' ' + classes[2] + ' ' + classes[3] + '" data-sound="' + source + '"></div>';
            console.log(result);
            $(target).remove();
            $(center).append(result);
          }
          */
          else {
            $(ui.draggable).css(props).addClass('inner');
            $(center).append($(ui.draggable));
          }
        }
     });
  });

  $('.pebble-bucket div.stone').each(function() {
    addAudioProperties( this );
  });

  $('.pebble-bucket div.stone').click(function() {
    this.play();
  });

  //changeSpeed functionality
  $('button.speed').click(function() {
    changeSampleSpeed( this );
  });

  $('button#stop').click(function() {
    var slot = getStone(this);
    target = $(slot).children(':first-child')[0];
    target.remove();
    $(slot).css('transition', '');
    props = { 'position': 'static', 'bottom': '0', 'left': '0' };
    $(slot).css(props);
  });

  //main fader functionality
  $('input.fader').change(function() {
    var target = getStone( this );
    var volume = $(target).children().prop( 'volume' );
    try {
      var example = $(target).children(':first-child').children().prop( 'volume' );
      example.gain.value = $(this).val();
    }
    catch(err) { 
      console.log(err);
    };

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
