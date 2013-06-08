ws = {
  dictRunning: false,
  interpreterRunning: false
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
  //command interpreter controls
  $('#start-commands').click(function() {
    l('clik');
    setupCmdListener();
    if(!ws.interpretRunning) {
      startCmdListener();
    } else {
      alert('Commands are already turned on. Make sure to click allow in the upper right corner.');
    }
  });
  $('#stop-commands').click(function() {
    stopCmdListener();
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

/*
* INTERPRETTER FUNCTIONS
***************************/


function setupCmdListener() {
  ws.interpreter = new webkitSpeechRecognition();
  ws.interpreter.continuous = true;
  ws.interpreter.interimResults = false;
  ws.interpreter.onresult = function(e) {
    if (e.results.length) {
      var lastResultIdx = e.resultIndex;
      var command = e.results[lastResultIdx][0].transcript;
      if(e.results[lastResultIdx].isFinal) {
        hidePrompt(); //will only be effectual first time round
        l(command);
        interpret(command);
      }
    }
  };
  ws.interpreter.onend = function(e) {
    console.log('cmd listener ended');
  };
}

function startCmdListener() {
  ws.interpreter.start();
  ws.dictRunning = true;
  showPrompt();
  updateInterpretIndicator(ws.dictRunning);
  console.log('interpreter started');
}

function stopCmdListener() {
  ws.interpreter.stop();
  ws.interpreterRunning = false;
  updateInterpretIndicator(ws.interpreterRunning);
}

function interpret(command) {
  if(command[0] == ' ') {
    command = command.substr(1,command.length);
  }
  switch(command.toLowerCase()) {
    case 'red':
    case 'green':
    case 'blue':
    case 'yellow':
    case 'white':
    case 'black':
      $('body').css('background-color', command);
      break;
    default:
      alert('I\'m sorry I didn\'t understand that command');
  }
}

/*
* All purpose functions
***************************/

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

function updateInterpretIndicator(running) {
  //make this general!
  var i = $('#commands-indicator');
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
