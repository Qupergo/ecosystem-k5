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

            carnivore.parts = [
                [Math.random()*canvas.width, Math.random()*canvas.height],
                [Math.random()*canvas.width, Math.random()*canvas.height],
                [Math.random()*canvas.width, Math.random()*canvas.height],
                [Math.random()*canvas.width, Math.random()*canvas.height]
            ];

            this.carnivores.push(carnivore);
        }
    }

    makeMoves() {
        let directionVector = []
        
        for (let index = 0; index < this.herbivores.length; index++) {
            const creature = this.herbivores[index];

            // Find direction to move
            for (let index = 0; index < food.length; index++) {
                const currentFood = food[index];

                distance = Math.sqrt(currentFood.x*currentFood.x + currentFood.y*currentFood.y);
               
                // Found close food
                if (distance < creature.perceptionFieldDistance) {
                    // If energy is below foodThreshold
                    if (creature.energy/creature.maxEnergy <= creature.foodThreshold) {
                        // Wants to take food
                        x_dist = Math.abs(creature.x - currentFood.x);
                        y_dist = Math.abs(creature.y - currentFood.y);
                        hypotenuse = Math.sqrt(x_dist*x_dist + y_dist*y_dist);
                        directionVector = [x_dist/hypotenuse, y_dist/hypotenuse]
                    }
                }
            }

            for (let index = 0; index < this.herbivores.length; index++) {
                const herbivore = this.herbivores[index];
                distance = Math.sqrt(herbivore.x*herbivore.x + herbivore.y*herbivore.y);

                if (distance < creature.perceptionFieldDistance) {
                    // Found potential mate
                    // If energy is above foodThreshold
                    if (creature.energy/creature.maxEnergy > creature.foodThreshold) {

                        x_dist = Math.abs(creature.x - herbivore.x);
                        y_dist = Math.abs(creature.y - herbivore.y);
                        hypotenuse = Math.sqrt(x_dist*x_dist + y_dist*y_dist);
                        directionVector = [x_dist/hypotenuse, y_dist/hypotenuse]
                    }
                }
            }

            for (let index = 0; index < this.carnivores.length; index++) {
                const carnivore = this.carnivores[index]; 
                distance = Math.sqrt(carnivore.x*carnivore.x + carnivore.y*carnivore.y);

                if (distance < creature.perceptionFieldDistance) {
                    // Found danger
                    // If energy is above dangerThreshold
                    if (creature.energy/creature.maxEnergy > creature.dangerThreshold) {
                        x_dist = Math.abs(creature.x - carnivore.x);
                        y_dist = Math.abs(creature.y - carnivore.y);
                        hypotenuse = Math.sqrt(x_dist*x_dist + y_dist*y_dist);
                        directionVector = [x_dist/hypotenuse, y_dist/hypotenuse]
                    }
                }
            }

            creature.move(directionVector*creature.speed);
            creature.energy -= 1;            
        }

        for (let index = 0; index < this.carnviores.length; index++) {
            const creature = this.carnivores[index];
            directionVector = [];

            // Find close herbivores to eat
            for (let index = 0; index < this.herbivores.length; index++) {
                const currentFood = this.herbivores[i];

                distance = Math.sqrt(currentFood.x*currentFood.x + currentFood.y*currentFood.y);

                // Found close food
                if (distance < creature.perceptionFieldDistance) {
                    // If energy is below foodThreshold
                    if (creature.energy/creature.maxEnergy <= creature.foodThreshold) {
                        // Wants to take food
                        x_dist = Math.abs(creature.x - currentFood.x);
                        y_dist = Math.abs(creature.y - currentFood.y);
                        hypotenuse = Math.sqrt(x_dist*x_dist + y_dist*y_dist);
                        directionVector = [x_dist/hypotenuse, y_dist/hypotenuse]
                    }
                }
            }

            for (let index = 0; index < this.carnivores.length; index++) {
                const potentialMate = this.carnivores[index];
                distance = Math.sqrt(potentialMate.x*potentialMate.x + potentialMate.y*potentialMate.y);

                if (distance < creature.perceptionFieldDistance) {
                    // Found potential mate
                    // If energy is above foodThreshold
                    if (creature.energy/creature.maxEnergy > creature.foodThreshold) {

                        x_dist = Math.abs(creature.x - potentialMate.x);
                        y_dist = Math.abs(creature.y - potentialMate.y);
                        hypotenuse = Math.sqrt(x_dist*x_dist + y_dist*y_dist);
                        directionVector = [x_dist/hypotenuse, y_dist/hypotenuse]
                    }
                }
            }

            creature.move(directionVector);
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
            for (let h = 0; h < carnivore.parts.length-1; h++){
                const part = carnivore.parts[h];
                const nextPart = carnivore.parts[h+1];
                if (h == carnivore.parts.length-1) {
                    const nextPart = [carnivore.x,carnivore.y];
                }
                else if (h == carnivore.parts.length-2){
                    const nextNextPart = [carnivore.x,carnivore.y];
                }
                

                //Draw point
                ctx.arc(part[0],part[1],4,0,2*Math.PI);
                //Find midpoint between this and next part
                let mid_x1 = (part[0] + nextPart[0]) / 2;
                let mid_y1 = (part[1] + nextPart[1]) / 2;
                //Find midpoint between next part and the part after
                if (h == carnivore.parts.length-1) {
                    console.log("last part before head")
                    //If it's the last one 
                    let mid_x2 = (carnivore.x + mid_x1) / 2;
                    let mid_y2 = (carnivore.y + mid_y1) / 2;
                } 
                else {
                    let mid_x2 = (nextPart[0] + nextNextPart[0]) / 2;
                    let mid_y2 = (nextPart[1] + nextNextPart[1]) / 2;
                }

                ctx.moveTo(mid_x1,mid_y1);
                ctx.quadraticCurveTo(nextPart[0], nextPart[1], mid_x2, mid_x2);
                ctx.stroke();
            }
            ctx.stroke();
            ctx.closePath();

                
        }
    }
}