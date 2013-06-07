ws = {};

$(document).ready(setup);

function setup() {
  setupRecogniser();
  $('#start').click(function() {
    startRecogniser();
  });
  $('#stop').click(function() {
    stopRecogniser();
  });
}

function setupRecogniser() {
  ws.recognizer = new webkitSpeechRecognition();
  ws.recognizer.continuous = true;
  ws.recognizer.interimResults = true;
  ws.recognizer.onresult = function(e) {
    if (e.results.length) {
      var lastResultIdx = e.resultIndex;
      var message = e.results[lastResultIdx][0].transcript;
      console.log(e);
      if(e.results[lastResultIdx].isFinal) {
        $('#results').append(message);
      }
    }
  };
  ws.recognizer.onend = function(e) {
    console.log('ended');
    updateIndicator(false);
  };
}

function startRecogniser() {
  ws.recognizer.start();
  updateIndicator(true);
  console.log('recognizer started');
}

function stopRecogniser() {
  ws.recognizer.stop();
  updateIndicator(false);
}

function updateIndicator(running) {
  var i = $('#indicator');
  if(running) {
    i.addClass('listening');
    i.removeClass('not-listening');
    i.html('Listening');
  } else {
    i.addClass('not-listening');
    i.removeClass('listening');
    i.html('Not Listening');
  }
}

function l(x) {
  console.log(x);
}
