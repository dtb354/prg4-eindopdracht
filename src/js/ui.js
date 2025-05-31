import { Actor, Color, Label, Vector, Font, ScreenElement } from "excalibur"

export class UI extends ScreenElement {

    #scoreLabel;
    #livesLabel;
    #endingMessage;
    #highScoreLabel;
    player;

    constructor(player) {
        super();
        this.player = player;
    }

    onInitialize(engine){
        
        //UI for player score
        this.#scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(100, 50),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.White
            })
        })

        //UI for player lives
        this.#livesLabel = new Label({
            text: 'Lives: 3',
            pos: new Vector(100,80),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.White
            })
        })

        //UI for high score 
        this.#highScoreLabel = new Label({
            text: `High Score: ${localStorage.getItem('highScore') || 0}`,
            pos: new Vector(100, 110),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow
            })
        })

        this.addChild(this.#highScoreLabel);
        this.addChild(this.#scoreLabel);
        this.addChild(this.#livesLabel);
    }

    updateScore() {
        this.#scoreLabel.text = `Score: ${this.player.score}`;
    }

    updateLives() {
        this.#livesLabel.text = `Lives: ${this.player.lives}`;
    }

    deathMessage() {
        this.#endingMessage = new Label ({
            text: 'GAME OVER :(',
            pos: new Vector(640,100),
            font: new Font({
                size: 32,
                family: 'Open Sans',
                color: Color.Red
            })
        })

        this.addChild(this.#endingMessage);
    }

    victoryMessage() {
        this.#endingMessage = new Label ({
            text: 'VICTORY :D',
            pos: new Vector(640,100),
            font: new Font({
                size: 32,
                family: 'Open Sans',
                color: Color.Red
            })
        })

        this.addChild(this.#endingMessage);
    }

    showHighScore() {
        const currentHighScore = localStorage.getItem('highScore') || 0;
        this.#highScoreLabel.text = `High Score: ${currentHighScore}`;
    }
}