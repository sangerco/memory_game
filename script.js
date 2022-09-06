const gameContainer = document.getElementById("game");
let firstChoice = null;
let secondChoice = null;
let guesses = 0;
let alreadyClicked = false;

// const characters = [
//   "harry",
//   "ron",
//   "hermione",
//   "neville",
//   "draco",
//   "harry",
//   "ron",
//   "hermione",
//   "neville",
//   "draco",
// ];

const characters = [
  "blue",
  "red",
  "green",
  "orange",
  "purple",
  "blue",
  "red",
  "green",
  "orange",
  "purple",
];


function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledCards = shuffle(characters);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (alreadyClicked) return;
  if (e.target.classList.contains("flipped")) return;
  
  
  let currentCard = e.target;
  // currentCard.classList = currentCard.classList[0];
    currentCard.style.backgroundColor = currentCard.classList[0];

  if (!firstChoice || !secondChoice) {
    currentCard.classList.add("flipped");
    firstChoice = firstChoice || currentCard;
    secondChoice = currentCard === firstChoice ? null : currentCard;
  }

  if (firstChoice && secondChoice) {
    alreadyClicked = true;
    let card1 = firstChoice.className;
    let card2 = secondChoice.className;

    if (card1 === card2) {
      guesses += 2;
      firstChoice.removeEventListener("click", handleCardClick);
      secondChoice.removeEventListener("click", handleCardClick);
      firstChoice = null;
      secondChoice = null;
      alreadyClicked = false;
    } else {
      setTimeout (function () {
        // firstChoice.classList.add('.card-back');
        // secondChoice.classList.add('.card-back');
        firstChoice.style.backgroundColor = "";
        secondChoice.style.backgroundColor = "";
        firstChoice.classList.remove("flipped");
        secondChoice.classList.remove("flipped")
        firstChoice = null;
        secondChoice = null;
        alreadyClicked = false;
      }, 1000)
    }
  }

  if (guesses === characters.length) alert('Game Over!');

}

// when the DOM loads
createDivsForColors(shuffledCards);

/* */