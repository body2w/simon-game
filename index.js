var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function () {
  var userChoosenColor = this.getAttribute("id");
  userClickedPattern.push(userChoosenColor);
  new Audio("./sounds/" + userChoosenColor + ".mp3").play();
  $("#" + userChoosenColor)
    .fadeOut(100)
    .fadeIn(100);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(document).click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    document.querySelector("body").setAttribute("class", "game-over");
    new Audio("./sounds/wrong.mp3").play();
    setTimeout(function () {
      document.querySelector("body").removeAttribute("class", "game-over");
    }, 500);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function nextSequence() {
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("." + randomChoosenColor)
    .fadeOut(100)
    .fadeIn(100);
  var buttonsAudio = new Audio("./sounds/" + randomChoosenColor + ".mp3");
  buttonsAudio.play();
  $("h1").text("level " + level);
}
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}
