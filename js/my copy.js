function setUp() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
}

function loadFiles( object, url ) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      object.buffer = buffer;
    });
  }
  request.send();
}

function addAudioProperties(object) {
    object.name = object.id;
    object.source = $(object).data('sound');
    loadFiles(object, object.source);   //set the object buffer
    object.volume = context.createGain();

    object.play = function () {
        var s = context.createBufferSource();
        s.buffer = object.buffer;
        
        var convolver = context.createConvolver();
        //console.log(convolver);
        convolver.buffer = irHall.buffer;
        //console.log(convolver);

        s.connect(convolver);
        //object.volume.connect(context.destination);
        convolver.connect(context.destination);
        s.connect(context.destination);
        s.start(0);
        object.s = s;
    }
}

function reverbObject (url) {
  this.source = url;
  loadFiles(this, url);
}

/* ---------------------------------- */

$(function() {

  setUp();
  irHall = new reverbObject('../audio/3000CStreetGarageStairwell.wav');

  $('div.stone').each(function() {
    addAudioProperties(this);
  });

  console.log('Added All The Audio Properties');

  $('div.stone').click(function() {
    this.play();
  })

  $('#cp input').change(function() {
    var v = $(this).parent().data('pad'),
        pad = $('#' + v)[0];
    switch ($(this).data('control')) {
        case 'gain':
            pad.volume.gain.value = $(this).val();
            break;
        default:
            break;
    }
  });
  
});
