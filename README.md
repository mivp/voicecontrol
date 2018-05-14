# Test CAVE2 voice control

Main client voice recognition source is in public folder. 
The javascript program uses the HTML5 Speech Recognition API to recognize voice. There are 2 main testing files:

- index.html/main.js: uses Artyom.js (https://sdkcarlos.github.io/sites/artyom.html) which is is an useful wrapper of the speechSynthesis and webkitSpeechRecognition APIs.
- test.html/test.js: low-level/direct implementation voice recogition with webkitSpeechRecognition API. 

## How to run this test program

```
cd voicecontrol
npm install
node server.js
```
Then open webpage http://localhost:300/index.html or http://localhost:300/test.html and enable mic to use.

## Ideas to integrate this to sabi.js

- We add phases/sentences to cave2.js file.
- Add Start/Stop buttons in sabi interface to start/stop voice recognition.
- We parse English commands from cave2.js to initialise voice control
- When we have a voice command, run accordingly command from cave2.js file.
- ...

