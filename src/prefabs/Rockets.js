// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene , x , y , texture , frame, player, controlability) {
        super(scene , x , y , texture , frame);
        scene.add.existing(this);
        // when making prefabs we have to put it in the game ourselves
        // add an object to existing scene
        this.isFiring = false;  // track rocet's firing status
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.player = player;
        this.controlability = controlability;
    }

    update() {
        if((!this.isFiring || rocketControl == true) && this.player == 1) {
            if(keyA.isDown && this.x >= 47) {
                this.x -= 2;
                // console.log(this.player);
            } else if (keyD.isDown && this.x <= 578) {
                this.x += 2;
                // console.log(this.player);
            }
            // console.log(this.isFiring);
            // console.log(this.player);
            // console.log(this.y);
        }

        // player 2 movement
        if((!this.isFiring || rocketControl == true) && this.player == 2) {
            if(keyLEFT.isDown && this.x >= 47) {
                this.x -= 2;
                // console.log(this.player);
            } else if (keyRIGHT.isDown && this.x <= 578) {
                this.x += 2;
                // console.log(this.player);
            }
            // console.log(this.isFiring);
            // console.log(this.player);
            // console.log(this.y);
        }
        // left/right movement
        // isDown checks every frame

        if(Phaser.Input.Keyboard.JustDown(keyJ) && this.player == 1) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
            // console.log(`AAAAH I'M IN HERE BITCH1`);
            // console.log(this.player);
            // console.log(this.isFiring);
        }

        // player 2 rocket
        if(keyUP.isDown && this.player == 2) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
            // console.log(`AAAAH I'M IN HERE BITCH2`);
            // console.log(this.player);
            // console.log(this.isFiring);
        }
        // fire rocket
        // JustDown checks every frame

        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
        }
        // if fired, move up

        if(this.y <= 108) {
            this.isFiring = false;
            this.y = 431;
        }
        // reset on miss
    }

    // reset rocket on miss
    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}