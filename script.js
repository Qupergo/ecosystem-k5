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
    constructor (herbivoreAmount, carnivoreAmount) {
        this.herbivoreAmount = herbivoreAmount;
        this.carnivoreAmount = carnivoreAmount;
        //Create herbivores
        this.herbivores = [];
        for (let index = 0; index < herbivoreAmount; index++) {
            //Create new herbivore
            let herbivore = new Herbivore();
            this.herbivores.push(herbivore);
        }
        //Create carnivores
        this.carnivores = [];
        for (let index = 0; index < carnivoreAmount; index++) {
            //Create new carnivore
            let carnivore = new Carnivore( 
                [
                    [Math.random()*canvas.width, Math.random()*canvas.height],
                    [Math.random()*canvas.width, Math.random()*canvas.height],
                    [Math.random()*canvas.width, Math.random()*canvas.height],
                    [Math.random()*canvas.width, Math.random()*canvas.height],
                    [Math.random()*canvas.width, Math.random()*canvas.height],
                    [Math.random()*canvas.width, Math.random()*canvas.height],
                    [Math.random()*canvas.width, Math.random()*canvas.height]
                ]);
            this.carnivores.push(carnivore);
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
        console.log("draw");
        console.log(this.herbivores);
        console.log(this.carnivores);

        //Draw herbivores as spot
        for (let i = 0; i < this.herbivores.length; i++){
            const herbivore = this.herbivores[i];
            ctx.beginPath();
            ctx.arc(herbivore.x,herbivore.y,herbivore.size*10,0,2*Math.PI);
            ctx.fillStyle = herbivore.color;
            ctx.fill();
            
        }

        //Draw carnivores
        for (let i = 0; i < this.carnivores.length; i++){
            const carnivore = this.carnivores[i];
            ctx.beginPath();
            //Draw head
            ctx.arc(carnivore.x,carnivore.y,carnivore.size*10,0,2*Math.PI);
            ctx.fillStyle = carnivore.color;
            ctx.strokeStyle = carnivore.color;
            ctx.lineWidth = carnivore.size*8;
            ctx.fill();
            ctx.closePath();
            //Draw body
            ctx.beginPath();
            ctx.moveTo(carnivore.x,carnivore.y);
            for (let h = 0; h < carnivore.parts.length-1; h++){
                const part = carnivore.parts[h];
                const nextPart = carnivore.parts[h+1];
                //Draw point
                ctx.arc(part[0],part[1],4,0,2*Math.PI);
                //Find midpoint between this and next part
                ctx.moveTo(part[0],part[1]);
                let mid_x = (part[0]+nextPart[0])/2;
                let mid_y = (part[1]+nextPart[1])/2;
                let control_x1 = (mid_x + part[0])/2;
                let control_y1 = (mid_y + part[1])/2;
                let control_x2 = (mid_x + nextPart[0])/2;
                let control_y2 = (mid_y + nextPart[1])/2;
                console.log(mid_x +" " + mid_y);
                ctx.quadraticCurveTo(mid_x,mid_y,nextPart[0],nextPart[1]);
            }
            ctx.stroke();
            ctx.closePath();

                
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
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
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

let popis = new Population(0,1);
popis.draw();