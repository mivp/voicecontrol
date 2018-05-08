window.onload = function() {

  var socket = io();

  // Create a variable that stores your instance
  window.artyom = new Artyom();
  artyom = window.artyom;

  // or add some commandsDemostrations in the normal way
  artyom.addCommands([
      {
          indexes: ['hello','hi','is someone there'],
          action: (i) => {
              artyom.say("Hello, it's me");
              socket.emit('message', {command: 'sayHello', args: 'none'});
          }
      },
      {
          indexes: ['omega run connectome','omega stop', 'start program'],
          action: (i) => {
              artyom.say("Omegalib is starting now");
              socket.emit('message', {command: 'runProgram', args: 'abc'});
          }
      },
      {
          indexes: ['repeat after me *'],
          smart:true,
          action: (i,wildcard) => {
              artyom.say("You've said : "+ wildcard);
          }
      },
      // The smart commands support regular expressions
      {
          indexes: [/Good Morning/i],
          smart:true,
          action: (i,wildcard) => {
              artyom.say("You've said : "+ wildcard);
          }
      },
      {
          indexes: ['shut down yourself'],
          action: (i,wildcard) => {
              artyom.fatality().then(() => {
                  console.log("Artyom succesfully stopped");
              });
          }
      },
  ]);

  artyom.initialize({
      lang: "en-GB", // GreatBritain english
      continuous: true, // Listen forever
      soundex: true,// Use the soundex algorithm to increase accuracy
      debug: true, // Show messages in the console
      executionKeyword: "now",
      listen: true, // Start to listen commands !
      obeyKeyword: "listen again",

      // If providen, you can only trigger a command if you say its name
      // e.g to trigger Good Morning, you need to say "Jarvis Good Morning"
      name: "CAVE"
  }).then(() => {
      console.log("Artyom has been succesfully initialized");
  }).catch((err) => {
      console.error("Artyom couldn't be initialized: ", err);
  });

  artyom.redirectRecognizedTextOutput((recognized,isFinal) => {
    console.log('redirectRecognizedTextOutput:' + recognized + ' ' + isFinal);
    if(isFinal){
      document.getElementById("span-final").textContent = recognized;
    }else{
      document.getElementById("span-preview").textContent = recognized;
    }
  });

  function simulateInstruction(command) {

  }

  //All catchable artyom errors will be catched with this
  artyom.when("ERROR",function(error){

      if(error.code == "network"){
          alert("An error ocurred, artyom cannot work without internet connection !");
      }

      if(error.code == "audio-capture"){
          alert("An error ocurred, artyom cannot work without a microphone");
      }

      if(error.code == "not-allowed"){
          alert("An error ocurred, it seems the access to your microphone is denied");
      }

      console.log(error.message);
  });

} // on load
