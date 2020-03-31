const canvas = document.querySelector("#EcosystemCanvas");
export default class Creature {
    constructor(foodType) {
        this.foodType = foodType;
        this.lookingForMate = false;
        this.directionVector= [0,0];

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.parts = []

        //Max values
        this.energy = 10;
        this.maxEnergy = 100;

        // Customizable max values
        this.maxPerceptionFieldDistance = 200;
        this.maxSpeed = 10;
        this.maxSize = 2;
        this.maxFoodThreshold = 1;
        this.maxDangerThreshold = 1;

        this.color = getRandomColor();

        //Randomize values
        this.perceptionFieldDistance = this.maxPerceptionFieldDistance*Math.random();
        this.speed = this.maxSpeed*Math.random();
        this.size = this.maxSize*Math.random();
        this.foodThreshold = this.maxFoodThreshold*Math.random();
        this.dangerThreshold = this.maxDangerThreshold*Math.random();


    }

    move(directionVector, speed=1) {
        if (this.foodType == "carnivore") {
            //Insert a copy of the head at the end of the Array
            this.parts.splice(this.parts.length, 0, [this.x, this.y]);

            //Remove end of tail (Start of Array)
            this.parts.shift();
        }
        this.x += directionVector[0] * speed;
        this.y += directionVector[1] * speed;
    }

    crossover(otherParent) {
        let children = [new Creature(this.foodType), new Creature(this.foodType)];
        for ( let i = 0; i < 2; i++) {
            children[i].perceptionFieldDistance = randomObject(this,otherParent).perceptionFieldDistance;
            children[i].speed = randomObject(this,otherParent).speed;
            children[i].size = randomObject(this,otherParent).size;
            children[i].color = randomObject(this,otherParent).color;
            children[i].foodThreshold = randomObject(this,otherParent).foodThreshold;
            children[i].dangerThreshold = randomObject(this,otherParent).dangerThreshold;
            children[i].x = this.x+Math.random();
            children[i].y = this.y+Math.random();
        }
        return children;
    }

    

}

function randomObject(a,b){
    if (Math.random() <= 0.5){
        return a;
    }
    else return b;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
