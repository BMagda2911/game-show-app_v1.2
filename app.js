const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ulOfPhraseDiv = phrase.querySelector('ul');
const startGameButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const heartImage = document.querySelectorAll('img');
let missed = 0;

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
  const randomIndexInArray = Math.floor(Math.random() * array.length)
  const randomPhraseOfArray = array[randomIndexInArray]
  return phraseSplitToLetters = randomPhraseOfArray.split(''); // help source: https://www.w3schools.com/jsref/jsref_split.asp
}

// Create startGame function.
function startTheGame() {
  const arrayOfLettersFromPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(arrayOfLettersFromPhrase);
}


// Create an addPhraseToDisplay function that adds the letters of a string from the array phrases to the display
const addPhraseToDisplay = (phraseArray) => {
  for (let i = 0; i < phraseArray.length; i ++) {
    const letterAsListItem = document.createElement('li');
    letterAsListItem.textContent = phraseArray[i];
    ulOfPhraseDiv.append(letterAsListItem);
    letterAsListItem.textContent === " " ? letterAsListItem.classList.add('space') : letterAsListItem.classList.add('letter');
    // help source for tertiary operator syntax: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  }
}

// Create checkLetter function. The parameter 'chosenButton' is the player's guess.
const checkLetter = (chosenButton) => {
  const allLetters = document.querySelectorAll('.letter');
  let match = 0 || null;
  for (let i = 0; i < allLetters.length; i ++) {
    if (chosenButton === allLetters[i].textContent) {
      allLetters[i].classList.add('show'); // help source: https://www.w3schools.com/jsref/prop_element_classlist.asp
      match = chosenButton;
    }
  return match;
  }
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


// Add an event listener to the keyboard.
// help source: https://teamtreehouse.com/workspaces/41775226 (Javascript and the DOM)
qwerty.addEventListener('click', (e) => {
  const key = e.target;
  if (key.tagName === 'BUTTON') {
    key.className = 'chosen';
  } else {

  }
  checkLetter;
});