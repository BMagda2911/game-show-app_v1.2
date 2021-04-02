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

// An array of phrases that contains at least 5 different ones as strings is set up.
const phrases = [
  "Get your act together",
  "Cut somebody some slack",
  "A dime a dozen",
  "To get bent out of shape",
  "Add insult to injury"
];

// -- start of all functions --

// Create a getRandomPhraseAsArray function.
const getRandomPhraseAsArray = array => {
  // This function randomly chooses a phrase from the phrases array on line 10 and splits that phrase into a new array of characters. The function then returns the new character array.
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

// Create checkLetter function. The parameter 'chosenButton' is the player's guess (the button that gets clicked).
const checkLetter = (chosenButton) => {
  const injectedLetters = phrase.querySelectorAll('.letter');
  let match = null;
  for (let i = 0; i < injectedLetters.length; i++) {
    if (chosenButton.textContent === injectedLetters[i].textContent) {
      injectedLetters[i].classList.add(' show', ' show-hover'); // help source: https://www.w3schools.com/jsref/prop_element_classlist.asp
      match = chosenButton;
    }
  }
  return match; // exits the function with null value as no match was found and returns the value of match, if match was found
}

// Add an event listener to the start button.
startGameButton.addEventListener('click', () => {
  if (startGameButton.textContent === 'Start Game') {
    startTheGame();
    overlay.style.display = 'none';
  }/*  else {
    // here the resetTheGame method needs to be inserted for "exceeds expectations"
    // here the startTheGame method needs to be inserted 
    overlay.style.display = '';
  } */
});


// Add an event listener to the keyboard (#qwerty).
// help source: https://teamtreehouse.com/workspaces/41775226 and course (Javascript and the DOM)
qwerty.addEventListener('click', (e) => {
  const letterAsButton = e.target;
  if (letterAsButton.tagName === 'BUTTON') {
    letterAsButton.classList.add('chosen');
    letterAsButton.disabled = true;
    const letterFound = checkLetter(letterAsButton.textContent);
    if (letterFound === null) {
      heartImage[missed].src = lostHeartSRC;
      missed++;
    }
  }
  checkWin();
});

// Create checkWin function --start
const checkWin = () => {
  if (letterLI.length === showLI.length) {
    toggleOverlay('win', 'flex');
  } else if (missed > 4) {
    toggleOverlay('lose', 'flex');
  }
}

// Create function to toggle overlays when needed
function toggleOverlay(cssClass, styling) {
  overlay.className = cssClass;
  overlay.style.display = styling;
}