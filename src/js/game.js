import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Platform } from "./platform.js"
import { Player } from "./player.js"
import { Coin } from "./coin.js"

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })

        // Enable physics with downward gravity
        this.physics.gravity = new Vector(0, 900) 
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        const platform = new Platform()
        const player = new Player()
        const coin = new Coin()

        this.add(platform)
        this.add(player)
        this.add(coin)
    }
}

new Game()
