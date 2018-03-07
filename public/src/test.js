"use strict";

var CAVE2_speech = {};
CAVE2_speech.hasInit = false;
CAVE2_speech.webkitSR = null;
CAVE2_speech.final_transcript = '';

CAVE2_speech.init = function () {

  this.hasInit = true;
  if (!("webkitSpeechRecognition" in window)) {
		console.log("SpeechRecognition> This browser doesn't support SpeechRecognition API");
    return;
  }

  console.log("SpeechRecognition> API exists, beginning setup");
  this.webkitSR = new webkitSpeechRecognition();
  this.webkitSR.continuous = true;
	this.webkitSR.interimResults = false;
  this.webkitSR.lang = 'en-US';
  //this.webkitSR.maxAlternatives = 0;
  console.log(this.webkitSR);

  // Give weight to the system name
	var grammar = '#JSGF V1.0; grammar noun; public <noun> = cave | omegalib ;';
	if (webkitSpeechGrammarList) {
		var speechRecognitionList = this.webkitSR.grammars;
		// 0->1 weight of grammar likely to happen compared to others.
		speechRecognitionList.addFromString(grammar, 1);
		this.webkitSR.grammars = speechRecognitionList;
	}

  this.webkitSR.onstart = function() {
		console.log("SpeechRecognition> SAGE2_speech started");
		this.recognizing = true;

		document.getElementById("span-interim_transcript").textContent = "";
    document.getElementById("span-final_transcript").textContent = "";
	};

  // After getting a result, but this also includes pieces
	// That aren't detected as full sentences
	this.webkitSR.onresult = function(event) {
    console.log(event);
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        CAVE2_speech.final_transcript = event.results[i][0].transcript;
        document.getElementById("span-final_transcript").textContent = CAVE2_speech.final_transcript +
                                                          '(' + event.results[i][0].confidence + ')';
        // do something with the final script here

      } else {
        interim_transcript += event.results[i][0].transcript;
        document.getElementById("span-interim_transcript").textContent = interim_transcript;
      }
    }
  }

  this.webkitSR.onerror = function(e) {
		console.log("SpeechRecognition> webkitSpeechRecognition error:", e.error);
		console.dir("SpeechRecognition>", e);
	};

  // After ending restart
	this.webkitSR.onend = function() {
    console.log("SpeechRecognition> webkitSpeechRecognition ended");
		//this.recognizing = false;
    CAVE2_speech.webkitSR.start();
	};

} // init

CAVE2_speech.init();
CAVE2_speech.webkitSR.start();
