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

//global objects
var myHeading = document.querySelector('h1');
var recorder = new p5.SoundRecorder(); // recorder object
var soundFile = new p5.SoundFile(); // creates a soundfile to save the recorded audio



function setup() // always executes first
{
	//myHeading.textContent = 'Recording!';
	Noise=0;

	//tf.tensor([1, 2, 3, 4]).print(); //just testing
	//tf.tensor2d([1, 2, 3, 5], [2, 2]).print(); //just testing


	mic = new p5.AudioIn();
  mic.start();
	i=0;
	sum=0;
	recorder.setInput(mic);
}

function draw() //loops infinitely
{

	myHeading = document.querySelector('h1');
	background(0);
  micLevel = mic.getLevel();

	pushVals(micLevel);
	Noise= avgLevel;

	if(i<999)
	{
	//tf.scalar(micLevel).print(); //prints the amplitude values of the audio samples
	//tf.scalar(Noise).print();
	i++;
	}

	if(micLevel>= (Noise+0.03)) //start recording if
	{
		recorder.record(soundFile);
		myHeading.textContent= 'Recording!';
		setTimeout(StopRec, 2000);
	}
ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);

if(playflag==true)
{
		recorder.stop();
		soundFile.play();
}


}


function scrollWindow(x, y) //function used to scroll through the page
{
    window.scrollBy(x, y);// x is horizontal and y is vertical
}

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

//funstion to stop recording audio file and play it back
function StopRec()
{
	playflag=true;

}

function show(paramz)
{
	tf.tensor(paramz).print();
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
