const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];


const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●")
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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
    }
};