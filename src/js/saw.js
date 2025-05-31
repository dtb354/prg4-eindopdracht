import { Actor, CollisionType, DegreeOfFreedom, Animation, Vector } from "excalibur";
import { SawObstacleSheet } from "./resources";

export class Saw extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 38,
            height: 38,
        })
    }

    onInitialize() {

        // Enable physics for collision
        this.body.collisionType = CollisionType.Passive;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        // Create animation from spritesheet
        const saw = Animation.fromSpriteSheet(SawObstacleSheet, [0,1,2,3,4,5,6,7], 100);

        // Add animations to saw obstacle
        this.graphics.add("saw", saw);

        this.graphics.use("saw");
    }
}