/*
* VOICE DICTATION FUNCTIONS
***************************/

function setupDictation() {
  ws.recognizer = new webkitSpeechRecognition();
  ws.recognizer.continuous = true;
  ws.recognizer.interimResults = true;
  ws.recognizer.onresult = function(e) {
    if (e.results.length) {
      var lastResultIdx = e.resultIndex;
      var message = e.results[lastResultIdx][0].transcript;
      if(e.results[lastResultIdx].isFinal) {
        hidePrompt(); //will only be effectual first time round
        $('#results').append(message);
      }
    }
  };
  ws.recognizer.onend = function(e) {
    console.log('dictation ended');
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