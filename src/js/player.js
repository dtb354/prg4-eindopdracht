import { Actor, Color, Keys, Vector, CollisionType } from "excalibur"

export class Player extends Actor {
    runSpeed = 300
    jumpSpeed = -400

    constructor() {
        super({
            width: 40,
            height: 40,
            color: Color.Red,
            pos: new Vector(600,300)
        })
        // Enable physics for collision
        this.body.collisionType = CollisionType.Active
    }

    onPreUpdate(engine) {
        let xspeed = 0

        // Left movement
        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -this.runSpeed
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = this.runSpeed
        }

        this.vel.x = xspeed

        // Jump when space is pressed and player is on ground
        if ((engine.input.keyboard.wasPressed(Keys.Space) || engine.input.keyboard.wasPressed(Keys.Up)) && this.vel.y === 0) {
            this.vel.y = this.jumpSpeed
        }
    }
}