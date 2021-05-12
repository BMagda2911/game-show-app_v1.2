const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ulOfPhraseDiv = phrase.querySelector('ul');
const startGameButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const heartImage = document.querySelectorAll('.tries img');
const lostHeartSRC = 'images/lostHeart.png';
let missed = 0;
const letterLI = document.getElementsByClassName('letter');
const showLI = document.getElementsByClassName('show');
const headlineText = overlay.querySelector('.title');

// An array of phrases that contains at least 5 different ones as strings is set up.
const phrases = [
  "get your act together",
  "cut somebody some slack",
  "a dime a dozen",
  "to get bent out of shape",
  "add insult to injury"
];

// -- start of all functions --

// Create a getRandomPhraseAsArray function.
const getRandomPhraseAsArray = array => {
  // This function randomly chooses a phrase from the phrases array on line 14 and splits that phrase into a new array of characters. The function then returns the new character array.
  let randomIndexInArray = Math.floor(Math.random() * array.length)
  let randomPhraseInArray = array[randomIndexInArray]
  return phraseSplitToLetters = randomPhraseInArray.split(''); // help source: https://www.w3schools.com/jsref/jsref_split.asp
}

// Create startGame function.
function startTheGame() {
  const arrayOfLettersFromPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(arrayOfLettersFromPhrase);
}


// Create an addPhraseToDisplay function that adds the letters of a string from the array phrases to the display
const addPhraseToDisplay = (phraseArray) => {
  for (let i = 0; i < phraseArray.length; i++) {
    const letterAsListItem = document.createElement('li');
    letterAsListItem.textContent = phraseArray[i];
    ulOfPhraseDiv.appendChild(letterAsListItem);
    letterAsListItem.textContent === " " ? letterAsListItem.classList.add('space') : letterAsListItem.classList.add('letter');
    // help source for ternary operator syntax: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  }
}

// Create checkLetter function. The parameter 'letterAsListItem' is the player's guess (the button that gets clicked).
const checkLetter = (letterAsListItem) => {
  const injectedLetters = phrase.querySelectorAll('.letter');
  let match = null;
  for (let i = 0; i < injectedLetters.length; i++) {
    if (letterAsListItem === injectedLetters[i].textContent) {
      injectedLetters[i].classList.add('show');
      match = injectedLetters[i].textContent;
    }
  }
  return match; // exits the function with null value as no match was found and returns the value of match, if match was found
}

// Add an event listener to the start button.
startGameButton.addEventListener('click', () => {
  if (startGameButton.textContent === 'Start Game') {
    startTheGame();
    overlay.style.display = 'none';
  } else if (startGameButton.textContent === 'Try again' || 'Go again') {
    // here the game reset happens --> help source: https://developer.mozilla.org/en-US/docs/Web/API/Window/location
    window.location = location;
  }
});

// Add an event listener to the keyboard (#qwerty).
// help source: https://teamtreehouse.com/workspaces/41775226 and course (Javascript and the DOM)
qwerty.addEventListener('click', (e) => {
  const letterAsButton = e.target;
  if (letterAsButton.tagName === 'BUTTON') {
    letterAsButton.classList.add('correct-choice');
    letterAsButton.disabled = true;
    const letterFound = checkLetter(letterAsButton.textContent);
    if (letterFound === null) {
      letterAsButton.className = 'lose';
      heartImage[missed].src = lostHeartSRC;
      missed++;
    }
  }
  checkWin();
});

// Create additional function to toggle overlays when needed
const toggleOverlay = (cssClass, styling, text) => {
  overlay.className = cssClass;
  overlay.style.display = styling;
  headlineText.textContent = text;
}

// Create checkWin function
const checkWin = () => {
  if (letterLI.length === showLI.length) {
    toggleOverlay('win', 'flex', 'You are good at this! Challenge yourself again?');
    startGameButton.textContent = 'Go again';
  } else if (missed > 4) {
    toggleOverlay('lose', 'flex', 'You almost had it!');
    startGameButton.textContent = 'Try again';
  }
}