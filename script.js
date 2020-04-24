var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick);

var modalElement = document.getElementById("modal");

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var maxMatches = 9;
var matches = 0;

var attempts = 0;
var gamesPlayed = 0;

var cardClasses = [
  "earth-logo",
  "jupiter-logo",
  "mars-logo",
  "mercury-logo",
  "moon-logo",
  "neptune-logo",
  "saturn-logo",
  "venus-logo",
  "uranus-logo",
  "earth-logo",
  "jupiter-logo",
  "mars-logo",
  "mercury-logo",
  "moon-logo",
  "neptune-logo",
  "saturn-logo",
  "venus-logo",
  "uranus-logo",]

var cardFrontClass = document.getElementsByClassName("card-front");


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
      matches++;
      attempts++;
      displayStats()
      if (maxMatches === matches) {
        modalElement.classList.remove("hidden");
      }
    } else {
      setTimeout(hideCards, 1200);
      attempts++;
      displayStats();
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
  document.getElementById("userAccuracy").textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
  if (attempts === 0) {
    return 0 + "%";
  }
  return Math.trunc((matches / attempts) * 100) + "%";
}

function resetGame() {
  matches = 0;
  attempts = 0;
  gamesPlayed++
  displayStats();
  resetCards();
  shuffleCards()
  modalElement.classList.add("hidden");
}

function resetCards() {
  var hiddenCards = document.querySelectorAll(".card-back");
  for (var index = 0; index < hiddenCards.length; index++) {
    hiddenCards[index].classList.remove("hidden");
  }
}
var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

function shuffleCards() {
  for (var i = 0; i < cardClasses.length; i++) {
    var randomPosition = Math.floor(Math.random() * cardClasses.length);
    var placeHolder = cardClasses[i];
    cardClasses[i] = cardClasses[randomPosition];
    cardClasses[randomPosition] = placeHolder;
  }
  displayCards();
}

function displayCards() {
  for (var i = 0; i < cardFrontClass.length; i++) {
    cardFrontClass[i].className = "card-front" + " " + cardClasses[i];
  }
}

function createCards() {
  for (var i = 0; i < cardClasses.length; i++) {
    var div = document.createElement("div");
    div.classList.add("card", "col-2");

    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front", cardClasses[i]);

    var cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    div.append(cardFront, cardBack);
    gameCards.append(div);
  }
}

window.addEventListener("load", load);
function load() {
  createCards();
  shuffleCards();
}
