var numberSeries = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
var gameBoxBack = [];
var nodes = [];
var gameFlipper = [];
var node;
var num;

function setEventListeners () {
  gameFlipper = document.querySelectorAll(".game__flipper");
  for (var i = 0; i < gameFlipper.length; i++) {
    var node = gameFlipper[i];
    node.addEventListener("click", flip, false);
  }
}

function flip (event) {
  var parent = event.target.parentNode;
  parent.classList.toggle("flip");
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function setSeries (nodes, numberSeries) {
  gameBoxBack = document.querySelectorAll(".game__box-back");
  for (let i = 0; i < gameBoxBack.length; i++) {
    var node = gameBoxBack[i];
    nodes.push(node);
  }
  for (let j = 0; j < nodes.length; j++) {
    for (let z = 0; z < j+1; z++) {
      nodes[j].setAttribute("class", "game__box-back " +numberSeries[z]);
    }
  }
}

function setPictures () {
  for (let i = 0; i < gameBoxBack.length; i++) {
    num = gameBoxBack[i].classList[1];
    if (num == 1) {
      gameBoxBack[i].style.backgroundImage = "url(img/charmander.jpg)";
      gameBoxBack[i].style.backgroundSize = "120px 120px";
    }
  }
}

shuffle(numberSeries);
setSeries(nodes, numberSeries);
setPictures();
setEventListeners();
