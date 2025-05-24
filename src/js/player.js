import { Actor, Color, Keys, Vector, CollisionType, Animation } from "excalibur"
import { Resources, SamuraiIdleSheet } from "./resources"

export class Player extends Actor {
    runSpeed = 300
    jumpSpeed = -400

    constructor() {
        super({
            width: 96,
            height: 96,
            pos: new Vector(600,300),
            
        })
        // Enable physics for collision
        this.body.collisionType = CollisionType.Active
    }

    onInitialize() {
        // Create animations from sprite sheet
        const idle = Animation.fromSpriteSheet(SamuraiIdleSheet, [0,1,2,3,4,5,6,7,8,9],100)

        // Add animations to player
        this.graphics.add("idle", idle)

        // Set default animation
        this.graphics.use("idle")
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
}