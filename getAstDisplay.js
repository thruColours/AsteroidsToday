
// const api_url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-04-21&end_date=2020-04-21&api_key=oc2osS1PDgSZWDOphc4r10HtzpHVZacT59v3drpp';
const api_url = 'https://api.nasa.gov/neo/rest/v1/feed/today?detail=true&api_key=vqy6sWn5jqFqDWApqmYnHieWCXebnkxtKG7gpOoX';
// const api_url = 'https://api.nasa.gov/neo/rest/v1/feed/today?detail=true&api_key=vqy6sWn5jqFqDWApqmYnHieWCXebnkxtKG7gpOoX';
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

  // let hazString = hazId.toString();
  let hazTimeDisplay = [];
  let nonTimeDisplay = [];

  let hazNa = [];
  let nonHazNa = [];
  // let hazHour = [];

  let sizeCut = 0;
  // let nonSlice1 = [];

  let hazMissDist = [];
  let missDist = [];

  let nonSizeMin = [];
  let nonSizeMx = [];

  let hazSizeMin = [];
  let hazSizeMx = [];

  //show time, adding 0 when approriate
  var today = new Date();
    var hours = today.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    };
    var minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes++;
    }
    else if (minutes >= 10){
      minutes = minutes++;
    };

  var time = hours + ":" + minutes;

  console.log(near_earth_objects);

  //make sure to use '===' or atleast '==' you numpty!
  near_earth_objects[currentDate].forEach((item) => {

    astTimes.push(item.close_approach_data[0].epoch_date_close_approach);


    if (item.is_potentially_hazardous_asteroid === true && item.close_approach_data[0].close_approach_date_full != null) {
      totalHaz++;
      hazTimes.push(item.close_approach_data[0].epoch_date_close_approach);
      hazTimeDisplay.push(item.close_approach_data[0].close_approach_date_full + "  ➮  " + item.name);
      // hazName.push(item.name);
      hazMissDist.push(item.close_approach_data[0].close_approach_date_full + "_" + item.close_approach_data[0].miss_distance.kilometers);
      hazSizeMin.push(item.close_approach_data[0].close_approach_date_full + "_" + item.estimated_diameter.meters.estimated_diameter_min);
      hazSizeMx.push(item.close_approach_data[0].close_approach_date_full + "_" + item.estimated_diameter.meters.estimated_diameter_max);
    }

    else if (item.is_potentially_hazardous_asteroid === true && item.close_approach_data[0].close_approach_date_full == null) {
      totalHaz++;
      hazNa.push(item.close_approach_data[0].close_approach_date_full + "      ➮  " + item.name);
      hazMissDist.push(item.close_approach_data[0].close_approach_date_full + "_" + item.close_approach_data[0].miss_distance.kilometers);
    }

    else if (item.is_potentially_hazardous_asteroid === false && item.close_approach_data[0].close_approach_date_full != null) {
      nonTimeDisplay.push(item.close_approach_data[0].close_approach_date_full + "  ➮  " + item.name);
      nonHaz++;
      missDist.push(item.close_approach_data[0].close_approach_date_full + "_" + item.close_approach_data[0].miss_distance.kilometers);
      nonSizeMin.push(item.close_approach_data[0].close_approach_date_full + "_" + item.estimated_diameter.meters.estimated_diameter_min);
      nonSizeMx.push(item.close_approach_data[0].close_approach_date_full + "_" + item.estimated_diameter.meters.estimated_diameter_max);
    }

    else if (item.is_potentially_hazardous_asteroid === false && item.close_approach_data[0].close_approach_date_full == null) {
      nonHazNa.push(item.close_approach_data[0].close_approach_date_full + "      ➮  " + item.name);
      nonHaz++;
      missDist.push(item.close_approach_data[0].close_approach_date_full + "_" + item.close_approach_data[0].miss_distance.kilometers);
    // nonName.push(item.name);
    }
    // console.log(item.is_potentially_hazardous_asteroid)
    }
    );

//old way of cutting out null times
  // for( var i = 0; i < hazTimeDisplay.length; i++){
  //
  //    if ( hazTimeDisplay[i] === null) {
  //      hazTimeDisplay.splice(i, 1);
  //      // hazNa.push('N/A');
  //    }
  // };

  // for( var i = 0; i < nonTimeDisplay.length; i++){
  //
  //   sizeCut++;
  //
  //   if ( nonTimeDisplay[i] === null ) {
  //     nonTimeDisplay.splice(i, 1);
  //     // nonHazNa.push('N/A');
  //   }
  //
  // };

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
  // console.log(hazDistance);

  // astCalc = x => (x - rounded)/60000;
  // astDistance = astTimes.map(astCalc);
  // console.log(astDistance);

  //mainly for LED strip -> maps ast from 30 min before close approach
  // hazCalc2 = x => 30 - x;
  // hazSend = hazDistance.map(hazCalc2);
  // console.log(hazSend);


  //tidy up arrays before display
  hazCalc3 = x => x.slice(12, 50);
  hazSlice = hazTimeDisplay.map(hazCalc3);
  hazSlice.sort();

  nonCalc = x => x.slice(12, 50);
  nonSlice = nonTimeDisplay.map(nonCalc);
  nonSlice.sort();

  nullCalc = x => x.replace("null", "N/A");
  nullToNa = nonHazNa.map(nullCalc);
  hazNullToNa = hazNa.map(nullCalc);


  //slice out up to close approach time so can sort in chronological order
  formCalc3 = x => x.slice(11, 30);
  nfm1 = missDist.map(formCalc3);
  hfm1 = hazMissDist.map(formCalc3);
  nfm1.sort();
  hfm1.sort();

  //add commas where appropriate (regex)
  formCalc = x => x.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  nfm = nfm1.map(formCalc);
  hfm = hfm1.map(formCalc);

  //remove decimal places (I know toFixed can work but couldn't think how to use it)
  formCalc2 = x => x.split('.')[0];
  nonF = nfm.map(formCalc2);
  hazF = hfm.map(formCalc2);

  //finally slice out just miss distance (since already sorted in chronological order)
  formCalc4 = x => x.slice(7, 30);
  nonFormat = nonF.map(formCalc4);
  hazFormat = hazF.map(formCalc4);

  //non hazardous size minimum
  //remove Date and use time to chronologically order size
  rmvDate = x => x.slice(11, 30);
  noHaMiSz = nonSizeMin.map(rmvDate);
  noHaMiSz.sort();

  rmvTime = x => x.slice(7, 30);
  noHaMiSzDis = noHaMiSz.map(rmvTime);

  // noDeci = x => x.split('.')[0];
  // noHaMiSzDisp = noHaMiSzDis.map(noDeci);

  //non hazardous size maximum
  rmvDate2 = x => x.slice(11, 30);
  noHaMxSz = nonSizeMx.map(rmvDate2);
  noHaMxSz.sort();

  rmvTime2 = x => x.slice(7, 30);
  noHaMxSzDis = noHaMxSz.map(rmvTime2);

  //finally remove decimals for both
  noDeci = x => x.split('.')[0];
  noHaMiSzDisp = noHaMiSzDis.map(noDeci);
  noHaMxSzDisp = noHaMxSzDis.map(noDeci);

  console.log(noHaMxSzDisp);

  //hazardous size minimum
  //remove Date and use time to chronologically order size
  rmvDate3 = x => x.slice(11, 30);
  hazMiSz = hazSizeMin.map(rmvDate3);
  hazMiSz.sort();

  rmvTime3 = x => x.slice(7, 30);
  hazMiSzDis = hazMiSz.map(rmvTime3);

  // noDeci = x => x.split('.')[0];
  // noHaMiSzDisp = noHaMiSzDis.map(noDeci);

  //hazardous size maximum
  rmvDate4 = x => x.slice(11, 30);
  hazMxSz = hazSizeMx.map(rmvDate4);
  hazMxSz.sort();

  rmvTime4 = x => x.slice(7, 30);
  hazMxSzDis = hazMxSz.map(rmvTime4);

  //finally remove decimals for both
  noDeci2 = x => x.split('.')[0];
  hazMiSzDisp = hazMiSzDis.map(noDeci2);
  hazMxSzDisp = hazMxSzDis.map(noDeci2);


// //slicing to new column over 10 items (before adding names)
//   for( var i = 0; i < nonSlice.length; i++){
//
//     if ( nonSlice.length >= 10 ) {
//       nonSlice.splice(10, sizeCut - 10);
//     }
//
//   };
//
//   nonCalcCol = x => x.slice(12, 40);
//   nonSlice1 = nonTimeDisplay.map(nonCalcCol);
//   nonSlice1.sort();
//   console.log(nonSlice);
//
//   for( var i = 0; i < nonSlice1.length; i++){
//
//     if ( nonSlice1.length > 10 ) {
//       nonSlice1.splice(0, 10);
//     }
//     else if ( nonSlice.length < 10 ) {
//       nonSlice1 = 0;
//     }
//
//   };

  //////

//temporal checks
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

  // console.log(nonHazNa);
  // console.log(hazNullToNa);

  document.getElementById('totalAsteroids').textContent = element_count;
  document.getElementById('potentiallyHazardous').textContent = totalHaz;
  document.getElementById('nonHazardous').textContent = nonHaz;

  document.getElementById('hazTimeDisplay').textContent = hazSlice.join("\r\n") + "\r\n" + hazNullToNa.join("\r\n");

  document.getElementById('hazMissDist').textContent = hazFormat.join("\r\n");
  document.getElementById('nonMissDist').textContent = nonFormat.join("\r\n");
  // document.getElementById('hazTimeDisplay').style.fontSize = (hazSlice.length * 4) + "vmin";

  document.getElementById('nonHazTimeDisplay').textContent = nonSlice.join("\r\n") + "\r\n" + nullToNa.join("\r\n");

  document.getElementById('noHaMiSz').textContent = noHaMiSzDisp.join("\r\n");
  document.getElementById('noHaMxSz').textContent = noHaMxSzDisp.join("\r\n");

  document.getElementById('hazMiSz').textContent = hazMiSzDisp.join("\r\n");
  document.getElementById('hazMxSz').textContent = hazMxSzDisp.join("\r\n");

  // document.getElementById('time').textContent = time;

  //fix this so doesn't throw error when empty
  // document.getElementById('nonHazTimeDisplay2').textContent = nonSlice1.join("\r\n");

  // document.getElementById('nonHazTimeDisplay').style.fontSize = nonSlice.length/7 + "vmin";

  // document.getElementById('date').textContent = displayDate;
  // document.getElementById('vel').textContent = velocity;

  };

  getAst().catch(alert);

  setInterval(getAst, 60000);


