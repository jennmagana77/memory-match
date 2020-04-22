var gameCards = document.getElementById("gameCards")
gameCards.addEventListener("click", handleClick);

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var maxMatches = 9;
var matches = 0;

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  var target = event.target;
  target.className += " hidden";

  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className
    gameCards.removeEventListener("click", handleClick);
    if (firstCardClasses === secondCardClasses) {
      gameCards.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++
      if (maxMatches === matches) {
        var modalElement = document.getElementById("modal")
        modalElement.classList.remove("hidden")
      }
    } else {
      setTimeout(hideCards, 1500)
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
