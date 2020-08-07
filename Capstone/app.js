function moveHands() {
      with (new Date()) {
        h = 30 * ((getHours() % 12) + getMinutes() / 60); // 30 degrees hour
        m = 6 * getMinutes(); // 6 degrees every minute
        s = 6 * getSeconds(); // 6 degrees every second
        // setting the rotate CSS attribute to those degree values -->
        document.getElementById("seconds").style.cssText =
          "-webkit-transform:rotate(" + s + "deg);";
        document.getElementById("minutes").style.cssText =
          "-webkit-transform:rotate(" + m + "deg);";
        document.getElementById("hours").style.cssText =
          "-webkit-transform:rotate(" + h + "deg);";
    
        setTimeout(moveHands, 1000); // calling the function every second
      }
    }


function getCalendar () {
      let day = document.getElementById("day")
      let date = document.getElementById("date")
      // let year = document.getElementById("year")
  
      var d = new Date();
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
  
      var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
      day.innerHTML = weekday[d.getDay()];
      date.innerHTML = months[d.getMonth()] + '\xa0' + d.getDate() + '\xa0' + d.getFullYear();
      // year.innerHTML = d.getFullYear();
  }


function newItem() {
    console.log("Inside newItem");
    var item = document.getElementById("input").value;
    console.log(item);
    
    // store the unordered list as a variable (now we can refer to it as "ul")
    var ul = document.getElementById("list");
    
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("- " + item));   // now put text in list item
    ul.appendChild(li);  // put list item in our unordered list
    
    document.getElementById("input").value = "";   // erase what is currently in todo list
    
    li.onclick = removeItem;  // run removeItem when the li is clicked
}

document.body.onkeyup = function(e) {
  if (e.keyCode == 13) {
    console.log("enter clicked!");
    newItem();
  }
};

function removeItem(e) {
  e.target.remove()
}


function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");

let api = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = "40e7ddf375c687e5dfe3576d9687709c";

location.innerHTML = "Locating...";

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  let url =
    api +
    "?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=imperial";

    console.log(url)

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let temp = data.main.temp;
      temperature.innerHTML = temp + "° F";
      location.innerHTML =
        data.name + " (" + latitude + "°, " + longitude + "°)";
      description.innerHTML = data.weather[0].main;
    });
}

function error() {
  location.innerHTML = "Unable to retrieve your location";
}
}

getWeather();

window.onload = function() {
  getCalendar();
  moveHands();
}