import Creature from "./creatures.js";
import Food from "./food.js";

const canvas = document.querySelector("#EcosystemCanvas");
let ctx = canvas.getContext("2d");

export default class Population {
    constructor(herbivoreAmount, carnivoreAmount, foodSpawnFrequency) {
        this.herbivoreAmount = herbivoreAmount;
        this.carnivoreAmount = carnivoreAmount;
        this.foodSpawnFrequency = foodSpawnFrequency;

        this.maxFood = herbivoreAmount*4;
        this.food = [];
        for (let index = 0; index < this.maxFood; index++) {
            this.food.push(new Food())
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
            for (let i = 0; i < 20; i++) {
                carnivore.parts.push([carnivore.x,carnivore.y]);
            }
            this.carnivores.push(carnivore);
        }
    }

    makeMoves() {
        //Herbivores
        for (let index = 0; index < this.herbivores.length; index++) {
            const creature = this.herbivores[index];
            let detectedDanger = false;

            //Find threats
            if (creature.energy/creature.maxEnergy > creature.dangerThreshold && creature.alive) {
                let predator_distances = this.getDistanceList(creature,this.carnivores);
                if (predator_distances.length >  0) {
                    creature.directionVector= this.getDirectionVector(creature, predator_distances[0][1], false);
                    detectedDanger = true;
                }
            }

            //Find mates
            if (creature.energy/creature.maxEnergy > creature.foodThreshold && !detectedDanger && creature.maturationPeriod <= 0 && creature.alive) {
                creature.lookingForMate = true;
                let mate_distances = this.getDistanceList(creature,this.herbivores);
                for (let i = 0; i < mate_distances.length; i++) {
                    //Check if given consent
                    if (mate_distances[i][1].lookingForMate) {
                        creature.directionVector= this.getDirectionVector(creature, mate_distances[i][1]);
                        //Check if collision
                        if (this.checkCollision(creature, mate_distances[i][1])) {
                            let children = creature.crossover(mate_distances[i][1]);

                            for (let index = 0; index < children.length; index++) {
                                this.herbivores.push(children[index]);
                            }

                            creature.energy -= 70;
                            mate_distances[i][1].energy -= 70;

                            creature.lookingForMate = false;
                            mate_distances[i][1].lookingForMate = false;
                            break;
                        }
                    }
                }
            }
            else {
                creature.lookingForMate = false;
            }

            //Find food
            if (!creature.lookingForMate && !detectedDanger && creature.alive) {
                let food_distances = this.getDistanceList(creature,this.food);
                if (food_distances.length > 0) {
                    creature.directionVector= this.getDirectionVector(creature,food_distances[0][1]);
                    if (this.checkCollision(creature, food_distances[0][1])) {
                        creature.energy = Math.min(creature.energy + food_distances[0][1].givenEnergy, creature.maxEnergy);
                        this.food.remove(food_distances[0][1]);
                    }
                }
            }

            // Make sure they don't go out of bounds
            let newDirectionVector = [0, 0]
            if (creature.x < 0) {
                newDirectionVector = [1, 0];

            }
            else if (creature.y < 0) {
                newDirectionVector = [0, 1];

            }
            else if ((canvas.width - creature.x) < 0) {
                newDirectionVector = [-1, 0];

            }
            else if ((canvas.height - creature.y) < 0) {
                newDirectionVector = [0, -1];
            }

            if (!newDirectionVector.equals([0,0])) {
                creature.directionVector[0] += newDirectionVector[0];
                creature.directionVector[1] += newDirectionVector[1];

            }


            creature.move(creature.directionVector, creature.speed);
            creature.energy -= creature.energyPerMove;
            creature.maturationPeriod -= 1;

            if (creature.energy <= 0) {
                creature.directionVector = [0,0];
                creature.alive = false;
                creature.lookingForMate = false;
                creature.age += 1;
            }

            if (!creature.alive && creature.age > 100) {
                this.herbivores.remove(creature);
            }
        }

        //Carnivores
        for (let index = 0; index < this.carnivores.length; index++) {
            const creature = this.carnivores[index];
            let potentialMates = false;
            //Find mates
            if (creature.energy/creature.maxEnergy > creature.foodThreshold && creature.maturationPeriod <= 0) {
                creature.lookingForMate = true;
                let mate_distances = this.getDistanceList(creature,this.carnivores);
                for (let i = 0; i < mate_distances.length; i++) {
                    //Check if given consent
                    if (mate_distances[i][1].lookingForMate) {
                        creature.directionVector= this.getDirectionVector(creature, mate_distances[i][1]);
                        //Check if collision
                        potentialMates = true;
                        if (this.checkCollision(creature, mate_distances[i][1])) {
                            let children = creature.crossover(mate_distances[i][1]);
                            for (let index = 0; index < children.length; index++) {
                                for (let i = 0; i < 20; i++){
                                    children[index].parts.push([creature.x,creature.y]);
                                }
                                this.carnivores.push(children[index]);
                            }

                            creature.energy -= 70;
                            mate_distances[i][1].energy -= 70;

                            creature.lookingForMate = false;
                            mate_distances[i][1].lookingForMate = false;
                            break;
                        }
                    }
                }
            }
            else {
                creature.lookingForMate = false;
            }

            //Find prey
            if (!potentialMates) {
                let prey_distances = this.getDistanceList(creature,this.herbivores);
                if (prey_distances.length > 0) {
                    creature.directionVector= this.getDirectionVector(creature,prey_distances[0][1]);
                    if (this.checkCollision(creature, prey_distances[0][1])) {
                        creature.energy = Math.min(creature.energy + prey_distances[0][1].maxEnergy, creature.maxEnergy);
                        this.herbivores.remove(prey_distances[0][1]);
                    }
                }
            }

            // Make sure they don't go out of bounds
            let newDirectionVector = [0, 0]
            if (creature.x < 0) {
                newDirectionVector = [1, 0];

            }
            else if (creature.y < 0) {
                newDirectionVector = [0, 1];

            }
            else if ((canvas.width - creature.x) < 0) {
                newDirectionVector = [-1, 0];

            }
            else if ((canvas.height - creature.y) < 0) {
                newDirectionVector = [0, -1];
            }

            if (!newDirectionVector.equals([0,0])) {
                creature.directionVector[0] += newDirectionVector[0];
                creature.directionVector[1] += newDirectionVector[1];
            }

            creature.move(creature.directionVector, creature.speed);
            creature.energy -= creature.energyPerMove;
            creature.age += 1;
            creature.maturationPeriod -= 1;

            if (creature.energy <= 0) {
                this.carnivores.remove(creature);
            }

        }
        for (let index = this.food.length; index < this.maxFood; index++) {
            if (Math.random() < this.foodSpawnFrequency) {
                this.food.push(new Food())
            }

        }
    }

    
    getDirectionVector(creature, other_object, moveTowards=true) {
        let x_dist = creature.x - other_object.x;
        let y_dist = creature.y - other_object.y;
        let hypotenuse = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
        
        let directionVector= [0, 0];
        if (moveTowards) {
            directionVector= [-x_dist / hypotenuse, -y_dist / hypotenuse];
        }
        else {
            directionVector= [x_dist / hypotenuse, y_dist / hypotenuse]
        }
        if (isNaN(directionVector[0])){
            console.log("Directionvector is NaN:");
            console.log(creature);
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
            if (hypotenuse < creature.perceptionFieldDistance && creature != other_objects[i]) {
                distances.push([hypotenuse,other_objects[i]]);
            }
        }
        if (distances.length > 1) {
            distances.sort(compare);
        }
        return distances;
    }

    checkCollision(creature, other_object){
        let x_dist = creature.x - other_object.x;
        let y_dist = creature.y - other_object.y;
        let hypotenuse = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
        if (hypotenuse < (other_object.size+creature.size)) {
            
            return true;
        }
        else {
            return false;
        }
    }

    findcreatureAverages(creatures) {
        let sum = 0
        for (let index = 0; index < creatures.length; index++) {
            const creature = creatures[index];
            sum += creature.perceptionFieldDistance;
        }

        let perceptionAvg = Math.round(sum/creatures.length*100)/100

        sum = 0
        for (let index = 0; index < creatures.length; index++) {
            const creature = creatures[index];
            sum += creature.size;
        }

        let sizeAvg = Math.round(sum/creatures.length*100)/100

        sum = 0
        for (let index = 0; index < creatures.length; index++) {
            const creature = creatures[index];
            sum += creature.speed;
        }

        let speedAvg = Math.round(sum/creatures.length*100)/100

        sum = 0
        for (let index = 0; index < creatures.length; index++) {
            const creature = creatures[index];
            sum += creature.foodThreshold;
        }

        let foodAvg = Math.round(sum/creatures.length*100)/100

        sum = 0
        for (let index = 0; index < creatures.length; index++) {
            const creature = creatures[index];
            sum += creature.dangerThreshold;
        }

        let dangerAvg = Math.round(sum/creatures.length*100)/100
        
        return [perceptionAvg, sizeAvg, speedAvg, foodAvg, dangerAvg]
    }

    updateStatDisplay(foodtype) {

        let defaultCreature = new Creature(foodtype);
        let averages;

        if (foodtype == "herbivore") {
            averages = this.findcreatureAverages(this.herbivores);
        }

        else if (foodtype == "carnivore") {
            averages = this.findcreatureAverages(this.carnivores);
        }

        if (isNaN(averages[0])) {
            averages = ["None Alive", "None Alive", "None Alive", "None Alive", "None Alive"]
        }

        let perceptionDisplay = document.querySelector("#perceptionDisplay");
        perceptionDisplay.innerHTML = "Perception Field Average: " + averages[0];
        perceptionDisplay.style.width = (averages[0]/defaultCreature.maxPerceptionFieldDistance * 100) + "%";


        let sizeDisplay = document.querySelector("#sizeDisplay");
        sizeDisplay.innerHTML = "Size Average: " + averages[1];
        sizeDisplay.style.width = (averages[1]/defaultCreature.maxSize * 100) + "%";


        let speedDisplay = document.querySelector("#speedDisplay");
        speedDisplay.innerHTML = "Speed Average: " + averages[2];
        speedDisplay.style.width = (averages[2]/defaultCreature.maxSpeed * 100) + "%";


        let foodDisplay = document.querySelector("#foodDisplay");
        foodDisplay.innerHTML = "Food Threshold Average: " + averages[3];
        foodDisplay.style.width = (averages[3]/defaultCreature.maxFoodThreshold * 100) + "%";


        let dangerDisplay = document.querySelector("#dangerDisplay");
        dangerDisplay.innerHTML = "Danger Threshold Average: " + averages[4];
        dangerDisplay.style.width = (averages[4]/defaultCreature.maxDangerThreshold * 100) + "%";

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