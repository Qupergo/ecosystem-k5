
export class Carnivore {
    constructor(parts) {
        this.x = 0;
        this.y = 0;
        this.foodType = "carnivore";
        this.parts = parts

        //Max values
        this.energy = 25;
        this.maxEnergy = 25;

        // Customizable max values
        this.perceptionFieldDistance = 10;
        this.speed = 10;
        this.size = 2;
        this.color = getRandomColor();

        //Randomize values
        this.perceptionFieldDistance *= Math.random();
        this.speed *= Math.random();
        this.size *= Math.random();

        this.genes = {"perception":this.perceptionFieldDistance, "speed":this.speed, "size":this.size, "color":this.color}

    }

    move(directionVector) {
        //Insert a copy of the head at position 1
        parts.splice(1, 0, [parts[0][0], parts[0][1]])

        //Move head forward
        parts[0][0] += directionVector[0];
        parts[0][1] += directionVector[1];

        //Remove end of tail
        parts.pop()
    }

    crossover(otherParent) {
        child1 = new Carnivore();
        child2 = new Carnivore();

        let crossoverPoint = parseInt(this.genes.length*Math.random());
        child1.genes.splice(0, 0, this.genes.slice(0, crossoverPoint));
        child1.genes.splice(crossoverPoint, otherParent.genes.slice(crossoverPoint));

        child2.genes.splice(0, 0, otherParent.genes.slice(0, crossoverPoint));
        child2.genes.splice(crossoverPoint, this.genes.slice(crossoverPoint));


        return child1, child2;
    }
}

export class Herbivore {
    constructor() {

        this.x = 0;
        this.y = 0;
        this.foodType = "herbivore";

        //Max values
        this.energy = 25;
        this.maxEnergy = 25;

        // Customizable values
        this.perceptionFieldDistance = 10;
        this.speed = 10;
        this.size = 2;
        this.offspringPerBirth = 5;
        this.color = getRandomColor();

        //Randomize values
        this.perceptionFieldDistance *= Math.random();
        this.speed *= Math.random();
        this.size *= Math.random();
        this.offspringPerBirth *= Math.random();

        this.genes = [this.perceptionFieldDistance, this.speed, this.size, this.offspringPerBirth, this.color]


    }

    move(directionVector) {
        x += directionVector[0];
        y += directionVector[1];
    }
    
    crossover(otherParent) {
        child1 = new Herbivore();
        child2 = new Herbivore();

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
