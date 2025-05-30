import { Actor, Color, Vector } from "excalibur"
import { Resources } from "./resources"
import { Coin } from "./coin";

export class SuperCoin extends Coin {
    constructor(pos) {
        super(pos)
        // Set score value higher than regular coin
        this.value = 50;
    }

    onInitialize() {
        // Call parent initialization
        super.onInitialize();
        
        // Get coin sprite and tint it blue
        const sprite = Resources.Coin.toSprite();
        sprite.tint = Color.Blue;
        sprite.scale = new Vector(0.1, 0.1);
        this.graphics.use(sprite);
    }
}