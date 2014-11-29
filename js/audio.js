/*
///////////////////////////////////////////////////////////////////////////////

AUDIO COMPONENTS
----------------

Authored: Charles Perrone

///////////////////////////////////////////////////////////////////////////////
*/

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

function addAudioProperties( object ) {
    object.name = object.id;
    object.source = $(object).data('sound');
    loadFiles(object, object.source);   //set the object buffer
    object.volume = context.createGain();

    object.play = function () {
        var s = context.createBufferSource();
        s.buffer = object.buffer;

        //object.volume.connect(convolver);
        //convolver.connect(mainDelay);
        s.connect(object.volume);
        object.volume.connect(mainDelay);
        //object.convolver.connect(context.destination);

        //convolver.connect(context.destination);
        //s.connect(context.destination);

        s.start(0);
        object.s = s;
    }
}

function getVolume( object ) {
  return this.volume;
}

function reverbObject (url) {
  this.source = url;
  loadFiles(this, url);
}