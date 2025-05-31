import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Axis, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Platform } from "./platform.js"
import { Player } from "./player.js"
import { Coin } from "./coin.js"
import { UI } from "./ui.js"
import { SuperCoin } from './superCoin.js'
import { Enemy } from './enemy.js'
import { Saw } from './saw.js'

export class Game extends Engine {

    #ui;

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

        const coins = [
            new Coin(new Vector(800,500)),
            new Coin(new Vector(900,500)),
            new SuperCoin(new Vector(400,500)),
        ]

        const enemies = [
            new Enemy(new Vector(250, 500)),
        ]

        const obstacles = [
            new Saw(new Vector(1000, 500)),
        ]

        const player = new Player();

        // Add all platforms 
        for (const platform of platforms) {
            this.add(platform);
        }

        // Add all normal coins
        for (const coin of coins) {
            this.add(coin);
        }
        
        // Add all enemies
        for (const enemy of enemies) {
            this.add(enemy);
        }

        // Add all saws
        for (const obstacle of obstacles) {
            this.add(obstacle);
        }

        this.add(player);

        this.#ui = new UI(player);
        this.add(this.#ui);

    this.currentScene.camera.strategy.lockToActorAxis(player, Axis.X);
    this.currentScene.camera.strategy.lockToActorAxis(player, Axis.Y);
    this.currentScene.camera.zoom = 1.5;
    }
}

new Game()
