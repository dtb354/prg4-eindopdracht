import { Actor, Color, DisplayMode, Engine, Loader, Vector, CollisionType, Shape } from "excalibur"
import { Resources } from "./resources"

export class Coin extends Actor {

    value = 10;

    constructor(pos){
        // Get original image dimensions and scale them
        const scale = 0.1;
        const width = Resources.Coin.width * scale;
        const height = Resources.Coin.height * scale;
        const radius = width / 2; // radius is half the width

        super({ 
            pos: pos,
            width: width,
            height: height,
            collider: Shape.Circle(radius)
        });

        // Sets Image to coin 
        const sprite = Resources.Coin.toSprite();
        sprite.scale = new Vector(0.1, 0.1);
        this.graphics.use(sprite);

    }

    onInitialize(){
    }
    
    hit() {
        this.kill();
    }

}