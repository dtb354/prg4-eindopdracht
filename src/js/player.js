import { Actor, Color, Keys, Vector, CollisionType, Animation } from "excalibur"
import { Resources, SamuraiIdleSheet } from "./resources"
import { Coin } from "./coin"
import { UI } from "./ui"

export class Player extends Actor {

    runSpeed = 300;
    jumpSpeed = -500;
    score = 0;

    constructor() {
        super({
            width: 16,
            height: 32,
            pos: new Vector(600,300),
            
        })
        // Enable physics for collision
        this.body.collisionType = CollisionType.Active
    }

    onInitialize() {
        // Create animations from sprite sheet
        const idle = Animation.fromSpriteSheet(SamuraiIdleSheet, [0,1,2,3,4,5,6,7,8,9],100)

        // Scale up the animation
        //idle.scale = new Vector(2, 2)  // Doubles the size

        // Add animations to player
        this.graphics.add("idle", idle)

        // Set default animation
        this.graphics.use("idle")

        // Collision handler
        this.on("collisionstart", (event) => this.handleCollision(event));
    }

    onPreUpdate(engine) {
        let xspeed = 0

        // Left movement
        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -this.runSpeed
        }

        else if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = this.runSpeed
        }

        else {
            this.graphics.use("idle")
        }

        this.vel.x = xspeed

        // Jump when space is pressed and player is on ground
        if ((engine.input.keyboard.wasPressed(Keys.Space) || engine.input.keyboard.wasPressed(Keys.Up)) && this.vel.y === 0) {
            this.vel.y = this.jumpSpeed
        }
    }

    handleCollision(event) {
        if (event.other.owner instanceof Coin) {
        event.other.owner.hit()
        this.score += 10
        // Find UI instance in the scene and update score
        const ui = this.scene.actors.find(actor => actor instanceof UI)
        if (ui) {
            ui.updateScore()
        }

        //this.scene?.engine.ui.updateScore(this.score, this);
    }
    }
}