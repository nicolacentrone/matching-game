var numberSeries = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
var gameBoxBack = [];
var nodes = [];
var newImg;
var num;

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
      newImg = document.createElement("img");
      newImg.setAttribute("class", "picture");
      newImg.setAttribute("src", "img/charmander.jpg");
      newImg.setAttribute("alt", "Charmander Pokémon");
      gameBoxBack[i].appendChild(newImg);
    }
  }
}

gameFlipper = document.querySelector(".game__flipper");
gameFlipper.addEventListener("click", flip, false);
shuffle(numberSeries);
setSeries(nodes, numberSeries);
setPictures();
