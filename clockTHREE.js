var clockDiameter; // the diameter of a circle is its width
var clockRadius; // the radius is half of this

function setup(){
  // windowWidth and windowHeight mean the canvas will fill the window
	createCanvas( windowWidth, windowHeight);

	//remove space around canvas .. seems to only work on righthand side?
	// var cnv = createCanvas(windowWidth, windowHeight);
  // cnv.style('display', 'block');

  // we check which dimension is smaller and base the size of the
  // clock off of that - i.e. if the window is shorter than it is
  // wide, then the clock will be 80% (0.8) of the height of the window
  if( width < height ){
    clockDiameter = width * 0.8;
  } else {
    clockDiameter = height * 0.8;
  }
  // we also store the clock radius for convenience as this is used
  // to set the size of the hands.
  clockRadius = clockDiameter / 2;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background( 220, 220, 220 );
  // The values for time divisions come with their own range.
  // We need to re-map them to rotate them around our circle.
  // Rather than understanding a circular rotation as 0-360 degrees,
  // p5 understands it in radians: ranging from 0 to PI*2

  // so: the second() function will give us the current second, from 0-60.
  // we use map() to re-map that from 0-60 to 0-PI*2 as follows:
  // map( value, old minimum, old maximum, new minimum, new maximum )
  var secondAngle = map( second(), 0, 59, 0, Math.PI * 2 );
  // we do the same for minute()
  var minuteAngle = map( minute(), 0, 59, 0, Math.PI * 2 );
  // and for hour(), although this is 0 - 24 originally, and to operate
  // like a standard 12 hour clock face, we remap it to go round twice
  var hourAngle = map( hour(), 0, 24, 0, Math.PI * 4 );

  //my custom variables
  var secondSize = map( second(), 0, 0.79, 0, random( Math.PI * 1.99, Math.PI * 2 ));

  var secondSize2 = map( second(), 0, 2000, 0, random( Math.PI * 1.8, Math.PI * 1.9 ));


  var secondColour = map( second(), 0, 20, 0, 120);

	var minuteSize = map( minute(), 0, 0.79, 0, random( Math.PI * 1.98, Math.PI * 2 ));

	var hourSize = map( hour(), 0, 0.79, 0, Math.PI * 4 );
	//changed to 4 because 24 is double the respective value range of minutes and seconds
	//to ask Ollie/Gareth: make incriments of hour change with minutes (potentially seconds too)

  //var history = map( year(), 0, 201.8, 0, random( Math.PI , Math.PI * 0.16 ));
  var history = map( year(), 0, 201.9, 0, random( Math.PI , Math.PI * 20 ));



  // Make rotation easier by setting origin (0,0) the middle
  translate( width/2, height/2);

  //clock face

  //for( var secondSize = 0; secondSize > secondAngle; secondAngle + 1000 );

  //custom ellipses'

	// ellipse( 0, 0, hourSize);

	// fill( secondColour, 5, 0, 180 );
	fill( secondColour, 200, 200, 80 );

  for( var hourSize = 0; hourSize > hourAngle; minuteSize + 1 );

	// ellipse( 0, 0, minuteSize);

  fill( 10, 5, secondColour, 180 );

	for( var minuteSize = 0; minuteSize > minuteAngle; minuteSize + 1 );

  // ellipse( 0, 0, secondSize);

  fill( secondColour, 100, 100, 100, 180);

  for( var secondSize = 0; secondSize > secondAngle; secondSize + 1 );

  strokeWeight ( secondSize2 );

  //enable for mad
  // stroke ( random( 620, 100), 10, 0 );

  //disable for calm
  // stroke ( random( 20, 100), 10, 0 );

  //year ellipse1
  //ellipse ( random( -200 , 200), random( -30, 30), history);

  //year ellipse2
  ellipse ( random( -360 , 360), random( -200, 200), random( 2.020 , history /20.20 )/4);

  stroke ( 244, 244 , 244);

  strokeWeight ( 0 );

  fill ( 200, 20, 20, 244 );









  // before we transform/rotate we use push() to save the translated context
  // this means we can always return to it quickly with pop()
  push();
    rotate( secondAngle ); //rotate by our mapped angle
    // draw the line upwards from the origin
    // (the origin being center of the page, now rotated to the seconds)
    // we shorten the hand by 5px
		///line( 0, 0, 0, -clockRadius + 5 );
	pop(); //go back to our translated context
  // We have to push() again each time we pop(), because there needs
  // to be an equal number of push() and pop() calls
  push();
    rotate( minuteAngle ); //rotate by our mapped angle
    //draw the line upwards from the origin
    // (the origin being center of the page, now rotated to the minutes)
    // we shorten the hand by 10px
	  ///line( 0, 0, 0, -clockRadius + 10 );
	pop(); //go back to our translated context
  push(); // save the translated context
		rotate( hourAngle ); //rotate by our mapped angle
    //draw the line upwards from the origin
    // (the origin being center of the page, now rotated to the hour)
    // we shorten the hand by 15px
		//line( 0, 0, 0, -clockRadius + 15 );
	pop(); //go back to our translated context


}