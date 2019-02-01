$(document).ready(() => {
  const buttonColors = ["green", "red", "yellow", "blue"];
  const gamePattern = [];
  const userClickedPattern = [];
  let level = 0;

  // generates random number to choose next color
  const nextColor = () => {
    return Math.floor(Math.random() * 4);
  };

  // plays a sound file based on color input
  const playSound = sound => {
    return new Audio(`./sounds/${sound}.mp3`).play();
  };

  // animates button with add and removing 'pressed' class
  const animatePress = color => {
    $(`#${color}`).addClass("pressed");
    setTimeout(() => {
      $(`#${color}`).removeClass("pressed");
    }, 100);
  };

  // takes the next step in the game
  const nextSequence = () => {
    const randomChosenColor = buttonColors[nextColor()];
    gamePattern.push(randomChosenColor);
    level++;
    $("h1").text(`Level ${level}`);
    userClickedPattern.splice(0, userClickedPattern.length);
    setTimeout(() => {
      console.log(randomChosenColor);
      console.log(gamePattern);
      for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
          $("#" + gamePattern[i])
            .fadeIn(100)
            .fadeOut(100)
            .fadeIn(100);
          playSound(gamePattern[i]);
        }, i * 300);
      }
    }, 400);
  };

  // clear variables and begin a new game with nextSequence()
  const newGame = () => {
    if (level === 0) {
      nextSequence();
    } else {
      level = 0;
      gamePattern.splice(0, gamePattern.length);
      userClickedPattern.splice(0, userClickedPattern.length);
      $("h1").text("Press A Key to Start");
    }
  };

  $(document).on("keydown", () => {
    newGame();
  });

  $(".btn").on("click", e => {
    if (level > 0) {
      const userClickedColor = e.target.id;
      userClickedPattern.push(userClickedColor);
      animatePress(userClickedColor);
      // when i click a button, compare the clicked button to the the gamePattern

      // compare the two arrays and if equal, nextSequence(), else continue to allow clicks to push to userClickedPattern until its length equals
      //gamePattern.length
      const samePattern = (userClickedPattern, gamePattern) => {
        for (var i = 0, l = userClickedPattern.length; i < l; i++) {
          if (userClickedPattern[i] !== gamePattern[i]) {
            return false;
          }
        }
        return true;
      };

      if (
        samePattern(userClickedPattern, gamePattern) &&
        userClickedPattern.length === gamePattern.length
      ) {
        nextSequence();
        // if the userClickedPattern is the same length as gamePattern then guessing is done and can be evaluated
      } else if (!samePattern(userClickedPattern, gamePattern)) {
        console.log(userClickedPattern);
        console.log(gamePattern);
        $(`body`).addClass("game-over");
        $("h1").text("Game Over");
        playSound("wrong");
        setTimeout(() => {
          $(`body`).removeClass("game-over");
          newGame();
        }, 900);
      }
    }
  });
});
