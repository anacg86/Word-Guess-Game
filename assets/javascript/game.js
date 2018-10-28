
//variables
var computerGuess = "";
var rayitas = [];
var guessesLeft = 13;
var lives = 0;
var correctGuesses = 0;
var guessesSoFar = [];
var incorrectGuesses = 0;
var guessedRightLetter = false; 

//connect text with variables
var correctGuessesText = document.getElementById("correctGuessesText")
var guessesLeftText = document.getElementById("guessesLeftText");
var livesText = document.getElementById("livesText")
var guessesSoFarText = document.getElementById("guessesSoFarText");
var incorrectGuessesText = document.getElementById("incorrectGuessesText");

//array for the word guess
var words = ["apple", "banana", "pear", "orange", "grape", "grapefruit", "mandarin", "lime", "strawberry", "apricot", "nectarine", "raspberry", "blueberry", "kiwifruit", "passionfruit", "mangoe", "watermelon"];
var userguess;
//function that will repeat each time we have a new word guess 
function repeticion() {
    //computer selects random number based on the length of the array
    computerGuess = words[Math.floor(Math.random() * words.length)];
    //restarts lines, correct guesses and guesses so far at none 
    rayitas = [];
    correctGuesses = 0;
    guessesSoFar = [];
    incorrectGuesses = 0;
    //checks which word the computer chose
    for (let i = 0; i < computerGuess.length; i++) {
        //prints lines into the html 
        rayitas.push('_');
    }
    //this will show how many guesses do i have compared to the length of the word that the computer chose
    guessesLeft = computerGuess.length + 2;
    //prints guesses, lives, guesses left, and lines 
    imprimirGuessesLivesLeftLines();
}
//the user clicks on start button to begin game 
document.getElementById("start").onclick = function (event) {
    alert("Let's play");
    repeticion();
}
//when the user clicks on a letter
document.onkeyup = function (event) {
    userguess = event.key.toLocaleLowerCase();
    console.log(userguess);
    //the computer will split the word into letters
    var computersplitletters = computerGuess.split("");
    //if the user guessed a letter from the word then
    if (computersplitletters.includes(userguess)) {
        for (let i = 0; i < computersplitletters.length; i++) {
            //if the user guessed one of the letters and the letter isn't used yet, the user gets a correct guess
            if (userguess === computersplitletters[i] && !guessesSoFar.includes(userguess)) {
                guessedRightLetter = true;
                rayitas[i] = userguess;
                correctGuesses++;
            } 
        }
    }
    if(!guessedRightLetter) {
        incorrectGuesses++;
    }
    guessedRightLetter = false;

    //if every letter of the word is guessed, then the user wins a life. rayitas
    if (correctGuesses == rayitas.length) {
        imprimirGuessesLivesLeftLines(); //prints guesses, lives, guesses left, and lines
        lives++;
        //this will hold up the if function until we see the last letter being placed 
        setTimeout(function () {
            alert("You just guessed the word");
            repeticion(); //restarts game
        }, 3000);
        return //stops the function
    }

    //every guessed letter will take a guess left and letters will be pushed into the guesses so far
    guessesLeft--;
    guessesSoFar.push(userguess);
    //if i dont have any guesses left, then game restarts
    if (guessesLeft === -1) {
        alert("You lost all your chances");
        repeticion();
    }
    imprimirGuessesLivesLeftLines();
    if (lives === 5) {
        alert ("You won the entire game! Awesome!");
        repeticion();
    }
}
//this will print everything on the html with a message and counters
function imprimirGuessesLivesLeftLines() {
    //use guesses left y guesses so far igual y no me funciona
    document.getElementById("rayitas").innerText = rayitas.join(" ");
    guessesLeftText.textContent = "Guesses left: " + guessesLeft;
    correctGuessesText.textContent = "Correct guesses: " + correctGuesses;
    livesText.textContent = "Lives: " + lives;
    guessesSoFarText.textContent = "Guesses so far: " + guessesSoFar;
    incorrectGuessesText.textContent = "Incorrect guesses: " + incorrectGuesses;
}
