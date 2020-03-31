import Creature from "./creatures.js";
import Food from "./food.js";

const canvas = document.querySelector("#EcosystemCanvas");
let ctx = canvas.getContext("2d");

export default class Population {
    constructor(herbivoreAmount, carnivoreAmount, foodSpawnFrequency) {
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
            let rand = Math.random();
            carnivore.parts = [
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50]
            ];
            this.carnivores.push(carnivore);
        }
    }

    makeMoves() {
        for (let index = 0; index < this.herbivores.length; index++) {
            const creature = this.herbivores[index];
            let directionVector = [0, 0]

            // Check for food
            for (let index = 0; index < this.food.length; index++) {
                const currentFood = creature.food[index];

                let result = this.check(creature, currentFood, 1 - creature.foodThreshold)
                
                if (result !== false)  {
                    directionVector = result;
                }
            }

            // Check for potential mates
            for (let index = 0; index < this.herbivores.length; index++) {
                const herbivore = this.herbivores[index];
                let result = this.check(creature, herbivore, creature.foodThreshold)
                
                if (result !== false)  {
                    directionVector = result;
                }
            }

            // Check for danger
            for (let index = 0; index < this.carnivores.length; index++) {
                const carnivore = this.carnivores[index];
                let result = this.check(creature, carnivore, creature.dangerThreshold)
                
                if (result !== false)  {
                    directionVector = [-result[0], -result[1]];
                }
            }

            if (directionVector.equals([0,0])) {
                directionVector = [(2*Math.random()-1)*5, (2*Math.random()-1)*5]
            }
            
            creature.move(directionVector, creature.speed);
            creature.energy -= 1;
        }


        for (let index = 0; index < this.carnivores.length; index++) {
            const creature = this.carnivores[index];
            let directionVector = [0, 0];

            // Find close herbivores to eat
            for (let j = 0; j < this.herbivores.length; j++) {
                const currentFood = this.herbivores[j];
                let result = this.check(creature, currentFood, 1 - creature.foodThreshold)
                
                if (result !== false)  {
                    directionVector = result;
                    console.log("Carnivore found food")
                }
            }

            // Find close carnivores for potential mating
            for (let k = 0; k < this.carnivores.length; k++) {
                const potentialMate = this.carnivores[k];
                let result = this.check(creature, potentialMate, creature.foodThreshold)
                if (result !== false)  {
                    directionVector = result;
                }
            }

            if (directionVector.equals([0,0])) {
                directionVector = [(2*Math.random()-1)*5, (2*Math.random()-1)*5]
            }

            creature.move(directionVector, creature.speed);
        }

        // Spawn food
        if (this.food.length < this.maxFood) {
            if (this.foodSpawnFrequency > Math.random()) {
                this.food.push(new Food())
            }
        }
    }

    
    check(creature, other_object, threshold, moveTowards=true) {
        let x_dist = creature.x - other_object.x;
        let y_dist = creature.y - other_object.y;
        let hypotenuse = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
        console.log(hypotenuse);
        let directionVector = [0, 0];

        if (hypotenuse < creature.perceptionFieldDistance) {
            // Found object to interact with
            // If energy is above threshold
            if ((creature.energy / creature.maxEnergy) >= threshold) {

                let x_dist = creature.x - other_object.x;
                let y_dist = creature.y - other_object.y;
                let hypotenuse = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
                if (moveTowards) {
                    directionVector = [x_dist / hypotenuse, y_dist / hypotenuse];
                }
                return directionVector;
            }
        }
        return false;
    }
}