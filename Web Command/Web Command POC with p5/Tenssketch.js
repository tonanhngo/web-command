//global variables
var avgLevel = 0;
var levels = [];
var j = 0;
var ind = 0;
var offset = 0;
var offsetIndex = 0;
var Noise;
var sum;
var playflag = false;
var playflag2 = false;
var NoiseSamples = 200;
var recordTreshold = 0.06; //keep this value between +0.06 and +0.2

//global objects
var myHeading = document.querySelector('h1');
var myHeading2 = document.querySelector('h2');
var recorder = new p5.SoundRecorder(); // recorder object
var soundFile;
var mic;
var speechRec;
var spoken = ' ';
var flag = true;


function setup() // always executes first
{


  spoken = ' ';
  noCanvas();
  var lang = navigator.language || 'en-UK';
  speechRec = new p5.SpeechRec('en-IN');

  continuos = true;
  interm = false;
  speechRec.start(continuos, interm);
  speechRec.onResult = gotSpeech;



  Noise = 0;
  /*mic = new p5.AudioIn();
  mic.start();
  i = 0;
  sum = 0;
  recorder.setInput(mic);*/
}


function gotSpeech() {
  //console.log(speechRec);
  myHeading2 = document.querySelector('h2');
  if (speechRec.resultValue) {
    //createP(speechRec.resultString);
    myHeading2.textContent = speechRec.resultString;
    check(speechRec.resultString);
  }

}

function draw() //loops infinitely
{

  //if (!playflag) return;

  /*background(0);
  micLevel = mic.getLevel();
  pushVals(micLevel);
  Noise = avgLevel;
  if (micLevel >= avgLevel + recordTreshold && !playflag2) {
    //startRec();
  }
  ellipse(width / 2, constrain(height - micLevel * height * 5, 0, height), 10, 10);*/
}

function check(str) {


  var spoken = str.toLowerCase();
  if (spoken.includes("scroll", 0) && flag == true) {
    flag = false;
    setTimeout(resetFlag, 1000);
    if (spoken.includes('up')) {
      console.log('up');
      scrollWindow(0,-400);
    } else if (spoken.includes('down')) {
      console.log('down');
      scrollWindow(0,400);
    } else if (spoken.includes('left')) {
      console.log('left');
      scrollWindow(-400,0);
    } else if (spoken.includes('right')) {
      console.log('right');
      scrollWindow(+400,0);
    }
  }
}

function resetFlag() {
  flag = true;
}

function scrollWindow(x, y) //function used to scroll through the page
{
  window.scrollBy(x, y); // x is horizontal and y is vertical
}

function pushVals(val) {
  sum += val;

  levels[ind] = val;
  //tf.tensor(levels).print();

  if (ind != NoiseSamples - 1) //setting value of push index
  {
    ind++;
  } else {
    ind = 0;
  }

  if (levels.length >= NoiseSamples) //if queue is full
  {
    offset = levels[offsetIndex];
    sum -= offset;
    if (offsetIndex == NoiseSamples - 1) //setting offset Values to aid mean calculation
    {
      offsetIndex = 0;
    } else {
      offsetIndex++;
    }
  }

  avgLevel = sum / levels.length;
}



function startRec() {
  myHeading = document.querySelector('h1');
  micButton = document.getElementById('mic');
  micButton.disabled = true;
  soundFile = new p5.SoundFile(); // creates a soundfile to save the recorded audio
  background(0);

  recorder.record(soundFile);
  myHeading.textContent = 'Recording!';
  setTimeout(stopRec, 2000);
  playflag = true;
  playflag2 = true;
}


//funstion to stop recording audio file and play it back
function stopRec() {
  myHeading = document.querySelector('h1');
  mmicButtonic = document.getElementById('mic');
  micButton.disabled = false;
  myHeading.textContent = 'Not Recording!';
  recorder.stop();
  soundFile.play();
  // save file (downloads the file)
  playflag = false;
  playflag2 = false;
}

function show(paramz) {
  tf.tensor(paramz).print();
}
/*_______________________________ Code repository______________________________
...............................................................................
recorder.stop(); //stops recording of sound (audio file)
recorder.record(soundFile); // starts recording a sound file
SoundFile.play(); // play the result of the sound file saved in variable "soundFile"
saveSound(soundFile, 'mySound.wav'); // save file (downloads the file)
num.toString(); //num to String
...............................................................................*/

/*_________________________________interrupts__________________________________
...............................................................................
function mousePressed() {<code>} //interrupt driven function triggered when mouse is pressed
..............................................................................*/
