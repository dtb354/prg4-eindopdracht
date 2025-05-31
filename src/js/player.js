import { Actor, Color, Keys, Vector, CollisionType, Animation, DegreeOfFreedom, Shape } from "excalibur"
import { Resources, SamuraiIdleSheet, SamuraiRunningSheet } from "./resources"
import { Coin } from "./coin"
import { UI } from "./ui"
import { Enemy } from "./enemy";
import { Saw } from "./saw";
import { FlagGoal } from "./flaggoal";

export class Player extends Actor {

    runSpeed = 300;
    jumpPower = -500;
    score = 0;
    lives = 3;

    constructor() {
        super({
            width: 16,
            height: 32,
            pos: new Vector(600,300),
            anchor: new Vector(0.5, 0.75),
        })
    }

    onInitialize() {

        // Enable physics for collision
        this.body.collisionType = CollisionType.Active

        this.body.useGravity = true;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        //hitbox setup
        const hitbox = Shape.Box(16, 32, Vector.Half, new Vector(0, -8));
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
        this.boundaryHandler();
        this.deathHandler();
    }

    handleCollision(event) {
        if (event.other.owner instanceof Coin) {
        event.other.owner.hit()

        // Add coin's value to score
        this.score += event.other.owner.value
        //this.scene?.engine.ui.updateScore(this.score, this);
        }

        // Contact with an enemy
        if (event.other.owner instanceof Enemy) {

            // Check if player is on top of enemy
            if (this.pos.y < event.other.owner.pos.y) {
                event.other.owner.kill();
                this.score += event.other.owner.value
            } else  {
                this.lives--;
            }
        }

        // Contact with Saw
        if (event.other.owner instanceof Saw) {
            this.lives--;
        }


        // Contact with flag goal
        if (event.other.owner instanceof FlagGoal) {
            this.victoryHandler();
        }
        
        const ui = this.scene.actors.find(actor => actor instanceof UI)
        if (ui) {
            ui.updateScore();
            ui.updateLives();
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

    boundaryHandler() {
        if (this.pos.y > 700){
            this.lives--;
            this.pos = new Vector(600,300);

            const ui = this.scene.actors.find(actor => actor instanceof UI);
            if (ui) {
                ui.updateLives();
            }
        }
    }

    deathHandler() {
        if (this.lives <= 0){
            this.kill()
            const ui = this.scene.actors.find(actor => actor instanceof UI);
            if (ui) {
                ui.updateLives();
                ui.deathMessage();
            }
        }
    }

    victoryHandler() {
        const ui = this.scene.actors.find(actor => actor instanceof UI);

        if (ui) {
            ui.victoryMessage();
            this.saveHighScore();
            ui.showHighScore();
        }

        

        this.kill()
    }

    saveHighScore() {
        // Get current high score from localStorage
        const currentHighScore = localStorage.getItem('highScore') || 0;
        
        // Update if current score is higher
        if (this.score > currentHighScore) {
            localStorage.setItem('highScore', this.score);
        }
    }
}
