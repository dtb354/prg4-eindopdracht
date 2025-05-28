import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Axis, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Platform } from "./platform.js"
import { Player } from "./player.js"
import { Coin } from "./coin.js"
import { UI } from "./ui.js"

export class Game extends Engine {

    ui;

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0,800)
            }
         })

        // Enable physics with downward gravity
        //this.physics.gravity = new Vector(0, 900);
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        const platforms = [
            new Platform(new Vector(640,650)), 
            new Platform(new Vector(200,600)),
            new Platform(new Vector(1000, 600)),
        ]

        const player = new Player();
        const coin = new Coin();

        // Add all platforms 
        for (const platform of platforms) {
            this.add(platform);
        }

        this.add(player);
        this.add(coin);

        this.ui = new UI(player);
        this.add(this.ui);

    this.currentScene.camera.strategy.lockToActorAxis(player, Axis.X);
    this.currentScene.camera.strategy.lockToActorAxis(player, Axis.Y);
    this.currentScene.camera.zoom = 1.5;
    }
}

new Game()
