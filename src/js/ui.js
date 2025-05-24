import { Actor, Color, Label, Vector, Font } from "excalibur"

export class UI extends Actor {

    #playerLabel;
    player;

    constructor(player) {
        super();
        this.player = player;
    }

    onInitialize(engine){
        
        //UI for player score
        this.#playerLabel = new Label({
            text: 'Score 0',
            pos: new Vector(100, 50),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.White
            })
        })

        this.addChild(this.#playerLabel);
    }

    updateScore() {
        this.#playerLabel.text = `Score ${this.player.score}`;
    }
}