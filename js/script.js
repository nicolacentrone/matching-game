var numberSeries = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
var gameFlipperContainers = [];
var nodes = [];

function flip(event) {
  gameFlipper.classList.toggle("flip");
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
  gameFlipperContainers = document.querySelectorAll(".game__flipper-container");
  for (let i = 0; i < gameFlipperContainers.length; i++) {
    var node = gameFlipperContainers[i];
    nodes.push(node);
  }
  for (let j = 0; j < nodes.length; j++) {
    for (let z = 0; z < j+1; z++) {
      nodes[j].setAttribute("class", "game__flipper-container " +numberSeries[z]);
    }
  }
}

gameFlipper = document.querySelector(".game__flipper");
gameFlipper.addEventListener("click", flip, false);
shuffle(numberSeries);
setSeries(nodes, numberSeries);
