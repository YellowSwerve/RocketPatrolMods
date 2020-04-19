class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load images/tile sprite
        this.load.spritesheet('explosion' , './assets/explosion.png' ,
        {frameWidth: 64 , frameHeight: 32 , startFrame: 0 , endFrame: 9});
        // load spritesheet
    }

    create() {
        //console.log(this);
        //this.add.text(20, 20, "Rocket Patrol Play");
        // these lines were just for testing
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        this.starfieldMed = this.add.tileSprite(0 , 160 , 640 , 480 , 'starfield').setScale(1 , .43).setOrigin(0,0);
        this.starfieldSmall = this.add.tileSprite(0 , 110 , 640 , 480 , 'starfield').setScale(1 , .25).setOrigin(0,0);

        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);

        // white rectangle border

        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);
        // green UI background

        this.p1Rocket = new Rocket(this , game.config.width / 3, 431 ,
            'rocket' , 0 , 1 , rocketControl).setScale(.5 , .5).setOrigin(0 , 0);
        // constructor(scene , x , y , texture);
        // add rocket (p1)

        if(game.settings.mode == 1) {
            this.p2Rocket = new Rocket(this , game.config.width / 1.5 , 431 ,
                'rocket' , 0 , 2 , rocketControl). setScale(.5 , .5).setOrigin(0,0);
        }
        // constructor(scene , x , y , texture);
        // add rocket (p2)


        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship' , 0 , 30).setOrigin(0 , 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship' , 0 , 20).setOrigin(0 , 0);
        this.ship03 = new Spaceship(this, game.config.width + 10, 260, 'spaceship' , 0 , 10).setOrigin(0 , 0);
        //add spaceship x3

        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // define keyboard keys

        //animation config
        this.anims.create({
            key: 'explode' ,
            frames: this.anims.generateFrameNumbers('explosion' , {
                start: 0 , end: 9 , first: 0
            }),
            frameRate: 30
        });

        // score
        this.p1Score = 0;

        // score 2
        this.p2Score = 0;

        // highScore is in main.js because it persists
        highScore = highScore;

        // timer here since it resets each scene should either be 45 or 60
        this.timeLeft = game.settings.gameTimer / 1000;
        scoreConfig.fixedWidth = 100;
        
        // sets up how to draw scoreLeft
        this.scoreLeft = this.add.text(69 , 54 , this.p1Score , scoreConfig);

        // sets up how to draw highScore in the scoreCenter
        this.scoreCenter = this.add.text(game.config.width / 2 , 54 , highScore , scoreConfig).setOrigin(.5);

        // set up how to draw rightScore
        this.scoreRight = this.add.text(476 , 54 , this.p2Score , scoreConfig);

        // set up how to draw timer
        this.timerCenter = this.add.text(game.config.width / 2 , 88 , this.timeLeft , scoreConfig).setOrigin(.5);

        // game over flag
        this.gameOver = false;

        // 30-second speed boost
        // AND IT WORKS LOL
        this.clock = this.time.delayedCall(30000 , () => {
            this.game.settings.spaceshipSpeed *= 2;
        }, null , this);

        // 60-second play clock
        // uses a delayed call which is pretty hard coded instead of using a timer that can be interacted with
        scoreConfig.fixedWidth = 0;
        // this.clock = this.time.delayedCall(game.settings.gameTimer , () => {
        // if(this.timeLeft == 0) {
        //     this.add.text(game.config.width / 2 , game.config.height / 2 , 'GAME OVER' , scoreConfig).setOrigin(.5);
        //     this.add.text(game.config.width / 2 , game.config.height / 2 + 64 , '(J)ire to Restart or A for Menu' , scoreConfig).setOrigin(.5);
        //     this.gameOver = true;
        // }
        // }, null , this);

        // this is where the timer works it works now
        // addEvent(how often it should be called, callback: the function to call, callbackScope: this, loop: if it should keep happening);
        let countDown = this.time.addEvent({ delay: 1000, callback: decrementTimer, callbackScope: this, loop: true });
    }

    update() {
        if(this.timeLeft <= 0) {
            this.add.text(game.config.width / 2 , game.config.height / 2 , 'GAME OVER' , scoreConfig).setOrigin(.5);
            this.add.text(game.config.width / 2 , game.config.height / 2 + 64 , '(J)ire to Restart or A for Menu' , scoreConfig).setOrigin(.5);
            this.gameOver = true;
        }

        // only update high score if it's less than current score
        if(this.p1Score > highScore) {
            highScore = this.p1Score;
            this.scoreCenter.text = highScore;
        }

        if(this.p2Score > highScore) {
            highScore = this.p2Score;
            this.scoreCenter.text = highScore;
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyJ)) {
            this.game.settings.spaceshipSpeed /= 2;
            this.scene.restart(this.p1Score);
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyA)) {
            this.scene.start("menuScene");
        }

        // scroll starfield
        this.starfield.tilePositionX -= 4;
        this.starfieldMed.tilePositionX -= 2;
        this.starfieldSmall.tilePositionX -= 1;
        // this.starfield.tilePositionY -= 4;

        // this.p1Rocket.update();
        // // update rocket
        // this.ship01.update();
        // this.ship02.update();
        // this.ship03.update();
        // // update spaceship

        if(!this.gameOver) {
            this.p1Rocket.update();  // update rocket (x2)
            if(game.settings.mode == 1) {
                this.p2Rocket.update();
            }
            this.ship01.update();  // update ship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        if(this.checkCollision(this.p1Rocket , this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03 , this.p1Rocket);
            // this.ship03.reset();
        }
        if(this.checkCollision(this.p1Rocket , this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02 , this.p1Rocket);
            // this.ship02.reset();
        }
        if(this.checkCollision(this.p1Rocket , this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01 , this.p1Rocket);
            // this.ship01.reset();
        }
        // check collisions
        
        // player 2 collision checking
        if(game.settings.mode == 1) {
            if(this.checkCollision(this.p2Rocket , this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03 , this.p2Rocket);
                // this.ship03.reset();
            }
            if(this.checkCollision(this.p2Rocket , this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02 , this.p2Rocket);
                // this.ship02.reset();
            }
            if(this.checkCollision(this.p2Rocket , this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01 , this.p2Rocket);
                // this.ship01.reset();
            }
            // check collisions
        }
    }

    checkCollision(rocket , ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
        // simple AABB checking
    }

    shipExplode(ship , rocket) {
        ship.alpha = 0;  // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x , ship.y , 'explosion').setOrigin(0,0);
        boom.anims.play('explode');  // play explode animation
        boom.on('animationcomplete' , () => {  // callback after animation completes
            ship.reset();  // reset ship position
            ship.alpha = 1;  // make ship visible again
            boom.destroy();  // remove explosion sprite
        });
        // score increment and repaint
        // will need to mess with this code to get 2 seperate scores
        if(rocket.player == 1) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
            this.timeLeft += ship.points / 10;
            this.sound.play('sfx_explosion');
        }
        if(game.settings.mode == 1 && rocket.player == 2) {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
            this.timeLeft += ship.points / 10;
            this.sound.play('sfx_explosion');
        }
    }
}

function decrementTimer() {
    if(this.timeLeft > 0) {
        --this.timeLeft;
        this.timerCenter.text = this.timeLeft;
    }
}