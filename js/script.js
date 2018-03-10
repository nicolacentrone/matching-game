var gameFlipper;

function flip(event) {
  gameFlipper.classList.toggle("flip");
}

gameFlipper = document.querySelector(".game__flipper");
gameFlipper.addEventListener("click", flip, false);
