import { Actor, Color, Vector } from "excalibur"
import { Resources } from "./resources"
import { Coin } from "./coin";

export class SuperCoin extends Coin {

    value = 50;
    
    constructor(pos) {
        super(pos)
    }

    onInitialize() {
        // Get coin sprite and tint it blue
        const sprite = Resources.Coin.toSprite();
        sprite.tint = Color.Blue;
        sprite.scale = new Vector(0.1, 0.1);
        this.graphics.use(sprite);
    }
}