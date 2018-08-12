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
var recorder = new p5.SoundRecorder(); // recorder object
var soundFile;
var mic;

var spkrint;
var spkrstr; //.............................................................//
var state;
var prefix;
var extension= "_nohash.wav";
var textboxValue = document.getElementById("textbox").value;



function setup() // always executes first
{
  //myHeading.textContent = 'Recording!';
  Noise = 0;
  var state = 1;
  //tf.tensor([1, 2, 3, 4]).print(); //just testing
  //tf.tensor2d([1, 2, 3, 5], [2, 2]).print(); //just testing

  mic = new p5.AudioIn();
  mic.start();
  i = 0;
  sum = 0;
  recorder.setInput(mic);

  spkrint = 0;
  prefix = 'scroll_up_'; //default is scroll up
}

function draw() //loops infinitely
{
  //if (!playflag) return;

  textboxValue = document.getElementById("textbox").value;
  background(0);
  micLevel = mic.getLevel();
  pushVals(micLevel);
  Noise = avgLevel;
  if (micLevel >= avgLevel + recordTreshold && !playflag2) {
    startRec();
  }
  ellipse(width / 2, constrain(height - micLevel * height * 5, 0, height), 10, 10);
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

//function to start recording the audio file
function startRec()
{
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
function stopRec()
{
  myHeading = document.querySelector('h1');
  mmicButtonic = document.getElementById('mic');
  micButton.disabled = false;
  myHeading.textContent = 'Not Recording!';
  recorder.stop();
  soundFile.play();
  playflag = false;
  playflag2 = false;
}

/*function mousePressed()
{
  spkrstr = spkrint.toString();
  var tempst = spkrstr.concat(prefix);
  saveSound(soundFile, tempst);
}*/

function downloadSf()
{
  textboxValue = document.getElementById("textbox").value;
  spkrstr = spkrint.toString();
  var tempst = prefix.concat(textboxValue);
  var tempst1= tempst.concat("_",spkrstr);
  var tempst2 = tempst1.concat(extension);
  saveSound(soundFile, tempst2);
}

function incrementSpeaker()
{
  spkrint++;
  var st = "Speaker id: ";
  var id = document.querySelector('h2');
  id.textContent = st.concat(spkrint.toString());
}
function decrementSpeaker()
{
  if(spkrint>0)
  spkrint--;
  var st = "Speaker id: ";
  var id = document.querySelector('h2');
  id.textContent = st.concat(spkrint.toString());
}

function SrUp()
{
  state=1;
  var id = document.getElementById('scr_up');
  id.style.color="red";
  id = document.getElementById('scr_dwn');
  id.style.color="grey";
  id = document.getElementById('scr_lt');
  id.style.color="grey";
  id = document.getElementById('scr_rt');
  id.style.color="grey";
  prefix = 'scroll_up_';
}
function SrDw()
{
  state=2;
  var id = document.getElementById('scr_up');
  id.style.color="grey";
  id = document.getElementById('scr_dwn');
  id.style.color="red";
  id = document.getElementById('scr_lt');
  id.style.color="grey";
  id = document.getElementById('scr_rt');
  id.style.color="grey";
  prefix = 'scroll_down_';
}
function SrLt()
{
  state=3;
  var id = document.getElementById('scr_up');
  id.style.color="grey";
  id = document.getElementById('scr_dwn');
  id.style.color="grey";
  id = document.getElementById('scr_lt');
  id.style.color="red";
  id = document.getElementById('scr_rt');
  id.style.color="grey";
  prefix = 'scroll_left_';
}
function SrRt()
{
  state=4;
  var id = document.getElementById('scr_up');
  id.style.color="grey";
  id = document.getElementById('scr_dwn');
  id.style.color="grey";
  id = document.getElementById('scr_lt');
  id.style.color="grey";
  id = document.getElementById('scr_rt');
  id.style.color="red";
  prefix = 'Scroll_right_';
}

function scrollWindow(x, y) //function used to scroll through the page
{
  window.scrollBy(x, y); // x is horizontal and y is vertical
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
