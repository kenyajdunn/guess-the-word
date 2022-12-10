const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //console.log(words);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●")
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    // empty message paragraph
    message.innerText = "";
    // get what what entered in the input
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //if input is empty
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        //if input is more than one letter
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        //if input has non number or special character
        message.innerText = "Please enter a letter from A to Z."
    } else {
        //input is a single letter!
        return input;
    }

};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updatedGuessesRemaining(guess);
        updateWordInProgress(guessedLetters); //adding "guessLetters" argument added correct guessed letter in place of "●" //
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
      } 
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedLetters = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedLetters.push(letter.toUpperCase());
        } else {
            updatedLetters.push("●");
        }
    }
    console.log(updatedLetters);
    wordInProgress.innerText = updatedLetters.join(""); 
    checkIfWin();   
};

const updatedGuessesRemaining = function (guess) {
   const upperWord = word.toUpperCase();
   if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word does not have a ${guess}`;
    remainingGuesses -= 1;
   }
   if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>`
   } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`
   } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
   }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
    }
};

