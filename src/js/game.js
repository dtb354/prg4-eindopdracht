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
import { FlagGoal } from './flaggoal.js'

export class Game extends Engine {

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
            new Platform(new Vector(640,630)), 
            new Platform(new Vector(200,600)),
            new Platform(new Vector(1000, 600)),
            new Platform(new Vector(1700, 500)),
            new Platform(new Vector(2400, 450))
        ]

        const coins = [
            new Coin(new Vector(800,550)),
            new Coin(new Vector(900,550)),
            new SuperCoin(new Vector(400,550)),
            new Coin(new Vector(1625, 450)),
            new SuperCoin(new Vector(1700, 450)),
            new Coin(new Vector(1775, 450)),
        ]

        const enemies = [
            new Enemy(new Vector(250, 500)),
            new Enemy(new Vector(1000, 500)),
            new Enemy(new Vector(1625, 480)),
        ]

        const obstacles = [
            new Saw(new Vector(1000, 550)),
            new Saw(new Vector(725, 580)),
            new Saw(new Vector(2150, 450)),
        ]

        

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

        const player = new Player();
        this.add(player);
        
        const flagGoal = new FlagGoal(2633, 440);
        this.add(flagGoal);

        const ui = new UI(player);
        this.add(ui);

    this.currentScene.camera.strategy.lockToActorAxis(player, Axis.X);
    this.currentScene.camera.strategy.lockToActorAxis(player, Axis.Y);
    this.currentScene.camera.zoom = 1.5;
    }
}

new Game()
