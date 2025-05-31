import { ImageSource, Sound, Resource, Loader, SpriteSheet } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    SamuraiIdle: new ImageSource('images/IDLE.png'),
    SamuraiRunning: new ImageSource('images/RUN.png'),
    Coin: new ImageSource ('images/coin.png'),
    FrogEnemy: new ImageSource ('images/frogRun(32).png'),
    SawObstacle: new ImageSource ('images/saw(38).png'),
}

// Create a sprite sheet after the image loads 

const SamuraiIdleSheet = SpriteSheet.fromImageSource({
    image: Resources.SamuraiIdle,
    grid: {
        rows: 1,
        columns: 10,
        spriteHeight: 96,
        spriteWidth: 96
    }
})

const SamuraiRunningSheet = SpriteSheet.fromImageSource({
    image: Resources.SamuraiRunning,
    grid: {
        rows: 1,
        columns: 16,
        spriteHeight: 96,
        spriteWidth: 96
    }
})

const FrogRunningSheet = SpriteSheet.fromImageSource({
    image: Resources.FrogEnemy,
    grid: {
        rows: 1,
        columns: 12,
        spriteWidth: 32,
        spriteHeight: 32
    }
})

const SawObstacleSheet = SpriteSheet.fromImageSource({
    image: Resources.SawObstacle,
    grid: {
        rows: 1,
        columns: 8,
        spriteHeight: 38,
        spriteWidth: 38
    }
})


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader, SamuraiIdleSheet, SamuraiRunningSheet, FrogRunningSheet, SawObstacleSheet }