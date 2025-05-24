import { Actor, Color, Vector, CollisionType } from "excalibur"

export class Platform extends Actor {
    constructor(pos) {
        super({
            width: 500,
            height: 25,
            color: Color.Gray,
            pos: pos
        })

        this.body.collisionType = CollisionType.Fixed;
    }
}