import { ImageSource, Sound, Resource, Loader, SpriteSheet } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    SamuraiIdle: new ImageSource('images/IDLE.png'),
    SamuraiRunning: new ImageSource('images/RUN.png'),
    Coin: new ImageSource ('images/coin.png')
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


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader, SamuraiIdleSheet, SamuraiRunningSheet }