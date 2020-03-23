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
        this.maxPerceptionFieldDistance = 50;
        this.maxSpeed = 10;
        this.maxSize = 2;
        this.color = getRandomColor();

        //Randomize values
        this.perceptionFieldDistance = this.maxPerceptionFieldDistance*Math.random();
        this.speed = this.maxSpeed*Math.random();
        this.size = this.maxSize*Math.random();

        this.genes = {"perception":this.perceptionFieldDistance, "speed":this.speed, "size":this.size, "color":this.color}
    }

    move(directionVector) {
        if (this.foodType == "carnviore") {
            //Insert a copy of the head at position 1
            parts.splice(1, 0, [parts[0][0], parts[0][1]])

            //Move head forward
            parts[0][0] += directionVector[0];
            parts[0][1] += directionVector[1];

            //Remove end of tail
            parts.pop();
        }

        else if (this.foodType == "herbivore") {
            x += directionVector[0];
            y += directionVector[1];
        }
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
