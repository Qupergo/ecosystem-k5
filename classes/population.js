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

            //Find threats
            let carnivore_distances = this.getDistanceList(creature,this.carnivores);
            
            creature.move(directionVector, creature.speed);
            creature.energy -= 1;
        }
        
        for (let index = 0; index < this.carnivores.length; index++){
            const creature = this.carnivores[index];
            let directionVector = [0, 0];
            let potentialMates = false;
            if (creature.energy/creature.maxEnergy > creature.foodThreshold){
                let carnivore_distances = this.getDistanceList(creature,this.carnivores);
                if (carnivore_distances.length >  0) {
                    directionVector = this.getDirectionVector(creature, carnivore_distances[0]);
                    potentialMates = true;
                }
            }
            if (potentialMates == false){
                //Find prey
                let herbivore_distances = this.getDistanceList(creature,this.herbivores);
                if (herbivore_distances.length > 0) {
                    directionVector = this.getDirectionVector(creature,herbivore_distances[0]);
                }
            }
            creature.move(directionVector, creature.speed);
            creature.energy -= 1;

        }
    }

    
    getDirectionVector(creature, other_object, moveTowards=true) {
        let x_dist = creature.x - other_object[1].x;
        let y_dist = creature.y - other_object[1].y;
        let hypotenuse = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
        
        let directionVector = [0, 0];
        if (moveTowards) {
            directionVector = [-x_dist / hypotenuse, -y_dist / hypotenuse];
        }
        else {
            directionVector = [x_dist / hypotenuse, y_dist / hypotenuse]
        }
        if (isNaN(directionVector[0])){
            console.log("grej:");
            console.log(other_object);
            console.log(x_dist);
            console.log(y_dist);
            console.log(hypotenuse);
        }
        return directionVector;
    }

    getDistanceList(creature, other_objects) {
        let distances = []; 
        for (let i = 0; i < other_objects.length; i++){
            let x_dist = creature.x - other_objects[i].x;
            let y_dist = creature.y - other_objects[i].y;
            let hypotenuse = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
            //Checks if creature can see the other creature and that the distance is not 0
            if (hypotenuse < creature.perceptionFieldDistance && hypotenuse > 0) { 
                distances.push([hypotenuse,creature]);
            }
        }
        if (distances.length > 1) {
            distances.sort(compare);
        }
        return distances;
    }
}

function compare(x,y){
    if (x[0] === y[0]) {
        return 0;
    }
    else {
        return (x[0] < y[0]) ? -1 : 1;
    }
}