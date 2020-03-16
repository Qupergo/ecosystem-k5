const canvas = document.querySelector("#EcosystemCanvas");
let ctx = canvas.getContext("2d");


class World {
    constructor(mutationChance, foodSpawnFrequency, boardSize) {
        this.mutationChance = mutationChance;
        this.foodSpawnFrequency = foodSpawnFrequency;
        this.boardSize = boardSize;
    }   
}



class Population {
    constructor(herbivoreAmount, carnivoreAmount) {
        this.herbivoreAmount = herbivoreAmount;
        this.carnivoreAmount = carnivoreAmount;
        this.boardSize = boardSize;

        //Create herbivores
        this.herbivores = [];
        for (let index = 0; index < herbivoreAmount; index++) {
            //Create new herbivore
            herbivore = new Herbivore();
            this.herbivores.push(herbivore);
        }

        //Create carnivores
        this.carnivores = [];
        for (let index = 0; index < carnivoreAmount; index++) {
            //Create new carnivore
            carnivore = new Carnivore();
            this.carnivores.push(herbivore);
        }
    }

    makeMoves() {
        for (let index = 0; index < this.carnivores.length; index++) {
            const creature = this.carnivores[index];
            creature.move() 
            
        }

        for (let index = 0; index < this.herbivores.length; index++) {
            const creature = this.herbivores[index];
            creature.move()
            
        }

        this.draw();
    }
    

    draw() { 
        ctx.clearRect(0,0,canvas.width,canvas.height);

        //Draw herbivores as spot
        for (let herbivore in this.herbivores){
            ctx.beginPath();
            ctx.arc(herbivore.fixed,herbivore.y,herbivore.size,0,2*Math.PI);
            ctx.fillStyle = herbivore.color;
            ctx.fill();
            
        }

        //Draw carnivores
        for (let carnivore in this.carnivores){
            ctx.beginPath();
            ctx.arc(carnivore.fixed,carnivore.y,carnivore.size,0,2*Math.PI);
            ctx.fillStyle = carnivore.color;
            ctx.fill();
            ctx.moveTo(carnivore.x,carnivore.y);
            for (let part in carnivore.parts){
                ctx.lineTo(part[0],part[1]);
            }
            ctx.stroke();

                
        }

    }
}

class Food {
    constructor() {
        this.givenEnergy = 12;
    }
}



class Carnivore {
    constructor(parts) {
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

    }

    move(directionVector) {
        x += directionVector[0];
        y += directionVector[1];
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
