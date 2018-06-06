window.onload = function() {

  var socket = io();

  // Create a variable that stores your instance
  window.artyom = new Artyom();
  artyom = window.artyom;



  // or add some commandsDemostrations in the normal way
  artyom.addCommands([
      {
          indexes: ['hello','hi'],
          action: (i) => {
              artyom.say("Hello, it's me, cave");
              socket.emit('message', {command: 'sayHello', args: 'none'});
          }
      },
      {
          indexes: ['run brain', "start brain", "start connectome", "run connectome"],
          action: (i) => {
              artyom.say("Starting Connectome");
              socket.emit('message', {command: 'runProgram_Connectome', args: 'abc'});
          }
      },
      {
          indexes: ['run rabbit', "start rabbit"],
          action: (i) => {
              artyom.say("Starting Rabbit demo");
               socket.emit('message', {command: 'runProgram_Rabbit', args: 'abc'});          }
      },
      {
          indexes: ["run mars", "start mars" ],
          action: (i) => {
              artyom.say("Starting Mars");
               socket.emit('message', {command: 'runProgram_Mars', args: 'abc'});
          }
      },
       {
          indexes: ["screens on", "displays on", "turn on"],
          action: (i) => {
              artyom.say("Turning displays on");
               socket.emit('message', {command: 'displaysOn', args: 'abc'});
          }
      },
       {
          indexes: ["screens off", "displays on", "turn off"],
          action: (i) => {
              artyom.say("Turning displays off");
               socket.emit('message', {command: 'displaysOff', args: 'abc'});
          }
      },
       {
          indexes: ['stop'],
          action: (i) => {
              artyom.say("Stopping application.");
               socket.emit('message', {command: 'stopApp', args: 'stop.sh'});
          }
      },
       {
          indexes: ['sound off', "audio off"],
          action: (i) => {
              artyom.say("Turning sound off.");
               socket.emit('message', {command: 'soundOff', args: 'abc'});
          }
      },
       {
          indexes: ['sound on', "audio on"],
          action: (i) => {
              artyom.say("Turning sound on");
               socket.emit('message', {command: 'soundOn', args: 'abc'});
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
      obeyKeyword: "listen",
     // executionKeyword: "command over", //command will execute even if talker keeps talking
      // If providen, you can only trigger a command if you say its name
      // e.g to trigger Good Morning, you need to say "listen cave Good Morning"
      name: "listen"
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

 // artyom.when("NOT_COMMAND_MATCHED",function(){
 //   artyom.say("Sorry, I do not know that command.");
//});

} // on load
