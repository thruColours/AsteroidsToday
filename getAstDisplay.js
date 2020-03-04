
// const api_url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-02-28&end_date=2020-02-28&api_key=oc2osS1PDgSZWDOphc4r10HtzpHVZacT59v3drpp';
const api_url = 'https://api.nasa.gov/neo/rest/v1/feed/today?detail=true&api_key=oc2osS1PDgSZWDOphc4r10HtzpHVZacT59v3drpp';
//rate limit once per second

const alert = "error";

async function getAst() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { element_count, near_earth_objects } = data;

  const currentDate = Object.keys(near_earth_objects)[0];
  const displayDate = Object.keys(near_earth_objects)[0];

  let totalHaz = 0;
  let nonHaz = 0;

  let astTimes = [];
  let hazTimes = [];

  let allId = [];
  let hazId = [];

  // let hazString = hazId.toString();
  let hazTimeDisplay = [];
  let nonTimeDisplay = [];

  let hazNa = [];
  let nonHazNa = [];
  // let hazHour = [];

  let sizeCut = 0;
  // let nonSlice1 = [];

  //show time, adding 0 when approriate
  var today = new Date();
    var hours = today.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    };
    var minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    };
  var time = hours + ":" + minutes;

  console.log(near_earth_objects);
  // console.log(currentDate);

  //make sure to use '===' or atleast '==' you numpty!
  near_earth_objects[currentDate].forEach((item) => {

    astTimes.push(item.close_approach_data[0].epoch_date_close_approach);
    allId.push(item.id);



    if (item.is_potentially_hazardous_asteroid === true) {
    totalHaz++;
    hazId.push(item.id);
    hazTimes.push(item.close_approach_data[0].epoch_date_close_approach);
    hazTimeDisplay.push(item.close_approach_data[0].close_approach_date_full);
    // hazTimeDisplay.push(item.close_approach_data[0].close_approach_date_full.replace(",", "<br />"));
    // console.log(item.id);
    }
    else {
    nonTimeDisplay.push(item.close_approach_data[0].close_approach_date_full);
    nonHaz++;
    }
    // console.log(item.is_potentially_hazardous_asteroid)
    }
    );

  for( var i = 0; i < hazTimeDisplay.length; i++){

     if ( hazTimeDisplay[i] === null) {
       hazTimeDisplay.splice(i, 1);
       hazNa.push('N/A');
     }
  };

  for( var i = 0; i < nonTimeDisplay.length; i++){

    sizeCut++;

    if ( nonTimeDisplay[i] === null ) {
      nonTimeDisplay.splice(i, 1);
      nonHazNa.push('N/A');
    }

  };

  console.log(sizeCut);

  // console.log(nonHazNa);
  //
  // console.log(nonHaz);
  //
  // console.log(nonTimeDisplay);
  //
  // console.log(hazTimeDisplay);

  //turn milliseconds into seconds (coeff) and use this to round current time to nearest minute
  //so can check if time of hazardous asteroid falls within the current minute
  // let coeff = 1000 * 60;
  // let date = new Date();
  // let rounded = new Date(Math.round(date.getTime()/ coeff) * coeff);

  // seconds
  // let coeff = 1000;
  //minutes
  let coeff = 60000;
  let date = new Date();
  let rounded = new Date(Math.round(date.getTime()/ coeff) * coeff);

  // let rounded = new Date(Math.round(date.getTime()/ coeff) * coeff);
  // TESTING
  // hazTimes.push(rounded+65); // in the future (+)

  // differenceMs = [hazTimes - rounded];
  // displayDistMins = differenceMs/60000;
  // console.log(displayDistMins);
  // console.log(differenceMs);
  // get current time in Unix
  // console.log(date.getTime());

  //create array with time til close approach in minutes (do for both Haz and nonHaz)
  hazCalc = x => (x - rounded)/60000;
  //seconds
  // hazCalc = x => (x - rounded)/1000;
  hazDistance = hazTimes.map(hazCalc);
  console.log(hazDistance);

  // astCalc = x => (x - rounded)/60000;
  // astDistance = astTimes.map(astCalc);
  // console.log(astDistance);

  //mainly for LED strip -> maps ast from 30 min before close approach
  // hazCalc2 = x => 30 - x;
  // hazSend = hazDistance.map(hazCalc2);
  // console.log(hazSend);

  hazCalc3 = x => x.slice(12, 17);
  hazSlice = hazTimeDisplay.map(hazCalc3);
  hazSlice.sort();
  console.log(hazSlice);

  nonCalc = x => x.slice(12, 17);
  nonSlice = nonTimeDisplay.map(nonCalc);
  nonSlice.sort();
  console.log(nonSlice);

  for( var i = 0; i < nonSlice.length; i++){

    if ( nonSlice.length >= 10 ) {
      nonSlice.splice(10, sizeCut - 10);
    }

  };

  nonCalcCol = x => x.slice(12, 17);
  nonSlice1 = nonTimeDisplay.map(nonCalcCol);
  nonSlice1.sort();
  console.log(nonSlice);

  for( var i = 0; i < nonSlice1.length; i++){

    if ( nonSlice1.length >= 10 ) {
      nonSlice1.splice(0, 10);
    }
    else if ( nonSlice.length <= 10 ) {
      nonSlice1 = 0;
    }

  };

  console.log(nonSlice1);

  // near_earth_objects.[2020-01-31].id.push("420");
  // console.log(data.id);


  // if (astTimes.includes(rounded.getTime())&&hazTimes.includes(rounded.getTime())) {
  //   console.log("potentially hazardous animation");
  //
  // }
  // else if (astTimes.includes(rounded.getTime())){
  //   console.log("normal animation");
  //
  // }
  // else {
  //   console.log("no animation");
  // };

  // if (displayDistMin <= 30) {
  //
  // }

  // hazTimes.forEach((item, i) => {
  //   // 500px
  //   // 20px
  //
  //   // let y = 500px + (20px*i);
  //
  //   // .style.top = y;
  //
  //   // document.getElementsByClass('astApproach')[i].style.left = (60 - hazDistance) + "px";
  // });

  // nonSlice.forEach((item, i) => {
  //   let g = (10,(10 * i),10);
  //   // color: rgb(10, g, 10);
  //
  //   document.getElementsByClassName('nonHazTimeDisplay')[i].style.color = "color" + g;
  //
  // });

  document.getElementById('totalAsteroids').textContent = element_count;
  document.getElementById('potentiallyHazardous').textContent = totalHaz;
  document.getElementById('nonHazardous').textContent = nonHaz;

  document.getElementById('hazTimeDisplay').textContent = hazSlice.join("\r\n") + "\r\n" + hazNa.join("\r\n");
  // document.getElementById('hazTimeDisplay').style.fontSize = (hazSlice.length * 4) + "vmin";

  document.getElementById('nonHazTimeDisplay').textContent = nonSlice.join("\r\n");

  document.getElementById('time').textContent = time;

  document.getElementById('nonHazTimeDisplay2').textContent = nonSlice1.join("\r\n") + "\r\n" + nonHazNa.join("\r\n");
  // document.getElementById('nonHazTimeDisplay').style.fontSize = nonSlice.length/7 + "vmin";




  // document.getElementById('date').textContent = displayDate;
  // document.getElementById('vel').textContent = velocity;

  }

  // function setup() {
  //   createCanvas(windowWidth, windowHeight);
  // }

  // function astApproach(ellipx) {
  //   // let d = hazDistance;
  //   // console.log(d);
  //   // let hazMap = map(d, 600, 0, 0, 400, true);
  //
  //   fill(100, 100, 100);
  //   ellipse (ellipx, 500, 10);
  // }
  //
  // function draw() {
  //   // console.log(hazDistance);
  //   astApproach(200);
  // }

  getAst().catch(alert);

// getISS();

  setInterval(getAst, 60000);

