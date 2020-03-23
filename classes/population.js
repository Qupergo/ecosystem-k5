import Creature from "./creatures.js";
import Food from "./food.js";

const canvas = document.querySelector("#EcosystemCanvas");
let ctx = canvas.getContext("2d");

export default class Population {
    constructor (herbivoreAmount, carnivoreAmount, foodSpawnFrequency) {
        this.herbivoreAmount = herbivoreAmount;
        this.carnivoreAmount = carnivoreAmount;
        this.foodSpawnFrequency = foodSpawnFrequency;

        this.maxFood = herbivoreAmount;
        this.food = [];
        for (let index = 0; index < this.maxFood; index++) {
            if (Math.random() < foodSpawnFrequency) {
                this.food.push(new Food())
            }
            
        }

        //Create herbivores
        this.herbivores = [];
        for (let index = 0; index < herbivoreAmount; index++) {
            //Create new herbivore
            let herbivore = new Creature("herbivore");
            this.herbivores.push(herbivore);
        }
        //Create carnivores
        this.carnivores = [];
        for (let index = 0; index < carnivoreAmount; index++) {
            //Create new carnivore
            let carnivore = new Creature("carnivore");
            carnivore.parts = [ //funkar inte *****************************************************************************
                [Math.random()*canvas.width,Math.random()*canvas.height],
                [Math.random()*canvas.width,Math.random()*canvas.height],
                [Math.random()*canvas.width,Math.random()*canvas.height],
                [Math.random()*canvas.width,Math.random()*canvas.height]
            ]
            this.carnivores.push(carnivore);
        }
        
    }

    makeMoves() {
        for (let index = 0; index < this.carnivores.length; index++) {
            const creature = this.carnivores[index];

            // Find direction to move
            for (let index = 0; index < food.length; index++) {
                const currentFood = food[index];

                distance = Math.sqrt(currentFood.x*currentFood.x + currentFood.y*currentFood.y);

                if (distance < creature.perceptionFieldDistance) {
                    if (creature.energy/creature.maxEnergy < .7) {
                        // Wants to take food
                        directionVector = []
                    }
                    // Found food
                }
            }

            for (let index = 0; index < this.herbivores.length; index++) {
                const herbivore = this.herbivores[index];
                distance = Math.sqrt(herbivore.x*herbivore.x + herbivore.y*herbivore.y);

                if (distance < creature.perceptionFieldDistance) {
                    // Found potential mate
                }
            }

            for (let index = 0; index < this.carnivores.length; index++) {
                const carnivore = this.carnivores[index]; 
                distance = Math.sqrt(carnivore.x*carnivore.x + carnivore.y*carnivore.y);

                if (distance < creature.perceptionFieldDistance) {
                    // Found danger
                }
            }

            creature.move();
            creature.energy -= 1;
            
        }

        for (let index = 0; index < this.herbivores.length; index++) {
            const creature = this.herbivores[index];
            creature.move();
            
        }


        // Spawn food
        if (this.food.length < this.maxFood) {
            if (this.foodSpawnFrequency > Math.random()) {
                this.food.push(new Food())
            }
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
            console.log(this.carnivores.length);
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

            //Find Midpoints
            let midparts = [];
            for (let h  = 0; h < carnivore.parts.length-1; h++){
                const part = carnivore.parts[h];
                const nextPart = carnivore.parts[h+1];
                let mid = {
                    x: (part[0] + nextPart[0]) / 2,
                    y: (part[1] + nextPart[1]) / 2
                }
                midparts.push(mid);
            }
            ctx.moveTo(carnivore.parts[0][0],carnivore.parts[0][1]);
            ctx.lineTo(midparts[0].x,midparts[0].y);
            for (let h = 0; h < carnivore.parts.length-2; h++){
                const nextPart = carnivore.parts[h+1];
                ctx.quadraticCurveTo(nextPart[0],nextPart[1],midparts[h+1].x,midparts[h+1].y);
            }
            ctx.quadraticCurveTo(carnivore.parts[carnivore.parts.length - 1][0],carnivore.parts[carnivore.parts.length - 1][1],carnivore.x,carnivore.y);
            ctx.stroke();
            ctx.closePath();

                
        }
    }
}