const canvas = document.querySelector("#EcosystemCanvas");
export default class Creature {
    constructor(foodType) {
        this.foodType = foodType;

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.parts = []

        //Max values
        this.energy = 25;
        this.maxEnergy = 25;

        // Customizable max values
        this.maxPerceptionFieldDistance = 500;
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

        this.genes = {"perception":this.perceptionFieldDistance, "speed":this.speed, "size":this.size, "color":this.color, "foodThreshold":this.foodThreshold, "dangerThreshold":this.dangerThreshold};


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
        child1 = new Creature(this.foodType);
        child2 = new Creature(this.foodType);

        let crossoverPoint = parseInt(this.genes.length*Math.random());
        child1.genes.splice(0, 0, this.genes.slice(0, crossoverPoint));
        child1.genes.splice(crossoverPoint, otherParent.genes.slice(crossoverPoint));

        child2.genes.splice(0, 0, otherParent.genes.slice(0, crossoverPoint));
        child2.genes.splice(crossoverPoint, this.genes.slice(crossoverPoint));


        return child1, child2;
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
