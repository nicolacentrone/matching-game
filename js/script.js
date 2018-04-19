let numberSeries = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
let gameBoxBack = [];
let nodes = [];
let gameFlipper = [];
let number1;
let number2;
let cardsFlipped = 0; /* The cards that are flipped in this moment. They can be
0, 1, 2. This is not the number of total cards flipped, neither the number of
matches. */
let eventTarget1;
let eventTarget2;
let isCicleStarted = false;
let numberOfMatches = 0;
let time;
let seconds = 0;
let minutes = 0;
let hours = 0;
let countMoves = 0;
let isCleared = false;
let isRestarted = false;
let stars;
let newTime;

function setEventListeners () {
  gameFlipper = document.querySelectorAll(".game__flipper");
  for (let i = 0; i < gameFlipper.length; i++) {
    let node = gameFlipper[i];
    node.addEventListener("click", flipperLogic, false);
  }
}

function flipperLogic (event) {
  if (numberOfMatches < 8) {
    if ((cardsFlipped == 0 && isCicleStarted == false) && (event.target.classList[0] == "game__box-front")) {
      isCicleStarted = true;
      flip(event);
      cardsFlipped ++;
      number1 = event.target.nextElementSibling.classList[1];
      eventTarget1 = event.target;
    } else if ((cardsFlipped == 1 && isCicleStarted == true) && (event.target.classList[0] == "game__box-front")) {
      flip(event);
      cardsFlipped ++;
      number2 = event.target.nextElementSibling.classList[1];
      eventTarget2 = event.target;
      if (number1 != number2) {
        countMoves ++;
        unflip(eventTarget1, eventTarget2);
      } else {
        countMoves ++;
        cardsFlipped = 0;
        isCicleStarted = false;
        numberOfMatches ++;
        if (numberOfMatches == 8) {
          winningScreen();
        }
      }
    }
  }
  if (numberOfMatches < 8) {
    starsLogic();
    clearMoves();
    createMoves();
  } else {
    numberOfMatches = 0;
  }
}

function flip (evt) {
  evt.target.parentNode.setAttribute("class", "game__flipper flip");
}

function unflip (node1, node2) {
  setTimeout(function() {
    node1.parentNode.setAttribute("class", "game__flipper");
    node2.parentNode.setAttribute("class", "game__flipper");
    cardsFlipped = 0;
    isCicleStarted = false;
  }, 1000);

}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function setSeries (nodes, numberSeries) {
  let node;
  nodes = [];
  gameBoxBack = document.querySelectorAll(".game__box-back");
  for (let i = 0; i < gameBoxBack.length; i++) {
    node = gameBoxBack[i];
    nodes.push(node);
  }
  for (let j = 0; j < nodes.length; j++) {
    for (let z = 0; z < j+1; z++) {
      nodes[j].setAttribute("class", "game__box-back " +numberSeries[z]);
    }
  }
}

function setPictures () {
  let num;
  for (let i = 0; i < gameBoxBack.length; i++) {
    num = gameBoxBack[i].classList[1];
    if (num == 1) {
      gameBoxBack[i].style.backgroundImage = "url(img/ivysaur.png)";
    } else if (num == 2) {
      gameBoxBack[i].style.backgroundImage = "url(img/pikachu.png)";
    } else if (num == 3) {
      gameBoxBack[i].style.backgroundImage = "url(img/krabby.png)";
    } else if (num == 4) {
      gameBoxBack[i].style.backgroundImage = "url(img/pidgeon.png)";
    } else if (num == 5) {
      gameBoxBack[i].style.backgroundImage = "url(img/vaporeon.png)";
    } else if (num == 6) {
      gameBoxBack[i].style.backgroundImage = "url(img/dugtrio.png)";
    } else if (num == 7) {
      gameBoxBack[i].style.backgroundImage = "url(img/jigglypuff.png)";
    } else if (num == 8) {
      gameBoxBack[i].style.backgroundImage = "url(img/squirtle.png)";
    }
  }
}

function winningScreen () {
  let newMain;
  let newDiv0, newDiv1, newDiv2, newDiv3;
  let congratsText;
  let statsDiv = [];
  let newP, newP0, newP1;
  let btn;
  let text;

  isRestarted = false;
  newMain = clearScreen();

  newDiv0 = document.createElement("div");
  newDiv0.setAttribute("class", "winningScreen__container");
  newDiv1= document.createElement("div");
  newDiv1.setAttribute("class", "congrat__container swing");
  congratsText = document.createElement("p");
  congratsText.innerHTML = "Congratulations <br> You Win!";
  newDiv1.appendChild(congratsText);
  newDiv0.appendChild(newDiv1);

  newDiv2 = document.createElement("div");
  newDiv0.appendChild(newDiv2);
  newDiv2.setAttribute("class", "stats__container");
  newDiv0.appendChild(newDiv2);
  for (let i = 0; i < 3; i++) {
    statsDiv[i] = document.createElement("div");
    statsDiv[i].setAttribute("class", "stats");
    newDiv2.appendChild(statsDiv[i]);
  }

  newP = document.createElement("p");
  newP.innerHTML = stars.innerHTML;
  statsDiv[0].appendChild(newP);

  newP0 = document.createElement("p");
  newP0.innerHTML = newTime.innerHTML;
  statsDiv[1].appendChild(newP0);

  newP1 = document.createElement("p");
  newP1.innerHTML = countMoves + " moves";
  statsDiv[2].appendChild(newP1);

  newDiv3 = document.createElement("div");
  newDiv3.setAttribute("class", "button__container");
  btn = document.createElement("button");
  text = document.createTextNode("Play again");
  btn.appendChild(text);
  btn.addEventListener("click", startGame, false);
  newDiv3.appendChild(btn);
  newDiv0.appendChild(newDiv3);

  newMain.appendChild(newDiv0);
  countMoves = 0;
}

function createGameHeaderDiv () {
  const main = document.querySelector("main");
  const newGameDiv = document.createElement("div");
  main.appendChild(newGameDiv);
  newGameDiv.setAttribute("class", "header");
}

function createGameDiv () {
  const main = document.querySelector("main");
  const newGameDiv = document.createElement("div");
  main.appendChild(newGameDiv);
  newGameDiv.setAttribute("class", "game");
}

function createFlipperContainerDiv () {
  let gameDiv;
  let newFlipperContainerDiv;
  for (let i = 0; i < 16; i++) {
    gameDiv = document.querySelector(".game")
    newFlipperContainerDiv = document.createElement("div");
    gameDiv.appendChild(newFlipperContainerDiv);
    newFlipperContainerDiv.setAttribute("class", "game__flipper-container");
  }
}

function createFlipperDiv () {
  let newFlipperDiv;
  gameFlipperContainers = document.querySelectorAll(".game__flipper-container");
  for (let i = 0; i < gameFlipperContainers.length; i++) {
    newFlipperDiv = document.createElement("div");
    newFlipperDiv.setAttribute("class", "game__flipper")
    gameFlipperContainers[i].appendChild(newFlipperDiv);
  }
}

function createBoxes () {
  let newBoxFront;
  let newBoxBack;
  gameFlipperContainers = document.querySelectorAll(".game__flipper");
  for (let i = 0; i < gameFlipperContainers.length; i++) {
    newBoxFront = document.createElement("div");
    newBoxFront.setAttribute("class", "game__box-front")
    newBoxBack = document.createElement("div");
    newBoxBack.setAttribute("class", "game__box-back")
    gameFlipperContainers[i].appendChild(newBoxFront);
    gameFlipperContainers[i].appendChild(newBoxBack);
  }
}

function clearScreen () {
  let topContainer;
  let newContainer;
  let newHeader;
  let newMain;
  topContainer = document.querySelector(".top-container")
  topContainer.remove();
  newContainer = document.createElement("div");
  newContainer.setAttribute("class", "top-container");
  document.querySelector("body").appendChild(newContainer);
  newHeader = document.createElement("header");
  newMain = document.createElement("main");
  newContainer.appendChild(newHeader);
  newContainer.appendChild(newMain);
  seconds = 0;
  minutes = 0;
  hours = 0;
  isCleared = true;
  return newContainer;
}

function createGameStruct () {
  clearScreen();
  createHeader();
  createGameDiv();
  createFlipperContainerDiv();
  createFlipperDiv();
  createBoxes();
  isCleared = false;
}

function startGame () {
  createGameStruct();
  shuffle(numberSeries);
  setSeries(nodes, numberSeries);
  setPictures();
  setEventListeners();
  if (isRestarted == false) {
    timer();
  }
}

function createHeader () {
  let header;
  let newDiv;
  let newHeader;
  let section0;
  header = document.querySelector("header");
  for (let i = 0; i < 5; i++) {
    newDiv = document.createElement("div");
    newDiv.setAttribute("class", "section"+[i]);
    header.appendChild(newDiv);
  }
  newHeader = document.createElement("h1");

//For debug purpose, you can win by clicking the header
  newHeader.addEventListener("click", winningScreen, false);

  newHeader.innerHTML="Memory Game";
  section0 = document.querySelector(".section0");
  section0.appendChild(newHeader);
  createTime();
  createStars();
  createMoves();
  createRepeat();
}

function createTime (){
  newHdr = document.createElement("h3");
  document.querySelector(".section2").appendChild(newHdr);
  newTime = document.createElement("time");
  newTime.innerHTML = "00:00:00";
  newTime.setAttribute("class", "time");
  newHdr.appendChild(newTime);
}

function timer () {
  time = setTimeout(addTime, 1000);
}

function addTime() {
    seconds ++;
    if (seconds >= 60) {
        seconds = 0;
        minutes ++;
        if (minutes >= 60) {
            minutes = 0;
            hours ++;
        }
    }
    if (isCleared == false) {
      document.querySelector(".time").textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
      timer();
    }
}

function createStars () {
  let section1;
  let newP;
  section1 = document.querySelector(".section1");
  newP = document.createElement("p");
  newP.setAttribute("class", "stars");
  newP.innerHTML = "★ ★ ★";
  section1.appendChild(newP);
}

function starsLogic () {
  stars = document.querySelector(".stars");
  if(countMoves >10 && countMoves <= 15) {
    stars.innerHTML = "★ ★ ☆";
  } else if (countMoves > 15 && countMoves <= 20) {
    stars.innerHTML = "★ ☆ ☆";
  } else if (countMoves > 25) {
    stars.innerHTML = "☆ ☆ ☆";
  }
}

function createMoves () {
  let section3;
  let newHdr;
  section3 = document.querySelector(".section3");
  newHdr = document.createElement("h3");
  newHdr.innerHTML = "Moves: " +countMoves;
  section3.appendChild(newHdr);
}

function clearMoves () {
  let section3;
  section3 = document.querySelector(".section3");
  section3.firstChild.remove();
}

function createRepeat () {
  let section4;
  let newDiv;
  section4 = document.querySelector(".section4");
  newDiv = document.createElement("div");
  section4.appendChild(newDiv);
  newDiv.setAttribute("class", "repeatButton__container");
  newDiv.style.backgroundImage = "url(img/repeat.png)";
  newDiv.style.backgroundSize = "28px 28px";
  newDiv.addEventListener("click", reStartGame, false);
}

function reStartGame () {
  isRestarted = true;
  startGame();
}

startGame();
