ws = {
  dictRunning: false,
  interpretRunning: false
};

$(document).ready(setup);

function setup() {
  //dictation controls
  $('#start-dict').click(function() {
    setupDictation();
    if(!ws.dictRunning) {
      startDictation();
    } else {
      alert('Dictation is already turned on. Make sure to click allow in the upper right corner.');
    }
  });
  $('#stop-dict').click(function() {
    stopDictation();
  });
  //command interpretter controls
  $('#start-interpret').click(function() {
    setupInterpret();
    if(!ws.dictRunning) {
      startInterpret();
    } else {
      alert('Dictation is already turned on. Make sure to click allow in the upper right corner.');
    }
  });
  $('#stop-interpret').click(function() {
    stopInterpret();
  });
}

/*
* DICTATION FUNCTIONS
***************************/

function setupDictation() {
  ws.recognizer = new webkitSpeechRecognition();
  ws.recognizer.continuous = true;
  ws.recognizer.interimResults = true;
  ws.recognizer.onresult = function(e) {
    if (e.results.length) {
      var lastResultIdx = e.resultIndex;
      var message = e.results[lastResultIdx][0].transcript;
      console.log(e);
      if(e.results[lastResultIdx].isFinal) {
        hidePrompt(); //will only be effectual first time round
        $('#results').append(message);
      }
    }
  };
  ws.recognizer.onend = function(e) {
    console.log('ended');
    updateDictIndicator(false);
  };
}

function startDictation() {
  ws.recognizer.start();
  ws.dictRunning = true;
  showPrompt();
  updateDictIndicator(ws.dictRunning);
  console.log('recognizer started');
}

function stopDictation() {
  ws.recognizer.stop();
  ws.dictRunning = false;
  updateDictIndicator(ws.dictRunning);
}

/*
* INTERPRETTER FUNCTIONS
***************************/

/* All purpose functions */

function updateDictIndicator(running) {
  //make this general!
  var i = $('#dict-indicator');
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

function showPrompt() {
  $('#prompt').fadeIn();
}

function hidePrompt() {
  $('#prompt').fadeOut();
}

function l(x) {
  console.log(x);
}
