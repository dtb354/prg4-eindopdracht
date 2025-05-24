import { Actor, Color, DisplayMode, Engine, Loader, Vector } from "excalibur"
import { Resources } from "./resources"

export class Coin extends Actor {

    constructor(){
        super({ 
            pos: new Vector(800,500),
            width: 8,
            height: 8
        })

        // Sets Image to coin 
        const sprite = Resources.Coin.toSprite()
        this.graphics.use(sprite)
        console.log('Coin Created')
    }

    onInitialize(){
        
        
        
    }
    
    hit() {
        this.kill()
    }

}