const canvas = document.querySelector("#EcosystemCanvas");
export default class Creature {
    constructor(foodType) {
        this.foodType = foodType;
        this.lookingForMate = false;
        this.directionVector= [0,0];
        this.energyPerMove = 0;
        this.alive = true;

        this.age = 0;
        this.maturationPeriod = 100;

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.parts = []

        //Max values
        this.energy = 100;
        this.maxEnergy = 100;

        // Customizable max values
        this.maxPerceptionFieldDistance = 200;
        this.maxSpeed = 5;
        this.maxSize = 20;
        this.maxFoodThreshold = 1;
        this.maxDangerThreshold = 1;

        this.color = getRandomColor();

        //Randomize values
        this.perceptionFieldDistance = this.maxPerceptionFieldDistance*Math.random();
        this.speed = this.maxSpeed*Math.random();
        this.size = this.maxSize*Math.random();
        this.foodThreshold = this.maxFoodThreshold*Math.random();
        this.dangerThreshold = this.maxDangerThreshold*Math.random();

        this.calculateEnergyPerMove();

    }

    calculateEnergyPerMove(){
        this.energyPerMove = this.perceptionFieldDistance/this.maxPerceptionFieldDistance*0.2 + this.speed/this.maxSpeed*0.1 + this.size/this.maxSize*0.2;
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

        
        // Oscar klaga inte, det fungerar

        let mutated = new Creature(this.foodType);
        mutated.color = randomObject([this,otherParent]).color

        for ( let i = 0; i < 2; i++) {
            children[i].perceptionFieldDistance = randomObject([this,otherParent,mutated],true).perceptionFieldDistance;
            children[i].speed = randomObject([this,otherParent,mutated],true).speed;
            children[i].size = randomObject([this,otherParent,mutated],true).size;
            children[i].color = randomObject([this,otherParent,mutated],true).color;
            children[i].foodThreshold = randomObject([this,otherParent,mutated],true).foodThreshold;
            children[i].dangerThreshold = randomObject([this,otherParent,mutated],true).dangerThreshold;

            //Add random to displace the child from the parent
            children[i].x = this.x + Math.random();
            children[i].y = this.y + Math.random();

            children[i].energy = 70;
            children[i].calculateEnergyPerMove();
        }

        return children;
    }
}

function randomObject(arr, lastIsMutation=false, mutationChance=0.1){
    if (lastIsMutation) {
        if (Math.random() < mutationChance) {
            return arr[arr.length - 1]
        }
        return arr[Math.floor(Math.random()*(arr.length-1))];
    }

    else {
        return arr[Math.floor(Math.random()*arr.length)];
    }

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
