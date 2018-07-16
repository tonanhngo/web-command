//global variables
var avgLevel=0;
var levels = [];
var j=0;
var ind=0;
var offset=0;
var offsetIndex=0;
var Noise;
var sum;
var playflag=false;
var playFlagLevel=false;

var myHeading = document.querySelector('h1');
var recorder = new p5.SoundRecorder();
var soundFile;
var mic;
var fft;
var queueLength = 100;
var recordTreshold = 0.06;
var playBack = false;



function setup() // always executes first
{

  createCanvas(700,400);
  noFill();
  //myHeading.textContent = 'Recording!';
  Noise=0;
  sum=0;

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);


  recorder.setInput(mic);
}

function draw() //Infinite loop
{

  micLevel = mic.getLevel();
  pushVals(micLevel);
  Noise= avgLevel;

  if (micLevel >= Noise + recordTreshold && !playFlagLevel) {
    startRec();
  }



  //used to visualise the audio

  /*background(0);
  ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);*/

   background(200);
   var spectrum = fft.analyze();
   beginShape();
   for (i = 0; i<spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0) );
   }
   endShape();
}


//function used to scroll through the page
function scrollWindow(x, y)
{
    window.scrollBy(x, y);// x is horizontal (L & R) and y is vertical (U & D)
}



// maintains a stack of audio levels to calculate the amount of ambient noise
function pushVals(val)
{
  sum+=val;

  levels[ind] = val;
  //tf.tensor(levels).print();

  if(ind != 99) //setting value of push index
  {
    ind++;
  }
  else
  {
    ind = 0;
  }

  if(levels.length>=100) //if queue is full
  {
    offset=levels[offsetIndex];
    sum-=offset;
    if(offsetIndex==99) //setting offset Values to aid mean calculation
    {
      offsetIndex=0;
    }
    else
    {
      offsetIndex++;
    }
  }

  avgLevel=sum/levels.length;
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
  myHeading.textContent= 'Recording!';
  setTimeout(stopRec, 2000);
  playflag = true;
  playFlagLevel = true;

}


//function to stop recording audio file and play it back
function stopRec()
{
  myHeading = document.querySelector('h1');
  mmicButtonic = document.getElementById('mic');
  micButton.disabled = false;
  myHeading.textContent= 'Not Recording!';
  recorder.stop();
  if (playBack)
    soundFile.play();
  playflag = false;
  playFlagLevel = false;
}

function playBackToggle()
{
  playBack=!playBack;
}



/*_______________________________ Code repository______________________________
...............................................................................
recorder.stop(); //stops recording of sound (audio file)
recorder.record(soundFile); // starts recording a sound file
SoundFile.play(); // play the result of the sound file saved in variable "soundFile"
saveSound(soundFile, 'mySound.wav'); // save file (downloads the file)
...............................................................................*/

/*_________________________________interrupts__________________________________
...............................................................................
function mousePressed() {<code>} //interrupt driven function triggered when mouse is pressed
..............................................................................*/
