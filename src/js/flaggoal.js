import { Actor, CollisionType, DegreeOfFreedom, Animation, Vector } from "excalibur";
import { FlagGoalSheet } from "./resources";

export class FlagGoal extends Actor {
    constructor(x, y) {
        super({
            x, y,
            width: 60,
            height: 60,
            anchor: new Vector(0, 1)
        })
    }

    onInitialize() {
        // Enable physics for collision
        this.body.collisionType = CollisionType.Passive;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        // Create animation from spritesheet
        const flag = Animation.fromSpriteSheet(FlagGoalSheet, [0,1,2,3,4], 100);

        // Add animation to flag goal
        this.graphics.add("flag", flag);

        this.graphics.use("flag");
    }
}