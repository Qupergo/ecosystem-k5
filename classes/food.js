const canvas = document.querySelector("#EcosystemCanvas");

export default class Food {
    constructor() {
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();
        this.givenEnergy = 20;
        this.size = canvas.width/(this.givenEnergy/5+5);
    }
}
