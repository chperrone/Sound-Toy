function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

//-------------------------------------------------------------------------//

window.onload = init;
var context;
var bufferLoader;

var piano1;
var piano2;
var piano3;
var irHallBuffer;

var OCore = { };

function loadirHall() {

  var irHallRequest = new XMLHttpRequest();
  irHallRequest.open("GET", "../audio/irHall.ogg", true);
  irHallRequest.responseType = "arraybuffer";
  irHallRequest.onload = function() {
    audioContext.decodeAudioData( irHallRequest.response, function(buffer) { 
      irHallBuffer = buffer; } );
  }
  irHallRequest.send();

}

//On load, queue up buffer samples
function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      '../audio/piano1.wav',
      '../audio/piano2.wav',
      '../audio/piano3.wav',
    ],
    finishedLoading
    );

  bufferLoader.load();
}



//Once samples are loaded, initialize OCore
function finishedLoading(bufferList) {

  piano1 = bufferList[0];
  piano2 = bufferList[1];
  piano3 = bufferList[2];

  OCore.sample1 = piano1;
  OCore.sample2 = piano2;
  OCore.sample3 = piano3;

  OCore.gainNode1 = context.createGain();
  OCore.gainNode2 = context.createGain();
  OCore.gainNode3 = context.createGain();

}

function playSound1() {
  source = context.createBufferSource();
  source.buffer = OCore.sample1;
  //source.loop = true;

  source.connect(OCore.gainNode1);
  OCore.gainNode1.connect(context.destination);

  source.start(0);
}

function playSound2() {
  source = context.createBufferSource();
  source.buffer = OCore.sample2;
  //source.loop = true;
  var reverb = context.createConvolver();
  console.log(irHallBuffer);
  reverb.buffer = irHallBuffer;

  source.connect(OCore.gainNode2);
  OCore.gainNode2.connect(reverb);

  source.connect(context.destination);
  reverb.connect(context.destination);

  source.start(0);
}

function playSound3() {

  source = context.createBufferSource();
  source.buffer = OCore.sample3;
  //source.loop = true;

  source.connect(OCore.gainNode3);
  OCore.gainNode3.connect(context.destination);

  source.start(0);
}

OCore.changeVolume = function(element) {
  var volume = element.value;

  if ( element.id === 'range1' ) {
    OCore.gainNode1.gain.value = volume;
  }

  else if (element.id === 'range2' ) {
    OCore.gainNode2.gain.value = volume;
  } 

  else if (element.id === 'range3' ) {
    OCore.gainNode3.gain.value = volume;
  }

  else { console.log('input range id not found') }
}

$(document).ready(function() {

})

/*
function finishedLoading(bufferList) {

  plastic = bufferList[0];
  jug = bufferList[1];
  pan = bufferList[2];
  
  var startTime = context.currentTime + 0.100;
  var tempo = 80; // BPM (beats per minute)
  var ethNote = (60 / tempo) / 2;
  var sxthNote = (60 / tempo) / 4;
  var tsndNote = (60 / tempo) / 8;

  // Play 2 bars of the following:
  for (var bar = 0; bar < 2; bar++) {
    var time = startTime + bar * 8 * ethNote;

    // Play the bass (kick) drum on beats 1, 5
    playSound(plastic, time);
    playSound(plastic, time + 1 * ethNote);
    playSound(plastic, time + 5 * ethNote);
    playSound(plastic, time + 7 * sxthNote);

    // Play the snare drum on beats 3, 7
    playSound(jug, time + 2 * ethNote);
    playSound(jug, time + 6 * ethNote);
    playSound(jug, time + 8 * sxthNote);

    playSound(pan, time + 6 * tsndNote);
    playSound(pan, time + 12 * tsndNote);
    playSound(pan, time + 14 * tsndNote);
  }
}
*/
