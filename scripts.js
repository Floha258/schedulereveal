// var fs = require('fs');
// var _ = require("lodash");
// var d3 = require('d3');
var cuts = "cuts.csv";
var bsgContent = [];
var scheduleContent = [];
var number = 0;
var gamenaam = document.querySelector('#gameNaam');
var estnaam = document.querySelector('#estNaam');
var catnaam = document.querySelector('#catNaam');
var dagnaam = document.querySelector('#dagNaam');
var tijdnaam = document.querySelector('#tijdNaam');
var runnernaam = document.querySelector('#runnerNaam');
var main = document.querySelector('#main');
var rows = 0;
var fadeTime = 700;
var delayTime = 50;
var animTime = 0;
var scheduleStop = true;
var i = 0;
var allJSON;
var revDate, revTime, revEstimate;

function nexxt() {
  Switch();
  number++
  if (scheduleStop) {
    scheduleStop = false;
  } else {
    setTimeout(function() {
      addToSchedule();
    }, 2000);
  }
}

function endit() {
  main.style.opacity = 0;
  number++
  if (scheduleStop) {
    scheduleStop = false;
  } else {
    setTimeout(function() {
      addToSchedule();
    }, 2000);
  }

}

function opacitySwitch(value) {
  gamenaam.style.opacity = value;
  runnernaam.style.opacity = value;
  catnaam.style.opacity = value;
  estnaam.style.opacity = value;
  tijdnaam.style.opacity = value;
  dagnaam.style.opacity = value;
}

function prev() {
  number--;
  Switch();
}

function addToSchedule() {
  document.querySelector("#schedule").style.opacity = 1;
  document.querySelector("#m").innerHTML += "<tr class='hide'><td><div class='schedtext'>" + revDate + " " + revTime + "</div></td><td><div class='schedtext'>" + allJSON.schedule.items[number].data[1] + "</div></td><td><div class='schedtext'> " + allJSON.schedule.items[number].data[2] + " || " + allJSON.schedule.items[number].data[0] + "</div></td><td><div class='schedtext'>" + revEstimate + "</div></td></tr>";
  i++;
  animateTable();
  $("#schedule").scrollTop($("#schedule")[0].scrollHeight);
}

var animateTable = function(i, rows) {
  (function next(i) {
    if (i++ >= rows) return;
    setTimeout(function() {
      $("#m tr:nth-child(" + i + ")").fadeTo(fadeTime, 0.7);
      next(i);
    }, delayTime);
  })(0, rows);
}

function Switch() {
  main.style.opacity = 0;
  opacitySwitch(0);

  setTimeout(function() {
    gamenaam.innerHTML = allJSON.schedule.items[number].data[1];
    runnernaam.innerHTML = allJSON.schedule.items[number].data[0];
    catnaam.innerHTML = allJSON.schedule.items[number].data[2];
    reverseDate();
    main.style.opacity = 1;
    setTimeout(function() {
      opacitySwitch(1);
    }, 1500);
  }, 2500);
}


let input = document.querySelector('input')

input.addEventListener('change', () => {
  let files = input.files;

  if (files.length == 0) return;

  const file = files[0];

  let reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;

    // This is a regular expression to identify carriage
    // Returns and line breaks
    const lines = file.split(/\r\n|\n/);
    allJSON = JSON.parse(lines.join('\n'));
    console.log(allJSON.schedule.items[4].data[1]);
  };
  reader.onerror = (e) => alert(e.target.error.name);
  reader.readAsText(file);
});

function reverseDate() {
  revEstimate = parseDuration(allJSON.schedule.items[number].length)
  if (revEstimate.length === 5) {
    revEstimate = "0:" + revEstimate;
  }
  estnaam.innerHTML = revEstimate;
  str = allJSON.schedule.items[number].scheduled;
  revDate = str.substring(8, 10) + str.substring(4, 7);
  revTime = str.substring(11, 16) + " (UTC " + str.substring(19, 22) + ")";
  dagnaam.innerHTML = revDate;
  tijdNaam.innerHTML = revTime;

}

function parseDuration(PT) {
  var output = [];
  var durationInSec = 0;
  var matches = PT.match(/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)W)?(?:(\d*)D)?T?(?:(\d*)H)?(?:(\d*)M)?(?:(\d*)S)?/i);
  var parts = [{ // years
      pos: 1,
      multiplier: 86400 * 365
    },
    { // months
      pos: 2,
      multiplier: 86400 * 30
    },
    { // weeks
      pos: 3,
      multiplier: 604800
    },
    { // days
      pos: 4,
      multiplier: 86400
    },
    { // hours
      pos: 5,
      multiplier: 3600
    },
    { // minutes
      pos: 6,
      multiplier: 60
    },
    { // seconds
      pos: 7,
      multiplier: 1
    }
  ];

  for (var i = 0; i < parts.length; i++) {
    if (typeof matches[parts[i].pos] != 'undefined') {
      durationInSec += parseInt(matches[parts[i].pos]) * parts[i].multiplier;
    }
  }

  // Hours extraction
  if (durationInSec > 3599) {
    output.push(parseInt(durationInSec / 3600));
    durationInSec %= 3600;
  }
  // Minutes extraction with leading zero
  output.push(('0' + parseInt(durationInSec / 60)).slice(-2));
  // Seconds extraction with leading zero
  output.push(('0' + durationInSec % 60).slice(-2));

  return output.join(':');
};



// animations: https://codepen.io/erikL/pen/JoOGZd?editors=0010
