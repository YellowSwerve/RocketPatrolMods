// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene , x , y , texture , frame, pointValue) {
        super(scene , x , y , texture , frame);
        scene.add.existing(this); // add to xisiting, displayList, updateList
        this.points = pointValue;
    }

    update() {
        this.x -= game.settings.spaceshipSpeed;
        // move spaceship left
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
        // loop ships movement
    }

    reset() {
        this.x = game.config.width;
    }
}