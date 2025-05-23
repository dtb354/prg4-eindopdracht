import { Actor, Color, Vector, CollisionType } from "excalibur"

export class Platform extends Actor {
    constructor() {
        super({
            width: 800,
            height: 50,
            color: Color.Gray,
            pos: new Vector(640,650)
        })

        this.body.collisionType = CollisionType.Fixed;
    }
}