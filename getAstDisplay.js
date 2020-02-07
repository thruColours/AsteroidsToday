
// const api_url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-01-31&end_date=2020-01-31&api_key=oc2osS1PDgSZWDOphc4r10HtzpHVZacT59v3drpp';
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
  let astTimes = [];
  let allId = [];
  let hazId = [];
  let hazString = hazId.toString();
  let hazTimeDisplay = [];
  let hazTimeBr = [];
  // let hazTimeDisHours = Date.hazTimeDisplay.getHours();

  // const fakeAst = [{
  //   unixTime: 1580921024000,
  //   is_potentially_hazardous_asteroid: true
  // }];

  //slice just time from each element in array????
  // hazTimeDisplay.forEach(item  =>
  //   item.slice( 5 , 10 ));
  //   hazTimeBr.push();
  // console.log(hazTimeBr);

  console.log(near_earth_objects);
  // console.log(currentDate);

  //make sure to use '===' or atleast '==' you numpty!
  near_earth_objects[currentDate].forEach((item) => {

    astTimes.push(item.close_approach_data[0].epoch_date_close_approach);
    allId.push(item.id);


    if (item.is_potentially_hazardous_asteroid === true) {
    totalHaz++;
    hazId.push(item.id);
    hazTimeDisplay.push(item.close_approach_data[0].close_approach_date_full);
    // hazTimeDisplay.push(item.close_approach_data[0].close_approach_date_full.replace(",", "<br />"));
    // console.log(item.id);
    }
    console.log(item.is_potentially_hazardous_asteroid)
    }
    );

  //add fake date to check display positioning with break between each element
  // hazTimeDisplay.push("2020-Feb-06 16:20")
  console.log(hazTimeDisplay);

  astTimes.push(1581008220000);
  // console.log(astTimes);
  //
  allId.push("420");
  console.log(allId);

  hazId.push("420");
  console.log(hazId);

  allId.push(hazString);

  //turn milliseconds into seconds (coeff) and use this to round current time to nearest minute
  //so can check if time of hazardous asteroid falls within the current minute
  let coeff = 1000 * 60;
  let date = new Date();
  let rounded = new Date(Math.round(date.getTime()/ coeff) * coeff);

  console.log(date.getTime());

  // near_earth_objects.[2020-01-31].id.push("420");
  // console.log(data.id);

  //convert id of hazardous to string, add to allId array and check the existence of string correlates with time
  if (astTimes.includes(rounded.getTime())&&allId.includes(hazString)) {
    console.log("animation");
  }
  else {
    console.log("no animation");
  };

  // //works, but better check needed
  // if (astTimes.includes(rounded.getTime())&&hazId.includes("420")) {
  //   console.log("animation");
  // }
  // else {
  //   console.log("no animation");
  // };

  // //fake try 1
  // if (astTimes.includes(rounded.getTime())&&fakeAst.is_potentially_hazardous_asteroid === true) {
  //   console.log("animation");
  // }
  // else {
  //   console.log("no animation");
  // };

  document.getElementById('totalAsteroids').textContent = element_count;
  document.getElementById('potentiallyHazardous').textContent = totalHaz;
  document.getElementById('hazTimeDisplay').textContent = hazTimeDisplay.join('\n');
  // document.getElementById('date').textContent = displayDate;
  // document.getElementById('vel').textContent = velocity;


  }

  getAst().catch(alert);

// getISS();

  setInterval(getAst, 60000);

