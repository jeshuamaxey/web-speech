//web speech namespcae object
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
