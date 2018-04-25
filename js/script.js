let numberSeries = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
let gameBoxBack = [];
let nodes = [];
let gameFlipper = [];
let number1;
let number2;
let eventTarget1;
let eventTarget2;
let time;
let stars;
let newTime;

/* The cards that are flipped in this moment. They can be
0, 1, 2. This is not the number of total cards flipped, neither the number of
matches */
let cardsFlipped = 0;

let numberOfMatches = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let countMoves = 0;
let isCycleStarted = false;

/* To allow the refresh of timestamp only in the game screen and not in the
 winning screen */
let isPageCleared = false;

let isGameRestarted = false;
let isFirstClick = true;

/* If set to true, by clicking the main title you can win the game */
const IS_DEBUG_MODE = true;

/*
* startGame is a container function for grouping all the functions to start
* a new game
*/
function startGame () {
  countMoves = 0;
  isFirstClick = true;
  createGameStruct();
  shuffle(numberSeries);
  setSeries(nodes, numberSeries);
  setPictures();
  setEventListeners();
}

/*
* createGameStruct is a container function for grouping all the functions to
* create a new game structure
*/
function createGameStruct () {
  clearScreen();
  createHeaderStruct();
  createGameDiv();
  createFlipperContainerDiv();
  createFlipperDiv();
  createBoxes();
  isPageCleared = false;
}

/*
* clearScreen deletes the topContainer div and repaints the page with a new empty
* div
* Called by: createGameStruct
*/
function clearScreen () {
  let topContainer;
  let newContainer;
  let newHeader;
  let newMain;
  topContainer = document.querySelector('.top-container')
  topContainer.remove();
  newContainer = document.createElement('div');
  newContainer.setAttribute('class', 'top-container');
  document.querySelector('body').appendChild(newContainer);
  newHeader = document.createElement('header');
  newMain = document.createElement('main');
  newContainer.appendChild(newHeader);
  newContainer.appendChild(newMain);

  // Every time the page is cleared the time is reset
  seconds = 0;
  minutes = 0;
  hours = 0;

  isPageCleared = true;
  return newContainer;
}

/*
* createHeaderStruct groups various functions to build the top part of the game
* Called by: createGameStruct
*/
function createHeaderStruct () {
  createHeaderDiv();
  createTime();
  createStars();
  createMoves();
  createRepeat();
}

/*
* Creates the necessary divs for the header
* Called by: createHeaderStruct()
*/
function createHeaderDiv () {
  let header;
  let newDiv;
  let newHeader;
  let headerContainer;
  let classes = ['header__container', 'stats__stars-container',
  'stats__time-container', 'stats__move-container', 'stats__replay-container'];
  header = document.querySelector('header');
  for (let i = 0; i < 5; i++) {
    newDiv = document.createElement('div');
    newDiv.setAttribute('class', '' + classes[i]);
    header.appendChild(newDiv);
  }
  newHeader = document.createElement('h1');

  // For debug purpose only
  if(IS_DEBUG_MODE == true) {
    newHeader.addEventListener('click', winningScreen, false);
  }

  newHeader.innerHTML='Memory Game';
  headerContainer = document.querySelector('.header__container');
  headerContainer.appendChild(newHeader);
}

/*
* Prints the 00:00:00 timestamp in the header
* Called by: createHeaderStruct()
*/
function createTime (){
  let newHdr;
  newHdr = document.createElement('h3');
  document.querySelector('.stats__time-container').appendChild(newHdr);
  newTime = document.createElement('time');
  newTime.innerHTML = '00:00:00';
  newTime.setAttribute('class', 'time');
  newHdr.appendChild(newTime);
}

/*
* Prints the three stars in the header
* Called by: createHeaderStruct()
*/
function createStars () {
  let starsContainer;
  let newP;
  starsContainer = document.querySelector('.stats__stars-container');
  newP = document.createElement('p');
  newP.setAttribute('class', 'stars');
  newP.innerHTML = '★ ★ ★';
  starsContainer.appendChild(newP);
}

/*
* Prints the number of moves
* Called by: createHeaderStruct()
*/
function createMoves () {
  let moveContainer;
  let newHdr;
  moveContainer = document.querySelector('.stats__move-container');
  newHdr = document.createElement('h3');
  newHdr.innerHTML = 'Moves: ' +countMoves;
  moveContainer.appendChild(newHdr);
}

/*
* Prints the in-game repeat icon in the header and starts the eventListener
* Called by: createHeaderStruct()
*/
function createRepeat () {
  let replayContainer;
  let newDiv;
  replayContainer = document.querySelector('.stats__replay-container');
  newDiv = document.createElement('div');
  replayContainer.appendChild(newDiv);
  newDiv.setAttribute('class', 'repeat-button__container');
  newDiv.style.backgroundImage = 'url(img/repeat.png)';
  newDiv.style.backgroundSize = '28px 28px';
  newDiv.addEventListener('click', reStartGame, false);
}

/*
* Creates the main game div container
* Called by: createGameStruct
*/
function createGameDiv () {
  const main = document.querySelector('main');
  const newGameDiv = document.createElement('div');
  main.appendChild(newGameDiv);
  newGameDiv.setAttribute('class', 'game');
}

/*
* Element needed as background for rotation
* Called by: createGameStruct()
*/
function createFlipperContainerDiv () {
  let gameDiv;
  let newFlipperContainerDiv;
  for (let i = 0; i < 16; i++) {
    gameDiv = document.querySelector('.game');
    newFlipperContainerDiv = document.createElement('div');
    gameDiv.appendChild(newFlipperContainerDiv);
    newFlipperContainerDiv.setAttribute('class', 'game__flipper-container');
  }
}

/*
* Element that actually flips
Called by: createGameStruct()
*/
function createFlipperDiv () {
  let newFlipperDiv;
  gameFlipperContainers = document.querySelectorAll('.game__flipper-container');
  for (let i = 0; i < gameFlipperContainers.length; i++) {
    newFlipperDiv = document.createElement('div');
    newFlipperDiv.setAttribute('class', 'game__flipper')
    gameFlipperContainers[i].appendChild(newFlipperDiv);
  }
}

/*
* Create the elements that will show the background image and the blue color
* Called by: createGameStruct()
*/
function createBoxes () {
  let newBoxFront;
  let newBoxBack;
  gameFlipperContainers = document.querySelectorAll('.game__flipper');
  for (let i = 0; i < gameFlipperContainers.length; i++) {
    newBoxFront = document.createElement('div');
    newBoxFront.setAttribute('class', 'game__box-front')
    newBoxBack = document.createElement('div');
    newBoxBack.setAttribute('class', 'game__box-back')
    gameFlipperContainers[i].appendChild(newBoxFront);
    gameFlipperContainers[i].appendChild(newBoxBack);
  }
}

/*
* Takes a string of 16 number as parameter and shuffle them
* Called by: startGame()
*/
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

/*
* Takes the shuffled numbers and arrange them as a new class for the existing
* class .game__box-back
* Called by: startGame()
*/
function setSeries (nodes, numberSeries) {
  let node;
  nodes = [];
  gameBoxBack = document.querySelectorAll('.game__box-back');
  for (let i = 0; i < gameBoxBack.length; i++) {
    node = gameBoxBack[i];
    nodes.push(node);
  }
  for (let j = 0; j < nodes.length; j++) {
    for (let z = 0; z < j+1; z++) {
      nodes[j].setAttribute('class', 'game__box-back ' +numberSeries[z]);
    }
  }
}

/*
* Set a picture to every number of numberSeries. In every game each number has
* always the same picture but this is invisible to the player.
* Called by: startGame()
*/
function setPictures () {
  let num;
  for (let i = 0; i < gameBoxBack.length; i++) {
    num = gameBoxBack[i].classList[1];
    if (num == 1) {
      gameBoxBack[i].style.backgroundImage = 'url(img/ivysaur.png)';
      gameBoxBack[i].setAttribute('alt', 'Ivysaur');
    } else if (num == 2) {
      gameBoxBack[i].style.backgroundImage = 'url(img/pikachu.png)';
      gameBoxBack[i].setAttribute('alt', 'Pikachu');
    } else if (num == 3) {
      gameBoxBack[i].style.backgroundImage = 'url(img/krabby.png)';
      gameBoxBack[i].setAttribute('alt', 'Krabby');
    } else if (num == 4) {
      gameBoxBack[i].style.backgroundImage = 'url(img/pidgeon.png)';
      gameBoxBack[i].setAttribute('alt', 'Pidgeon');
    } else if (num == 5) {
      gameBoxBack[i].style.backgroundImage = 'url(img/vaporeon.png)';
      gameBoxBack[i].setAttribute('alt', 'Vaporeon');
    } else if (num == 6) {
      gameBoxBack[i].style.backgroundImage = 'url(img/dugtrio.png)';
      gameBoxBack[i].setAttribute('alt', 'Dugtrio');
    } else if (num == 7) {
      gameBoxBack[i].style.backgroundImage = 'url(img/jigglypuff.png)';
      gameBoxBack[i].setAttribute('alt', 'Jigglypuff');
    } else if (num == 8) {
      gameBoxBack[i].style.backgroundImage = 'url(img/squirtle.png)';
      gameBoxBack[i].setAttribute('alt', 'Squirtle');
    }
  }
}

/*
* Every div with class .game__flipper act as a container listening for a click
* Called by: startGame()
*/
function setEventListeners () {
  gameFlipper = document.querySelectorAll('.game__flipper');
  for (let i = 0; i < gameFlipper.length; i++) {
    let node = gameFlipper[i];
    node.addEventListener('click', flipperLogic, false);
  }
}

/*
* Main game logic
* Called: when the player clicks a cell
*/
function flipperLogic (event) {
  // Needed to check if it is the first click, because it starts the timer once
  if (isFirstClick == true) {
    timer();
  }
  isFirstClick = false;

  // To win, a player needs to get 8 matches
  if (numberOfMatches < 8) {

    /* Is the first card to be clicked? We need also to prevent an error when a
    player keeps clicking constantly on a rotated card */
    if ((cardsFlipped == 0 && isCycleStarted == false) && (event.target.classList[0] == 'game__box-front')) {
      isCycleStarted = true;
      flip(event);
      cardsFlipped ++;
      number1 = event.target.nextElementSibling.classList[1];
      eventTarget1 = event.target;

    /* Is a card is already turned? We need also to prevent an error when a
    player keeps clicking constantly on a rotated card */
    } else if ((cardsFlipped == 1 && isCycleStarted == true) && (event.target.classList[0] == 'game__box-front')) {
      flip(event);
      cardsFlipped ++;
      number2 = event.target.nextElementSibling.classList[1];
      eventTarget2 = event.target;

      // Match or not?
      if (number1 != number2) {
        countMoves ++;
        unflip(eventTarget1, eventTarget2);
      } else {
        countMoves ++;
        cardsFlipped = 0;
        isCycleStarted = false;
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

/*
* flip is used to apply the class flip that enables the CSS rotation
*/
function flip (evt) {
  evt.target.parentNode.setAttribute('class', 'game__flipper flip');
}

/*
* unflip is used to delete the class flip that enables the CSS rotation
*/
function unflip (node1, node2) {
  setTimeout(function() {
    node1.parentNode.setAttribute('class', 'game__flipper');
    node2.parentNode.setAttribute('class', 'game__flipper');
    cardsFlipped = 0;
    isCycleStarted = false;
  }, 1000);

}

function winningScreen () {
  let newMain;
  let newDiv0, newDiv1, newDiv2, newDiv3;
  let congratsText;
  let statsDiv = [];
  let newP, newP0, newP1;
  let btn;
  let text;
  let classes = ['win-stats__stars', 'win-stats__time', 'win-stats__move'];

  isGameRestarted = false;
  newMain = clearScreen();
  newDiv0 = document.createElement('div');
  newDiv0.setAttribute('class', 'winning-screen__container');
  newDiv1= document.createElement('div');
  newDiv1.setAttribute('class', 'congrat__container');
  congratsText = document.createElement('p');
  congratsText.innerHTML = 'Congratulations <br> You Win!';
  newDiv1.appendChild(congratsText);
  newDiv0.appendChild(newDiv1);

  newDiv2 = document.createElement('div');
  newDiv0.appendChild(newDiv2);
  newDiv2.setAttribute('class', 'win-stats');
  newDiv0.appendChild(newDiv2);
  for (let i = 0; i < 3; i++) {
    statsDiv[i] = document.createElement('div');
    statsDiv[i].setAttribute('class', '' + classes[i]);
    newDiv2.appendChild(statsDiv[i]);
  }

  newP = document.createElement('p');
  newP.innerHTML = stars.innerHTML;
  statsDiv[0].appendChild(newP);

  newP0 = document.createElement('p');
  newP0.innerHTML = newTime.innerHTML;
  statsDiv[1].appendChild(newP0);

  newP1 = document.createElement('p');
  newP1.innerHTML = countMoves + ' moves';
  statsDiv[2].appendChild(newP1);

  newDiv3 = document.createElement('div');
  newDiv3.setAttribute('class', 'button__container');
  btn = document.createElement('button');
  text = document.createTextNode('Play again');
  btn.appendChild(text);
  btn.addEventListener('click', startGame, false);
  newDiv3.appendChild(btn);
  newDiv0.appendChild(newDiv3);

  newMain.appendChild(newDiv0);
  countMoves = 0;
}

function createGameHeaderDiv () {
  const main = document.querySelector('main');
  const newGameDiv = document.createElement('div');
  main.appendChild(newGameDiv);
  newGameDiv.setAttribute('class', 'header');
}

/*
* Used setTimeout as time counter
*/
function timer () {
  time = setTimeout(addTime, 1000);
}

/*
* addTime updates the timestamp and keeps cycling timer()
*/
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
    if (isPageCleared == false) {
      document.querySelector('.time').textContent = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' +
      (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
      timer();
    }
}

/*
* Called by: starsLogic()
*/
function starsLogic () {
  stars = document.querySelector('.stars');
  if(countMoves >10 && countMoves <= 15) {
    stars.innerHTML = '★ ★ ☆';
  } else if (countMoves > 15 && countMoves <= 20) {
    stars.innerHTML = '★ ☆ ☆';
  } else if (countMoves > 25) {
    stars.innerHTML = '☆ ☆ ☆';
  }
}

/*
* Called by: flipperLogic()
*/
function clearMoves () {
  let moveContainer;
  moveContainer = document.querySelector('.stats__move-container');
  moveContainer.firstChild.remove();
}

/*
* Called by: createRepeat() this is triggered when the user clicks the in-game
* restart button
*/
function reStartGame () {
  isGameRestarted = true;
  clearTimeout(time);
  startGame();
}

startGame();
