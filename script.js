var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick);

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var maxMatches = 9;
var matches = 0;

var attempts = 0;
var gamesPlayed = 0;


function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  var target = event.target;
  target.className += " hidden";

  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener("click", handleClick);
    if (firstCardClasses === secondCardClasses) {
      gameCards.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++
      attempts++
      displayStats()
      if (maxMatches === matches) {
        var modalElement = document.getElementById("modal");
        modalElement.classList.remove("hidden");
      }
    } else {
      setTimeout(hideCards, 1500)
      attempts++
      displayStats()
    }
  }
}

function hideCards() {
  firstCardClicked.classList.remove("hidden");
  secondCardClicked.classList.remove("hidden");
  gameCards.addEventListener("click", handleClick);
  firstCardClicked = null;
  secondCardClicked = null;
}

function displayStats() {
  document.getElementById("userGames").textContent = gamesPlayed;
  document.getElementById("userAttempts").textContent = attempts;
  document.getElementById("userAccuracy").textContent = calculateAccuracy(attempts, matches)
}

function calculateAccuracy(attempts, matches) {
  return Math.trunc((matches / attempts) * 100) + "%";
}
