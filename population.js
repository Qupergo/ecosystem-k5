import Creature from "./creatures";
import Food from "./food";


export default class Population {
    constructor (herbivoreAmount, carnivoreAmount, foodSpawnFrequency) {
        this.herbivoreAmount = herbivoreAmount;
        this.carnivoreAmount = carnivoreAmount;
        this.foodSpawnFrequency = foodSpawnFrequency;

        this.maxFood = herbivoreAmount;
        this.food = [];
        for (let index = 0; index < maxFood; index++) {
            if (Math.random() < foodSpawnFrequency) {
                this.food.push(new Food())
            }
            
        }

        //Create herbivores
        this.herbivores = [];
        for (let index = 0; index < herbivoreAmount; index++) {
            //Create new herbivore
            let herbivore = new Creature();
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
            creature.move()
            
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