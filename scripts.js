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

function nexxt() {
  uitlezer();
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
  uitlezer();
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

function uitlezer() {
  d3.text('https://bsgmarathon.com/revealooo/schedule/cuts.txt').then(function(data) {
    var lines = data.toString().split('\n');
    scheduleContent = lines[number - 1].split(",");
    bsgContent = lines[number].split(",");
  });
}

function addToSchedule() {
  document.querySelector("#schedule").style.opacity = 1;
  document.querySelector("#m").innerHTML += "<tr class='hide'><td><div class='schedtext'>" + scheduleContent[0] + " " + scheduleContent[1] + "</div></td><td><div class='schedtext'>" + scheduleContent[3] + "</div></td><td><div class='schedtext'> " + scheduleContent[4] + " || " + scheduleContent[2] + "</div></td><td><div class='schedtext'>" + scheduleContent[5] + "</div></td></tr>";
  i++;
  animateTable();
  $("#schedule").scrollTop($("#schedule")[0].scrollHeight);
}

var animateTable = function(i, rows)
{
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
    gamenaam.innerHTML = bsgContent[3];
    runnernaam.innerHTML = bsgContent[2];
    catnaam.innerHTML = bsgContent[4];
    estnaam.innerHTML = bsgContent[5];
    dagnaam.innerHTML = bsgContent[0];
    tijdnaam.innerHTML = bsgContent[1];
    main.style.opacity = 1;
    setTimeout(function() {
      opacitySwitch(1);
    }, 1500);
  }, 2500);
}

// animaties: https://codepen.io/erikL/pen/JoOGZd?editors=0010
