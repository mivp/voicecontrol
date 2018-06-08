window.onload = function() {

  var socket = io();
  var audio = new Audio('../pling.mp3');

  // Create a variable that stores your instance
  window.artyom = new Artyom();
  artyom = window.artyom;



  // or add some commandsDemostrations in the normal way
  artyom.addCommands([
      {
          indexes: ['hello','hi'],
          action: (i) => {
              //artyom.say("Hello, it's me, cave");
              socket.emit('message', {command: 'sayHello', args: 'none'});
          }
      },

      /*start demos 
        Use easily distinguishable commands for each demo. Add common misses to the indexes (e.g. praying for brain), to build
        a reliable application

      */
      {
          indexes: ['run brain', "start brain", "start connectome", "run connectome", "start praying", "run praying"],
          action: (i) => {
            audio.play();
              socket.emit('message', {command: 'runProgram', args: 'connectome'});
          }
      },
      {
          indexes: ['run rabbit', "start rabbit"],
          action: (i) => {
 audio.play();
               socket.emit('message', {command: 'runProgram', args: 'rabbit'});          }
      },
      {
          indexes: ["run mars", "start mars", "run mass", "start mass", "run mask", "start mask", "run planet", "start planet" ],
          action: (i) => {
     audio.play();
               socket.emit('message', {command: 'runProgram', args: 'mars'});
          }
      },

      /* Screens */
       {
          indexes: ["screens on", "displays on", "turn on", "screams on"],
          action: (i) => {
                    audio.play();
                   socket.emit('message', {command: 'displaysOn', args: ''});
          }
      },
       {
          indexes: ["screens off", "displays off", "turn off", "screams off"],
          action: (i) => {
                audio.play();
               socket.emit('message', {command: 'displaysOff', args: ''});
          }
      },

      /* Stop running demo */
       {
          indexes: ['stop'],
          action: (i) => {
             audio.play();
               socket.emit('message', {command: 'stopApp', args: 'stop.sh'});
          }
      },

      /* Sound controls */
       {
          indexes: ['sound off', "audio off"],
          action: (i) => {
             audio.play();
               socket.emit('message', {command: 'soundOff', args: ''});
          }
      },
       {
          indexes: ['sound on', "audio on"],
          action: (i) => {
             audio.play();
               socket.emit('message', {command: 'soundOn', args: ''});
          }
      },
      /*
      // The smart commands support regular expressions
      {
          indexes: [/Good Morning/i],
          smart:true,
          action: (i,wildcard) => {
              artyom.say("You've said : "+ wildcard);
          }
      }, */

      /* Stop voice recognition */
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
    //  executionKeyword: "now",
      listen: true, // Start to listen commands !
      speed:0.9, //speak a little slower
    //  obeyKeyword: "listen",
     // executionKeyword: "command over", //command will execute even if talker keeps talking
      // If providen, you can only trigger a command if you say its name
   //   name: "listen"
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
