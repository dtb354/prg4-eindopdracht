import { Actor, Color, Label, Vector, Font, ScreenElement } from "excalibur"

export class UI extends ScreenElement {

    #scoreLabel;
    #livesLabel;
    player;

    constructor(player) {
        super();
        this.player = player;
    }

    onInitialize(engine){
        
        //UI for player score
        this.#scoreLabel = new Label({
            text: 'Score 0',
            pos: new Vector(100, 50),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.White
            })
        })

        //UI for player lives
        this.#livesLabel = new Label({
            text: 'Lives 5',
            pos: new Vector(100,80),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.White
            })
        })

        this.addChild(this.#scoreLabel);
        this.addChild(this.#livesLabel)
    }

    updateScore() {
        this.#scoreLabel.text = `Score ${this.player.score}`;
    }

    updateLives() {
        this.#livesLabel.text = `Lives ${this.player.lives}`
    }
}