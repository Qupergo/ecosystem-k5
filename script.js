<<<<<<< HEAD
const canvas = document.querySelector("#EcosystemCanvas");
let ctx = canvas.getContext("2d");
=======

>>>>>>> 0111da55b753e86a05e1717b46c4c72fa5886919

class World {
    World(mutationChance, foodSpawnFrequency) {

    }
}



class Population {
    Population(herbivoreAmount, carnivoreAmount, boardSize) {
        this.herbivoreAmount = herbivoreAmount;
        this.carnivoreAmount = carnivoreAmount;
        this.boardSize = boardSize;
<<<<<<< HEAD
    }
    
    draw() { 
        ctx.clearRect(0,0,canvas.width,canvas.height);

        //Draw herbivores as spot
        for (let herbivore in this.Herbivores){
            ctx.beginPath();
            ctx.arc(herbivore.fixed,herbivore.y,herbivore.size,0,2*Math.PI);
            ctx.fillStyle = "brown";
            ctx.fill();
        }
    }
}
=======
>>>>>>> 0111da55b753e86a05e1717b46c4c72fa5886919

        this.herbivores = []
        for (let index = 0; index < herbivoreAmount; index++) {
            //Create new herbivore
            herbivore = new Herbivore()

            
        }
    }
}

class Food {
    Food() {
        this.givenEnergy = 12;
    }
}

<<<<<<< HEAD
class Carnivore {
    Carnivore(parts) {
        Creature.call(this, energy, foodType, maxEnergy, currrentEnergy, perceptionFieldDistance, speed, size);
=======
>>>>>>> 0111da55b753e86a05e1717b46c4c72fa5886919

class Carnivore {
    Carnivore(parts) {
        this.x = 0;
        this.y = 0;
        this.foodType = "carnivore";
        this.parts = parts

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
}

class Herbivore {
    Herbivore() {
<<<<<<< HEAD
        Creature.call(this, energy, foodType, maxEnergy, currrentEnergy, perceptionFieldDistance, speed, size);
=======
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
>>>>>>> 0111da55b753e86a05e1717b46c4c72fa5886919
    }
}


<<<<<<< HEAD
function runSimulation(creatures) {

}

=======

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
>>>>>>> 0111da55b753e86a05e1717b46c4c72fa5886919
