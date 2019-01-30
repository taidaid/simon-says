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
  const playSound = color => {
    return new Audio(`./sounds/${color}.mp3`).play();
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
      playSound(randomChosenColor);
      animatePress(randomChosenColor);
    }, 400);
  };

  // clear variables and begin a new game with nextSequence()
  const newGame = () => {
    if (level === 0) {
      nextSequence();
    } else if (confirm("New game?")) {
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
      console.log(userClickedPattern);
      console.log(gamePattern);
      // compare the two arrays and if equal, nextSequence(), else continue to allow clicks to push to userClickedPattern until its length equals
      //gamePattern.length
      const samePattern = (userClickedPattern, gamePattern) => {
        userClickedPattern.forEach(v1 => {
          gamePattern.forEach(v2 => {
            v1 === v2;
          });
        });
      };
      console.log(samePattern);
      if (samePattern) {
        nextSequence();
      } else if (userClickedPattern.length === gamePattern.length) {
        alert("womp womp");
        newGame();
      }
    }
  });
});
