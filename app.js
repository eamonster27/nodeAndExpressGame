const express = require("express");
const app = express();
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const fs = require("fs");
const expressValidator = require("express-validator");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

var randomWord;
var remainingGuesses;
var hiddenWord;
var guessedLetters;
var lose = false;
var win = false;
var gameEnd = false;

console.log(words);

app.engine('mustache', mustache());

app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.listen(3000, function(){
  console.log("SERVER RUNNING ON: http://0.0.0.0:3000")
})

initializeGame(words);

app.get('/reset', function(req, res){
  initializeGame(words);
  return res.redirect('/');
})

app.get('/', function(req, res){
  if(win === true){
    gameStatus = "Win";
    res.render("index", {
      randomWord: randomWord,
      remainingGuesses: remainingGuesses,
      hiddenWord: hiddenWord,
      guessedLetters: guessedLetters,
      gameStatus: gameStatus,
      gameEnd: true
    });
  }
  else if(lose === true){
    gameStatus = "Lose";
    res.render("index", {
      randomWord: randomWord,
      remainingGuesses: remainingGuesses,
      hiddenWord: hiddenWord,
      guessedLetters: guessedLetters,
      gameStatus: gameStatus,
      gameEnd: true
    });
  }
  else{
    res.render("index", {
      randomWord: randomWord,
      remainingGuesses: remainingGuesses,
      hiddenWord: hiddenWord,
      guessedLetters: guessedLetters,
      gameEnd: false
    });

  }
})

app.post('/guess', function (req, res){
  const guess = req.body.guess;

  req.checkBody("guess", "Enter character.").notEmpty();
  req.checkBody("guess", "Letter only.").isAlpha();

  var errors = req.validationErrors();

  if(errors){
    res.render("index", {
      randomWord: randomWord,
      remainingGuesses: remainingGuesses,
      hiddenWord: hiddenWord,
      guessedLetters: guessedLetters,
      gameEnd: false,
      errors: errors
    });
  }
  else {
    if(guessedLetters.length === 0){
      guessedLetters.push(guess);
    }
    else{
      var alreadyGuessed = false;
      //Checking guessed letters
      for(let i = 0; i < guessedLetters.length; ++i){
        if(guessedLetters[i] === guess){
          alreadyGuessed = true;
          // Character already guessed. Do something.
          console.log("Already Guessed!");
        }
      }
      if(!alreadyGuessed){
        guessedLetters.push(guess);
      }
    }

    // Compare guess to randomWord
    var correctGuess = false;
    for(let i = 0; i < randomWord.length; ++i){
      if(randomWord[i] === guess){
        console.log("Correct Guess!");
        // Correct guess
        correctGuess = true;
        // Manipulate hiddenWord
        hiddenWord[i] = guess;
      }
    }
    if(!correctGuess){
      --remainingGuesses;
    }

    //Check if user won
    var blankFound = false;
    for(let j = 0; j < hiddenWord.length; ++j){
      if(hiddenWord[j] === "__"){
        blankFound = true;
      }
    }
    if(blankFound){
      //Continue game
      if(remainingGuesses === 0){
        //You lose
        lose = true;
        return res.redirect('/');
      }
      else{
        return res.redirect('/');
      }
    }
    else {
      // You win
      win = true;
      return res.redirect('/');
    }
  }
})

function initializeGame(words){
  randomWord = words[Math.floor(Math.random() * (words.length - 1))];
  console.log(randomWord); //Testing ----------
  lose = false;
  win = false;
  remainingGuesses = 8;
  hiddenWord = [];
  guessedLetters = [];
  for(let i = 0; i < randomWord.length; ++i){
    hiddenWord.push("__");
  }

};
