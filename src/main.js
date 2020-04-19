// Ricky Chavez
// Track a high score that persists across scenes and display it in the UI (10)
// Implement the speed increase that happens after 30 seconds in the original game (10)
// Allow the player to control the Rocket after it's fired (10)
// Display the time remaining (in seconds) on the screen (15)
// Implement parallax scrolling (15)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (25)
// Implement a simultaneous two-player mode (50)

// "use strict";

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
    // loads the menu and then play
};

let scoreConfig = {
    fontFamily: 'Courier' ,
    fontSize: '28px' ,
    backgroundColor: '#F3B141' ,
    color: '#843605' ,
    align: 'right' ,
    padding: {
        top: 5 ,
        botom: 5 ,
    },
    fixedWidth: 100
}

let game = new Phaser.Game(config);
// loads the config above into phaser itself

let keyLEFT, keyRIGHT, keyA , keyD, keyJ , keyUP;
//reserve some keyboard variables

let highScore = 0;

let rocketControl = false;

// default game settings if they are not set
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
    mode: 0
}