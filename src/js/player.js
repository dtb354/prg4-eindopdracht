import { Actor, Color, Keys, Vector, CollisionType, Animation, DegreeOfFreedom, Shape } from "excalibur"
import { Resources, SamuraiIdleSheet, SamuraiRunningSheet } from "./resources"
import { Coin } from "./coin"
import { UI } from "./ui"

export class Player extends Actor {

    runSpeed = 300;
    jumpPower = -500;
    score = 0;
    lives = 5;

    constructor() {
        super({
            width: 16,
            height: 32,
            pos: new Vector(600,300),
        })
    }

    onInitialize() {

        // Enable physics for collision
        this.body.collisionType = CollisionType.Active

        this.body.useGravity = true;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        //hitbox setup
        const hitbox = Shape.Box(16, 32, Vector.Half, new Vector(0, 15));
        this.collider.set(hitbox);

        // Create animations from sprite sheet
        const idle = Animation.fromSpriteSheet(SamuraiIdleSheet, [0,1,2,3,4,5,6,7,8,9],100);
        const run = Animation.fromSpriteSheet(SamuraiRunningSheet, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],100);

        // Scale up the animation
        //idle.scale = new Vector(2, 2)  // Doubles the size

        // Add animations to player
        this.graphics.add("idle", idle);
        this.graphics.add("run", run);

        // Set default animation
        this.graphics.use("idle")

        // Collision handler
        this.on("collisionstart", (event) => this.handleCollision(event));
    }

    onPreUpdate(engine, delta) {
        this.run(engine);
        this.jump(engine, delta);
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

    run(engine) {
        let xspeed = 0

        // Left movement
        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -this.runSpeed
            this.graphics.use("run")
            this.graphics.flipHorizontal = true
        }

        // Right movement
        else if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = this.runSpeed
            this.graphics.use("run")
            this.graphics.flipHorizontal = false
        }

        //Idle animation set standard
        else {
            this.graphics.use("idle")
        }

        this.vel.x = xspeed
    }

    jump(engine, delta) {
        // Jump when space is pressed and player is on ground
        if ((engine.input.keyboard.wasPressed(Keys.Space) || engine.input.keyboard.wasPressed(Keys.Up)) && this.vel.y === 0) {
            this.vel.y = this.jumpPower
            //this.body.applyLinearImpulse(new Vector(0, -250 * delta));
        }   
    }
}