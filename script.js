const canvas = document.querySelector("#EcosystemCanvas");
let ctx = canvas.getContext("2d");


class World {
    World(mutationChance, ) {

    }
}



class Population {
    Population(herbivoreAmount, carnivoreAmount, boardSize) {
        this.herbivoreAmount = herbivoreAmount;
        this.carnivoreAmount = carnivoreAmount;
        this.boardSize = boardSize;
        this.herbivores = []
        for (let index = 0; index < herbivoreAmount; index++) {
            //Create new herbivore
            herbivore = new Herbivore()
        }
    }
    
    draw() { 
        console.log("draw");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //Draw herbivores as spot
        for (let herbivore in this.herbivores){
            console.log(herbivore.x + " " + herbivore.y);
            ctx.beginPath();
            ctx.arc(herbivore.fixed,herbivore.y,herbivore.size,0,2*Math.PI);
            ctx.fillStyle = "brown"; //Fix random
            ctx.fill();
            
        }

        //Draw carnivores
        for (let carnivore in this.carnivores){
            ctx.beginPath();
            ctx.arc(carnivore.fixed,carnivore.y,carnivore.size,0,2*Math.PI);
            ctx.fillStyle = "brown"; //Fix random
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
    Food() {
        this.givenEnergy = 12;
    }
}



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

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
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
}




function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let pop = new Population(100,0,0);
  console.log(pop);
  pop.draw();