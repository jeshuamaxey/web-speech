/*
* VOICE COMMAND FUNCTIONS
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
        interpret(command.toLowerCase());
      }
    }
  };
  ws.interpreter.onend = stopCmdListener();
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
  switch(command) {
    //change bg colour
    case 'red':
    case 'green':
    case 'blue':
    case 'yellow':
    case 'white':
    case 'black':
      var currentBgClass = $('.wrapper').attr('currentBgClass') || '';
      var newBgClass = 'bg-' + command;
      $('.wrapper').removeClass(currentBgClass);
      $('.wrapper').addClass(newBgClass);
      var currentBgClass = $('.wrapper').attr('currentBgClass', newBgClass);
      //$('.wrapper').css('background-color', command);
      break;
    //increase text size
    case 'increase text':
    case 'increase text size':
    case 'increase font size':
    case 'make text bigger':
    case 'make the text bigger':
    case 'make the writing bigger':
      increaseTextSize();
      break;
    //decrease text size
    case 'decrease text':
    case 'decrease text size':
    case 'decrease font size':
    case 'make text smaller':
    case 'make the text smaller':
    case 'make the writing smaller':
      decreaseTextSize();
      break;
    //do a barrel roll
    case 'do a barrel roll':
      doBarrelRoll();
      break;
    default:
      warning(command);
      alert('I\'m sorry I didn\'t understand that command');
  }
}

function warning(command) {
  console.log(command);
}

function increaseTextSize() {
  //multiply by 1 to make the value a number, increase this number then append 'px'
  var newTextSize = $('body').css('font-size').substr(0,$('body').css('font-size').length - 2)*1 + 4 + 'px';
  $('body').css('font-size', newTextSize);
}

function decreaseTextSize() {
  //multiply by 1 to make the value a number, decrease this number then append 'px'
  var newTextSize = $('body').css('font-size').substr(0,$('body').css('font-size').length - 2)*1 - 4 + 'px';
  $('body').css('font-size', newTextSize);
}

function doBarrelRoll() {
  $('body').addClass('barrel-roll');
  //the CSS animation lasts for 2s so wait until it's
  //finished then remove class so it can be reapplied
  window.setTimeout(function() {
    $('body').removeClass('barrel-roll');
  }, 2100);
  console.log('weeeeeeee');
}