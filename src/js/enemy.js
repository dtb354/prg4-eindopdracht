import { Actor, CollisionType, DegreeOfFreedom, Animation, Vector } from "excalibur";
import { FrogRunningSheet } from "./resources";

export class Enemy extends Actor {

    #moveSpeed = 100;
    #moveDistance = 150;
    #startPosX = 0;
    #movingRight = true;
    
    constructor(pos){
        super({
            pos: pos,
            width: 32,
            height: 32,
        })

        this.value = 10
    }

    onInitialize(){

        // Enable physics for collision
        this.body.collisionType = CollisionType.Active;
        this.body.useGravity = true;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        // Create animation from spritesheet
        const run = Animation.fromSpriteSheet(FrogRunningSheet, [0,1,2,3,4,5,6,7,8,9,10,11], 100);

        // Add animations to enemy frog
        this.graphics.add("run", run);

        this.graphics.use("run");
    }

    onPreUpdate() {
        this.#patrol();
    }

    #patrol() {
        // Move right until reaching max distance
        if (this.#movingRight) {
            this.vel.x = this.#moveSpeed
            this.graphics.flipHorizontal = false
            if (this.pos.x > this.#startPosX + this.#moveDistance) {
                this.#movingRight = false
            }
        } 
        // Move left until reaching start position
        else {
            this.vel.x = -this.#moveSpeed
            this.graphics.flipHorizontal = true
            if (this.pos.x < this.#startPosX) {
                this.#movingRight = true
            }
        }
    }
}